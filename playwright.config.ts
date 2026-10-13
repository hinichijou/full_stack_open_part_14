import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

//https://playwright.dev/docs/test-parameterize#env-files
dotenv.config({ path: path.resolve(__dirname, '.env.test') });

export default defineConfig({
  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: 'http://localhost:3000',
    // Run browser in headless mode.
    //headless: false,
  },
  // Run your local dev server before starting the tests.
  webServer: {
    command: process.env.NODE_ENV === "test" ? 'npm run build && npm run start' : 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  }
});