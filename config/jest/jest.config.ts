import type { Config } from "jest";

const config: Config = {
  testMatch: ["<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)"],
  rootDir: "../../",
  setupFilesAfterEnv: ["<rootDir>config/jest/setupTests.ts"],
  moduleNameMapper: {
    "\\.s?css$": "identity-obj-proxy",
    "\\.svg$": "<rootDir>/config/jest/fileMock.tsx",
    "@/(.*)$": "<rootDir>/src/$1",
  },
  modulePaths: ["<rootDir>src/"],
  collectCoverage: true,
  testEnvironment: "jsdom",
};

export default config;
