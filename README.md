<img 
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
  <a href="https://tesodev-com.github.io/is-kender" target="_blank" rel="noopener noreferrer">
    <img alt="Storybook" src="https://img.shields.io/badge/Storybook-Live-blue">
  </a>
  <a href="https://github.com/semantic-release/semantic-release" target="_blank" rel="noopener noreferrer">
    <img alt="semantic-release" src="https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release">
  </a>
</div>

This component library is designed for building modern web applications, featuring reusable UI components. Our library is crafted to help developers create user interfaces quickly and consistently.

<!-- Storybook-Btn:Start -->

<p align="center">
  <a href="https://tesodev-com.github.io/is-kender" target="_blank" rel="noopener noreferrer">
    <img alt="Storybook" src="https://raw.githubusercontent.com/storybookjs/brand/refs/heads/main/logo/logo-storybook-inverse.svg" width="200px">
  </a>
</p>

<!-- Storybook-Btn:End -->

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

If you'd like to contribute to this project, please don't hesitate to submit a pull request. All contributions are welcome! For more information check our [Contribution Guideline document](https://github.com/tesodev-com/is-kender/blob/master/CONTRIBUTING.md).

## **Contributors**

<a href="https://github.com/tesodev-com/is-kender/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=tesodev-com/is-kender" />
</a>

## **License**

MIT License - See [LICENSE](LICENSE) file for more information.
