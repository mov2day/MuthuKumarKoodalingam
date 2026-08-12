import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { owner } from "../portfolio-data";

export default defineTool({
  name: "get_profile",
  title: "Get profile",
  description:
    "Get the portfolio owner's professional profile: name, current role, location, years of experience, certifications, current focus, availability and public contact links.",
  inputSchema: {},
  outputSchema: { profile: z.record(z.string(), z.unknown()) },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text" as const, text: JSON.stringify(owner, null, 2) }],
    structuredContent: { profile: owner },
  }),
});
