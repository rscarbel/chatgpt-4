module.exports = {
  roots: ["<rootDir>/src"],
  testRunner: "jest-circus/runner",
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  setupFilesAfterEnv: ["@testing-library/react"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  collectCoverage: true,
  coverageReporters: ["html", "text"],
  coveragePathIgnorePatterns: ["/node_modules/", "/dist/"],
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["node_modules/(?!(example-library)/)"],
};
