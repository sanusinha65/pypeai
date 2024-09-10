import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'firefox',
      use: { ...devices['Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['WebKit'] },
    },
    {
      name: 'googlechrome',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  use: {
    baseURL: 'https://localhost:3000',
  },
});
