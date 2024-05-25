import { defineConfig } from "cypress";
import cypressSplit from "cypress-split";

export default defineConfig({
    projectId: "vyayrg",
    e2e: {
        baseUrl: "http://localhost:5173",
        supportFile: false,
        fixturesFolder: false,
        setupNodeEvents(on, config) {
            cypressSplit(on, config);
            // IMPORTANT: return the config object
            return config;
        },
    },
    env: {
        // API_URL: 'https://dreamlab-api.azurewebsites.net/',
        API_URL: "http://localhost:3000/",
    },
    component: {
        devServer: {
            framework: "react",
            bundler: "vite",
        },
    },
});
