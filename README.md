<div align="center" width="150px">
  <img style="width: 150px; height: auto;" src="assets/logo.png" alt="Logo - Strapi Plugin App Version" />
</div>
<div align="center">
  <h1>Strapi v5 - Plugin App Version</h1>
  <p>Strapi Plugin that displays your app version in the Strapi settings</p>
  <a href="https://www.npmjs.org/package/strapi-plugin-app-version">
    <img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/ChristopheCVB/strapi-plugin-app-version?label=npm&logo=npm">
  </a>
  <a href="https://www.npmjs.org/package/strapi-plugin-app-version">
    <img src="https://img.shields.io/npm/dm/strapi-plugin-app-version.svg" alt="Monthly download on NPM" />
  </a>
</div>

---

<div style="margin: 20px 0" align="center">
  <img style="width: 100%; height: auto;" src="assets/preview.png" alt="UI preview" />
</div>

A plugin for [Strapi Headless CMS](https://github.com/strapi/strapi) that displays your app version in the Strapi settings

## Features
- Display your app version in the Strapi settings

## Usage

To configure the **App Version** plugin, add your configuration to the plugin settings. The configuration consist of an object with the version:

```typescript
type Config = {
  version: string
}
```

### Example Configuration

```typescript
// config/plugins.ts
import type { Config as AppVersionConfig } from 'strapi-plugin-app-version/dist/server/src/config'

import packageJson from '../package.json'

export default () => ({
  'app-version': {
    enabled: true,
    config: {
      version: packageJson.version,
    } satisfies AppVersionConfig,
  }
})
```
