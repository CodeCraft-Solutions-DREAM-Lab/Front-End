import { defineConfig } from "cypress";

export default defineConfig({
    projectId: "vyayrg",
    e2e: {
        baseUrl: "http://localhost:5173",
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
    env: {
        API_URL: "https://dreamlab-api.azurewebsites.net/",
    },
    component: {
        devServer: {
            framework: "react",
            bundler: "vite",
        },
    },
});
