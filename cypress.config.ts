import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    testIsolation: false, // prevent loading blank page after log in command before next test
    defaultCommandTimeout: 15000,
  },
});
