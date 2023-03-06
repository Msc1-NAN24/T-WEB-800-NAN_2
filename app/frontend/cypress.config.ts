import { defineConfig } from "cypress";
require('dotenv').config();

export default defineConfig({
  projectId: "htduty",
  video: false,
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  viewportWidth: 1400,
  viewportHeight: 1000,
  e2e: {
    setupNodeEvents(on, config) {
      config.env = {
        ...process.env,
        ...config.env
      }
      return config
    },
  },
});
