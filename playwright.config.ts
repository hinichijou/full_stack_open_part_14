import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

//https://playwright.dev/docs/test-parameterize#env-files
dotenv.config({ path: path.resolve(__dirname, '.env.test') });

//https://playwright.dev/docs/test-configuration
export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: 'tests',
  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,
  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,
  // Reporter to use
  //reporter: 'html',
  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: 'http://localhost:3000',
    // Run browser in headless mode.
    //headless: false,
    // Collect trace when retrying the failed test.
    trace: 'off',
  },
  // Run your local dev server before starting the tests.
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
  expect: {
    timeout: 10000
  }
});