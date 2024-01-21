import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:4173',
    setupNodeEvents(on: any, config: any) {
      require('@cypress/code-coverage/task')(on, config);
      return config;
    }
  }
});
