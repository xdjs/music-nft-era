import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: ".",
  testMatch: "sequence.spec.js",
  workers: 2,
  use: {
    baseURL: `http://127.0.0.1:${process.env.SEQUENCE_PORT || 4182}`,
    reducedMotion: "reduce",
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
    {
      name: "phone",
      use: {
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
  webServer: {
    command: `PORT=${process.env.SEQUENCE_PORT || 4182} node server.mjs`,
    url: `http://127.0.0.1:${process.env.SEQUENCE_PORT || 4182}/sequence/`,
    cwd: "..",
    reuseExistingServer: true,
  },
});
