import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { principles } from "../portfolio-data";

export default defineTool({
  name: "list_principles",
  title: "List practice principles",
  description:
    "List the quality-engineering practice principles the portfolio owner works by, each with a short explanation.",
  inputSchema: {},
  outputSchema: { principles: z.array(z.record(z.string(), z.unknown())), count: z.number() },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text" as const, text: JSON.stringify(principles, null, 2) }],
    structuredContent: { principles, count: principles.length },
  }),
});
