import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

export default defineConfig([
	globalIgnores([
		".next/**",
		"out/**",
		"build/**",
		"public/**",
		"next-env.d.ts",
		".impeccable/**",
		".codex/**",
		".cursor/**",
	]),

	js.configs.recommended,
	...nextVitals,
	...nextTs,

	// Reguły TypeScript oparte na typach (tylko pliki TS).
	{
		files: ["**/*.{ts,tsx,mts,cts}"],
		extends: [
			tseslint.configs.strictTypeChecked,
			tseslint.configs.stylisticTypeChecked,
		],
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			"@typescript-eslint/consistent-type-imports": [
				"error",
				{ prefer: "type-imports", fixStyle: "inline-type-imports" },
			],
			"@typescript-eslint/no-import-type-side-effects": "error",
			// Repo konsekwentnie używa `type` zamiast `interface`.
			"@typescript-eslint/consistent-type-definitions": ["error", "type"],
			"@typescript-eslint/no-confusing-void-expression": [
				"error",
				{ ignoreArrowShorthand: true },
			],
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
				},
			],
			// Liczby i inne prymitywy w template literals są w porządku.
			"@typescript-eslint/restrict-template-expressions": [
				"error",
				{ allowNumber: true, allowBoolean: true },
			],
			// Next wymaga async przy np. redirects() i generateStaticParams bez await.
			"@typescript-eslint/require-await": "off",
		},
	},

	// Ogólne reguły jakości.
	{
		rules: {
			eqeqeq: ["error", "smart"],
			"no-console": ["warn", { allow: ["warn", "error"] }],
			"object-shorthand": "error",
			"prefer-const": "error",
			"prefer-template": "error",
			"react/jsx-curly-brace-presence": [
				"error",
				{ props: "never", children: "never" },
			],
			// Odpowiednik noDangerouslySetInnerHtml z Biome: każde użycie wymaga uzasadnienia.
			"react/no-danger": "error",
			// Reguła z czasów Pages Routera: `/forms` pasuje do app/[locale], a to
			// przekierowanie z next.config.ts na zewnętrzny formularz.
			"@next/next/no-html-link-for-pages": "off",
			"react/self-closing-comp": "error",
		},
	},

	// Sortowanie importów i eksportów (zamiast organizeImports z Biome).
	{
		plugins: { "simple-import-sort": simpleImportSort },
		rules: {
			"simple-import-sort/imports": "error",
			"simple-import-sort/exports": "error",
			"import/first": "error",
			"import/newline-after-import": "error",
			"import/no-duplicates": "error",
		},
	},

	// Skrypty Node (np. scripts/check-i18n.mjs) nie mają reguł opartych na typach.
	{
		files: ["**/*.{js,mjs,cjs}"],
		extends: [tseslint.configs.disableTypeChecked],
		rules: { "no-console": "off" },
	},

	// Wyłącza reguły kolidujące z Prettierem. Musi być na końcu.
	prettier,
]);
