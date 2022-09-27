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
    supportFile: 'cypress/support/e2e.js',

    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          // Mac/Linux
          launchOptions.args.push(
            '--use-file-for-fake-video-capture=cypress/fixtures/voucher_scan.y4m'
          )
      
          // Windows
          // launchOptions.args.push('--use-file-for-fake-video-capture=c:\\path\\to\\video\\my-video.y4m')
        }
      
        return launchOptions
      })
    }

  },
});
