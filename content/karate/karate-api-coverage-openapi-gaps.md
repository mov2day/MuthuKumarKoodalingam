---
title: "Your Karate Tests Are Green. But Is Your API Actually Covered?"
description: "A practical method for measuring Karate API coverage against OpenAPI, finding endpoint gaps, and generating only the missing tests instead of trusting a green test run."
date: "2026-09-15"
slug: "karate-api-coverage-openapi-gaps"
tags: "karate,api-testing,openapi,test-coverage"
published: true
---

# Your Karate Tests Are Green. But Is Your API Actually Covered?

A green Karate run answers one question well:

> Did the tests we executed pass?

It does **not** answer a different question:

> Did we test the API surface that matters?

That distinction becomes painful in mature API suites. You can have 300 passing scenarios, a beautiful CI report, and still have newly added operations, destructive methods, or entire resource paths that no Karate scenario exercises.

The useful coverage metric for an API suite is therefore not simply scenario pass rate. It is the relationship between the **contract you expose** and the **tests you can map back to that contract**.

This article shows a practical way to build that map using OpenAPI and an existing Karate suite, including where simple matching fails and what evidence you should retain before generating missing tests.

## Pass rate and API coverage are different dimensions

Assume CI reports:

```text
Karate scenarios: 184
Passed:           184
Failed:             0
Pass rate:         100%
```

That looks excellent.

Now compare the suite with the current OpenAPI contract:

```text
GET    /customers                 covered
POST   /customers                 covered
GET    /customers/{customerId}    covered
PATCH  /customers/{customerId}    missing
DELETE /customers/{customerId}    missing
GET    /customers/{customerId}/orders  missing
```

The suite is still 100% green. It is simply green over an incomplete slice of the API.

This is why I treat **execution health** and **contract coverage** as separate signals:

```text
Execution health = did known tests pass?
Contract coverage = which API operations have test evidence?
```

Neither replaces the other.

## Start with operations, not lines of code

For API testing, an immediately useful unit of coverage is an OpenAPI operation:

```text
HTTP method + normalized path
```

For example:

```text
GET  /orders/{id}
POST /orders
```

This is more actionable than application code coverage when the question is whether your externally documented API surface is exercised.

Given this OpenAPI fragment:

```yaml
paths:
  /orders:
    post:
      operationId: createOrder
      responses:
        '201':
          description: Created

  /orders/{orderId}:
    get:
      operationId: getOrder
      parameters:
        - name: orderId
          in: path
          required: true
          schema:
            type: string
```

we can derive two contract operations:

```text
POST /orders
GET  /orders/{orderId}
```

The next job is to find evidence for those operations in Karate.

## Mapping Karate scenarios to OpenAPI operations

Consider this feature:

```gherkin
Feature: Order lookup

Background:
  * url baseUrl

Scenario: Get an existing order
  Given path 'orders', orderId
  When method get
  Then status 200
  And match response.id == orderId
```

A human immediately sees that it probably covers:

```text
GET /orders/{orderId}
```

A coverage engine has to establish that relationship systematically.

At minimum it needs to extract:

```text
method = GET
path   = /orders/<dynamic-value>
```

and normalize the dynamic segment against the contract path.

Conceptually:

```text
Karate:  GET /orders/8c12...
OpenAPI: GET /orders/{orderId}
                     ↓
                  match
```

You do not need an LLM for this basic comparison. It should be deterministic and explainable.

## Normalize paths before comparing them

Literal string matching is too weak.

These can all represent the same contract operation:

```gherkin
Given path 'orders', orderId
```

```gherkin
Given path 'orders/' + orderId
```

```gherkin
Given url baseUrl + '/orders/' + orderId
```

while OpenAPI represents it as:

```text
/orders/{orderId}
```

A useful mapper normalizes both sides into comparable structures.

For example:

```text
Contract segments: [orders, {param}]
Test segments:     [orders, <dynamic>]
Method:            GET == GET
```

Then coverage can be based on structural compatibility rather than source-code spelling.

Be conservative when evidence is ambiguous. A false `covered` result is more dangerous than an `unknown` result because it hides work.

## Coverage should retain evidence

A percentage alone is not enough.

Suppose a dashboard says:

```text
API coverage: 82%
```

The first useful question is: *why 82%?*

For every covered operation, retain evidence such as:

```text
GET /orders/{orderId}
  -> src/test/java/orders/orders.feature
  -> Scenario: Get an existing order
```

For uncovered operations, retain the opposite evidence:

```text
DELETE /orders/{orderId}
  -> no mapped Karate scenario
```

This turns coverage into something engineers can inspect rather than a vanity metric.

A practical result model might look like:

```json
{
  "method": "DELETE",
  "path": "/orders/{orderId}",
  "status": "uncovered",
  "evidence": []
}
```

versus:

```json
{
  "method": "GET",
  "path": "/orders/{orderId}",
  "status": "covered",
  "evidence": [
    {
      "feature": "orders/orders.feature",
      "scenario": "Get an existing order"
    }
  ]
}
```

Now the number is reproducible.

## Do not confuse endpoint coverage with assertion quality

Finding a mapped scenario proves that an operation is exercised. It does not prove the scenario is strong.

This scenario technically reaches the endpoint:

```gherkin
Scenario: Get order
  Given path 'orders', orderId
  When method get
  Then status 200
```

A more meaningful test may include contract-relevant assertions:

```gherkin
Scenario: Get order
  Given path 'orders', orderId
  When method get
  Then status 200
  And match response ==
    """
    {
      id: '#string',
      status: '#string',
      total: '#number',
      items: '#array'
    }
    """
```

I therefore avoid pretending operation coverage is a complete test-quality score.

Think of quality as several independent questions:

```text
Was the operation exercised?
Did the scenario pass?
Are meaningful assertions present?
Are important response/error variants tested?
Is the test stable over repeated runs?
```

A useful test-management system keeps these signals separate instead of compressing all of them into one opaque score.

## Positive coverage is only the first layer

OpenAPI can also expose candidate coverage dimensions inside an operation.

Suppose the contract documents:

```yaml
responses:
  '200':
    description: Order returned
  '404':
    description: Order not found
  '401':
    description: Authentication required
```

A single happy-path scenario means the operation is exercised, but the documented behavior is not necessarily well covered.

You can model progressively richer coverage:

```text
Level 1: operation coverage
  GET /orders/{id}

Level 2: documented response coverage
  200 covered
  404 missing
  401 missing

Level 3: schema / boundary coverage
  required fields
  enums
  minimum / maximum
  formats
```

The important part is to label these dimensions accurately. Do not report Level 1 as though it proves Level 3.

## Generate from gaps, not from the whole specification

Once the comparison is trustworthy, generation becomes much safer.

Imagine the analysis produces:

```text
12 uncovered operations
```

The wrong next step is:

```text
regenerate 86 operations
```

The better workflow is:

```text
OpenAPI contract
       +
Existing Karate suite
       ↓
Operation mapping
       ↓
Coverage evidence
       ↓
Uncovered operations only
       ↓
Generate candidate tests
       ↓
Review + execute
```

This matters because mature suites contain engineering intent that does not exist in OpenAPI: authentication helpers, setup flows, domain fixtures, custom assertions, tags and team conventions.

Targeted generation reduces the chance of replacing that intent with generic generated code.

## Example: turning one coverage gap into a test

Suppose coverage identifies:

```text
DELETE /orders/{orderId} — uncovered
```

The contract says:

```yaml
/orders/{orderId}:
  delete:
    operationId: deleteOrder
    parameters:
      - name: orderId
        in: path
        required: true
        schema:
          type: string
    responses:
      '204':
        description: Deleted
      '404':
        description: Not found
```

Do not invent a random order ID and call that complete.

First inspect how the repository creates valid orders. If an existing reusable feature exists:

```gherkin
* def created = call read('classpath:helpers/create-order.feature')
* def orderId = created.response.id
```

then a generated candidate can fit the suite:

```gherkin
Scenario: Delete an existing order
  * def created = call read('classpath:helpers/create-order.feature')
  * def orderId = created.response.id

  Given path 'orders', orderId
  When method delete
  Then status 204
```

A second candidate can address documented negative behavior:

```gherkin
Scenario: Delete an unknown order
  Given path 'orders', 'does-not-exist'
  When method delete
  Then status 404
```

That is far more useful than blindly producing one isolated scenario per OpenAPI operation.

## What happens when the specification changes?

Coverage becomes even more valuable when it is recomputed after contract changes.

Suppose yesterday's contract contained:

```text
GET  /orders/{id}
POST /orders
```

and today's contains:

```text
GET   /orders/{id}
POST  /orders
PATCH /orders/{id}
```

The interesting result is not simply "OpenAPI changed."

It is:

```text
New operation:
PATCH /orders/{id}

Mapped scenarios:
none

Coverage state:
uncovered
```

That is actionable change impact.

Likewise, if a response schema adds a required field, the tool should distinguish that from a completely new operation. The likely test impact is different.

This is where contract coverage starts becoming a maintenance mechanism rather than a reporting feature.

## Where AI helps — and where it should not decide the truth

AI is useful after deterministic evidence exists.

Given:

```text
PATCH /orders/{id} is uncovered
```

plus the operation schema and nearby repository patterns, an AI assistant can help propose:

- realistic domain scenarios
- useful boundaries
- repository-consistent naming
- stronger assertions
- reuse of nearby setup helpers

But I would not ask the model to be the source of truth for whether the operation is covered.

The safer split is:

```text
Deterministic layer
  parse OpenAPI
  index Karate
  map operations
  identify gaps
  retain evidence

AI-assisted layer
  interpret domain intent
  suggest scenarios
  adapt to local style
  propose repairs
```

That separation makes the result inspectable when the model is wrong or unavailable.

## How Karate Test Management approaches this

This workflow is now part of **Karate Test Management for VS Code**.

The current extension can analyze an OpenAPI specification by itself, or combine the specification with Karate feature files for exact scenario-to-endpoint mapping. Coverage gaps enter the Quality workflow, and missing-test generation can start from those gaps rather than regenerating the entire API suite.

The same workspace also keeps execution, run history, flakiness, specification-change findings and repair review alongside coverage. That matters because an uncovered endpoint, a failing endpoint and a flaky endpoint are three different engineering problems.

The implementation deliberately keeps deterministic coverage available without an AI provider. AI enhancement is optional and uses the evidence produced by the underlying workflow.

## A practical coverage review for your own Karate repository

Even without tooling, you can apply the same model manually or in a script:

1. Parse the current OpenAPI document into `(method, normalized path)` operations.
2. Index Karate scenarios and extract the HTTP method and resolved/structural path evidence you can establish.
3. Map tests to operations conservatively.
4. Mark ambiguous mappings as unknown instead of covered.
5. Keep the feature and scenario name as evidence for every match.
6. Review uncovered operations by risk, not alphabetically.
7. Generate or write tests only for justified gaps.
8. Re-run the mapping whenever the contract changes.

The key output should look less like a single percentage and more like an engineering queue:

```text
HIGH   DELETE /customers/{id}       uncovered
HIGH   POST   /payments/refunds     uncovered
MEDIUM PATCH  /orders/{id}          uncovered
LOW    GET    /catalog/metadata     uncovered
```

Now API coverage can influence release decisions.

## Green is necessary, not sufficient

A passing suite is good evidence about the tests you ran.

It is not evidence about tests that do not exist.

For contract-driven APIs, comparing Karate scenarios with OpenAPI gives you a practical way to expose that blind spot. Keep the mapping deterministic, retain evidence, distinguish endpoint coverage from assertion quality, and generate from gaps instead of repeatedly generating the whole suite.

That is the difference between asking **"are my tests green?"** and asking the more useful question:

> **What part of my API do those green tests actually protect?**

Karate Test Management is open source if you want to try the workflow:

- GitHub: https://github.com/mov2day/KaratePlugin
- VS Code Marketplace: https://marketplace.visualstudio.com/items?itemName=MuthuKumarKoodalingam.karate-test-generator
