import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

import { defaultSiteUrl } from "./src/data/site.ts";

export default defineConfig({
  site: process.env.SITE_URL || defaultSiteUrl,
  base: process.env.BASE_PATH || "/",
  trailingSlash: "always",
  build: { inlineStylesheets: "always" },
  integrations: [sitemap()],
});
