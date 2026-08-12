import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { roles } from "../portfolio-data";

export default defineTool({
  name: "list_experience",
  title: "List work experience",
  description:
    "List the portfolio owner's professional roles in reverse-chronological order, with period, title, employer, location and key achievements.",
  inputSchema: {},
  outputSchema: { roles: z.array(z.record(z.string(), z.unknown())), count: z.number() },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text" as const, text: JSON.stringify(roles, null, 2) }],
    structuredContent: { roles, count: roles.length },
  }),
});
