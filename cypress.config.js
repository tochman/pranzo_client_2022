import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    chromeWebSecurity: false,
    excludeSpecPattern: process.env.CI ? ["cypress/e2e/all.cy.js"] : [],
    video: false,
    retries: 1,
    env: {
      apiUrl: "http://localhost:3001",
    },
    screenshotOnRunFailure: false,
    supportFile: 'cypress/support/e2e.js'

  },
});
