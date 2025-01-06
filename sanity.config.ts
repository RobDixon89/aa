import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { media } from "sanity-plugin-media";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schema";
import { structure } from "./schema/structure";

// Different environments use different variables
const projectId = import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID! || "";
const dataset = import.meta.env.PUBLIC_SANITY_STUDIO_DATASET! || "production";

// Feel free to remove this check if you don't need it
if (!projectId || !dataset) {
  throw new Error(
    `Missing environment variable(s). Check if named correctly in .env file.\n\nShould be:\nPUBLIC_SANITY_STUDIO_PROJECT_ID=${projectId}\nPUBLIC_SANITY_STUDIO_DATASET=${dataset}\n\nAvailable environment variables:\n${JSON.stringify(
      import.meta.env,
      null,
      2
    )}`
  );
}

export default defineConfig({
  name: "ashley-aerials",
  title: "Ashley Aerials",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), media(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
