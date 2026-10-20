# Repository Guidelines

## Project Structure & Module Organization

This TypeScript plugin displays application version information in Strapi v5 settings.

- `admin/src/`: React pages, components, translations, and translation helpers; `index.ts` registers the admin integration.
- `server/src/`: controllers, routes, configuration validation, and lifecycle hooks; `index.ts` exports the server integration.
- `server/src/__tests__/`: server unit tests, including controller tests.
- `assets/`: README logo and preview images.
- `dist/`: generated package output; do not edit or commit it.
- `.github/`: shared CI, pull request, and release workflows.

## Build, Test, and Development Commands

Use Node 22 (minimum `22.22.1`) and the pnpm version pinned in `package.json`. Set up with `mise trust`, `mise install`, then `pnpm install --frozen-lockfile`.

- `pnpm watch`: rebuild the plugin as source changes.
- `pnpm watch:link`: develop against a linked local Strapi application.
- `pnpm typecheck:front` / `pnpm typecheck:back`: check admin/server TypeScript.
- `pnpm lint` / `pnpm lint:fix`: check style or apply automatic fixes.
- `pnpm test --run`: run tests once; `pnpm test:watch` enables watch mode.
- `pnpm test:coverage`: generate V8 text, JSON, and HTML coverage reports.
- `pnpm build`: build distributable admin and server bundles.
- `pnpm verify`: validate the built plugin package.

## Coding Style & Naming Conventions

Follow `eslint.config.mjs`: two-space indentation, single quotes, no semicolons, LF endings, and trailing commas in multiline structures. Use TypeScript and explicit types at module boundaries. Name React component files in PascalCase, such as `HomePage.tsx`; use camelCase for helpers, such as `getTranslation.ts`. Reuse existing `PLUGIN_ID` constants and Strapi design-system components.

## Testing Guidelines

Vitest runs in a Node environment and discovers `server/src/__tests__/**/*.test.ts`. Add regression tests beside related tests, using `describe`/`it`, assertions, and mocked Strapi APIs. Coverage includes server source; no minimum threshold is configured. For admin changes, run frontend typechecking and check the settings page in a host Strapi application.

## Commit & Pull Request Guidelines

Use the Conventional Commit pattern found in history: `fix: ...`, `chore(deps): ...`, or `chore(ci): ...`. Keep commits focused. Target `main`; describe the change and validation, link relevant issues, and include screenshots for visible admin changes. Before requesting review, pass both typechecks, lint, tests, build, and package verification, matching CI.
