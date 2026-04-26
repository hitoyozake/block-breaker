import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './test',
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:8080',
  },
});
