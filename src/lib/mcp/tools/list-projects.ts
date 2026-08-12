import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { projects } from "../portfolio-data";

export default defineTool({
  name: "list_projects",
  title: "List open-source projects",
  description:
    "List the open-source QA and test-automation tools featured on the portfolio, with a summary, technology tags and repository link for each. Optionally filter by a free-text query.",
  inputSchema: {
    query: z
      .string()
      .optional()
      .describe("Optional case-insensitive text to match against project name, summary or tags."),
  },
  outputSchema: { projects: z.array(z.record(z.string(), z.unknown())), count: z.number() },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query }) => {
    const q = query?.trim().toLowerCase();
    const items = q
      ? projects.filter((p) =>
          [p.name, p.title, p.body, ...p.tags].join(" ").toLowerCase().includes(q),
        )
      : projects;
    return {
      content: [{ type: "text" as const, text: JSON.stringify(items, null, 2) }],
      structuredContent: { projects: items, count: items.length },
    };
  },
});
