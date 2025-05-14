<img 
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
  src="https://raw.githubusercontent.com/tesodev-com/is-kender/master/public/is-kender.png" 
  alt="Iskender Component Library" 
  style="width: 100%; height: 40rem; object-fit: contain;" 
/>

<h1 align="center">Iskender Component Library</h1>

<div style="display:flex;align-items:center;justify-content:center;gap:0.5rem;">
  <a href="https://www.npmjs.com/package/@tesodev/is-kender" target="_blank" rel="noopener noreferrer">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/%40tesodev%2Fis-kender">
  </a>
  <a href="https://github.com/tesodev-com/is-kender" target="_blank" rel="noopener noreferrer">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/tesodev-com/is-kender">
  </a>
  <a href="${{ steps.build-publish.outputs.page_url }}" target="_blank" rel="noopener noreferrer">
    <img alt="Storybook" src="https://img.shields.io/badge/Storybook-Live-blue">
  </a>
  <a href="https://github.com/semantic-release/semantic-release" target="_blank" rel="noopener noreferrer">
    <img alt="semantic-release" src="https://img.shields.io/badge/semantic--release-vue-e10079?logo=semantic-release">
  </a>
</div>

This component library is designed for building modern web applications, featuring reusable UI components. Our library is crafted to help developers create user interfaces quickly and consistently.

## **Getting Started**

To add our library to your project:

```bash
npm install @tesodev/is-kender
# or
yarn add @tesodev/is-kender
```

### Vue Plugin Usage

You can use our library as a Vue plugin. Here's how to set it up:

```js
// main.js
import { createApp } from "vue";
import App from "./App.vue";
import IsKender from "@tesodev/is-kender";

const app = createApp(App);

// Use the plugin
app.use(IsKender);
app.mount("#app");
```

Then you can use components in your Vue templates:

```html
<lib-button>Click me</lib-button>
```

### Nuxt Plugin Usage

For Nuxt.js applications, you can use our library as a Nuxt plugin. Create a new file in your plugins directory:

```ts
// plugins/is-kender.ts
import { defineNuxtPlugin } from "#app";
import IsKender from "@tesodev/is-kender";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(IsKender);
});
```

Then you can use components in your Nuxt pages and components:

```html
<lib-button>Click me</lib-button>
```

## **Contributing**

If you'd like to contribute to this project, please don't hesitate to submit a pull request. All contributions are welcome! For more information check our [Contribution Guideline document](CONTRIBUTING.md).

## **License**

MIT License - See [LICENSE](LICENSE) file for more information.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/tanzeratay"><img src="https://avatars.githubusercontent.com/u/17411664?v=4?s=100" width="100px;" alt="tanzeratay"/><br /><sub><b>tanzeratay</b></sub></a><br /><a href="https://github.com/tesodev-com/is-kender/commits?author=tanzeratay" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!