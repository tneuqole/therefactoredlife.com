import { defineConfig } from "eslint/config";
import astro from "eslint-plugin-astro";
import prettier from "eslint-config-prettier";
import ts from "typescript-eslint";

export default defineConfig(
	{ ignores: ["**/node_modules", "**/dist", "**/.astro"] },
	...ts.configs.recommended,
	...astro.configs.recommended,
	prettier,
	{
		rules: {
			// typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
			// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
			"no-undef": "off",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_"
				}
			]
		}
	}
);
