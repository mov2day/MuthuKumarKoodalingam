import { defineMcp } from "@lovable.dev/mcp-js";
import getProfileTool from "./tools/get-profile";
import listProjectsTool from "./tools/list-projects";
import listExperienceTool from "./tools/list-experience";
import listPrinciplesTool from "./tools/list-principles";

export default defineMcp({
  name: "portfolio-spark",
  title: "Portfolio Spark",
  version: "0.1.0",
  instructions:
    "Public, read-only tools for Muthu Kumar Koodalingam's QA automation portfolio. Use `get_profile` for who he is and how to reach him, `list_projects` for his open-source QA tooling, `list_experience` for his career history, and `list_principles` for his quality-engineering approach.",
  tools: [getProfileTool, listProjectsTool, listExperienceTool, listPrinciplesTool],
});
