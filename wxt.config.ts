import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    content_scripts: [
      {
        matches: ["<all_urls>"], // inject into every website
        js: ["content.ts"],
        run_at: "document_idle",
      },
    ],
  },
});
