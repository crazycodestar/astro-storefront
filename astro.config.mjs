import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  server: {
    port: 8000
  },
  integrations: [tailwind({
    config: {
      applyBaseStyles: false
    }
  }), react()]
});