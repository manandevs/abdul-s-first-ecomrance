module.exports = {
  root: true,
  extends: [
    "next/core-web-vitals",      // ✅ Next.js best practices
    "eslint:recommended",        // ✅ General JS linting
    "plugin:react/recommended",  // ✅ React best practices
  ],
  rules: {
    // Example custom rules:
    "react/react-in-jsx-scope": "off", // Not needed in Next.js
    "no-unused-vars": ["warn"],
    "no-console": "warn",
  },
};
