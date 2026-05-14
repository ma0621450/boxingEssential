import coreWebVitals from "eslint-config-next/core-web-vitals";

/** @type {import("eslint").Linter.Config[]} */
const config = [
  ...coreWebVitals,
  {
    ignores: ["node_modules/**", ".next/**", "out/**"],
  },
];

export default config;
