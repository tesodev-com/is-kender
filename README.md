# Vue Component Library

## Introduction

This is an open-source Vue 3 component library built with TypeScript, SCSS, and Vite. The library follows a strict structure to maintain consistency and scalability.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Install Dependencies](#install-dependencies)
  - [Start Development Server](#start-development-server)
  - [Create New Component](#create-new-component)
  - [Run Storybook](#run-storybook)
  - [Run Tests](#run-tests)
- [Project Structure](#project-structure)
  - [Folder Structure](#folder-structure)
- [Development Guidelines](#development-guidelines)
  - [Component Structure](#1-component-structure)
  - [Storybook Stories](#2-storybook-stories)
  - [Styling Rules](#3-styling-rules)
  - [TypeScript & Code Quality](#4-typescript--code-quality)
  - [Testing Guidelines](#5-testing-guidelines)
- [Local Development & Testing](#local-development--testing)
  - [Testing Package Locally with Yalc](#testing-package-locally-with-yalc)
- [Publishing & Versioning](#publishing--versioning)
  - [Contribution Guidelines](#contribution-guidelines)
  - [Publishing Workflow](#publishing-workflow)
- [Best Practices](#best-practices)
  - [Steps for a Good Component Library](#steps-for-a-good-component-library)
- [Code Examples](#code-examples)
  - [Example Component Structure](#example-component-structure)
  - [Example Storybook File](#example-storybook-file)
- [License](#license)

## Tech Stack

- **Vue 3** - Component-based framework
- **TypeScript** - Strongly typed codebase
- **SCSS** - Modular styling
- **Vitest** - Unit testing framework
- **Storybook** - Component documentation and visualization

## Getting Started

### Install Dependencies

```sh
yarn install
```

### Start Development Server

```sh
yarn dev
```

### Create New Component

You can quickly scaffold a new component using the create-component script:

```sh
yarn create:component ComponentName
```

This will create a new component folder with all the necessary files following the project's structure guidelines.

### Run Storybook

```sh
yarn storybook
```

### Run Tests

```sh
yarn test
```

## Project Structure

### Folder Structure

```
/src
  /components
    /Button
      Button.vue
      Button.test.ts
      index.ts
    /Input
      Input.vue
      Input.test.ts
      index.ts
  /stories
    Button.stories.ts
    Input.stories.ts
  /assets
    /styles
      _variables.scss
      _mixins.scss
      _global.scss
  /globalTypes
    types.ts
  index.ts
/vitest.config.ts
/vite.config.ts
/storybook
```

## Development Guidelines

### 1. Component Structure

- Each component must reside in its own folder inside `/components/`.
- Component-related files (**.vue, .spec.ts, index.ts**) must stay inside their respective component folders.
- Every component must export itself via `index.ts` inside its folder.

### 2. Storybook Stories

- Stories should be placed inside `/stories/`, **not inside component folders**.
- Each story file should follow the naming convention: `ComponentName.stories.ts`.

### 3. Styling Rules

- Use SCSS for styling; no inline styles or CSS modules.
- Global variables and mixins should be placed in `/styles/`.
- Component styles should be scoped using `scoped` attribute in `<style>`.

### 4. TypeScript & Code Quality

- All components must be written in **TypeScript**.
- Use **ESLint** and **StyleLint** for code formatting.
- Avoid `any` type; always prefer strict typing.
- Follow Vue 3 Composition API best practices.

### 5. Testing Guidelines

- Each component must have a corresponding test file inside its folder.
- Use **Vitest** and **Vue Test Utils** for unit testing.
- Ensure all tests pass before submitting a PR.
- Run tests using:
  ```sh
  yarn test
  ```

## Local Development & Testing

### Testing Package Locally with Yalc

Before publishing your package, you can test it locally in your projects using Yalc. Yalc creates a local package store and simulates package installation, making it perfect for testing your component library in real projects.

1. Install Yalc globally:

```sh
npm install -g yalc
```

2. Build your package:

```sh
yarn build
```

3. Publish to Yalc:

```sh
yalc push
```

4. In your test project, add the package using Yalc:

```sh
yalc add @tsd/component-library
```

5. When you make changes to your component library:

```sh
yarn build
yalc push
```

6. To remove the package from your test project:

```sh
yalc remove @tsd/component-library
```

This workflow allows you to test your component library in real projects before publishing to npm, ensuring everything works as expected.

## Publishing & Versioning

### Contribution Guidelines

1. Fork the repository.
2. Create a new branch: `feature/<user-name>/<subject>`.
3. Follow the folder structure and coding guidelines.
4. Write tests and ensure 90% coverage.
5. Open a **pull request** with a detailed description.
6. Wait for review and approval.

### Publishing Workflow

1. Run `yarn build` to generate the production build.
2. Ensure all tests pass.
3. Versioning follows **Semantic Versioning (SemVer)**.
4. **Only maintainers** can publish to NPM.

#### **Breakdown of SemVer** (X.Y.Z)

1. MAJOR (X) – Breaking changes
   Increases when you make incompatible API changes.
   Example: 1.0.0 → 2.0.0 (Old code may not work with this update).
2. MINOR (Y) – New features (non-breaking)
   Increases when you add functionality that is backward-compatible.
   Example: 1.2.0 → 1.3.0 (New features added, but old ones still work).
3. PATCH (Z) – Bug fixes and small changes
   Increases when you make backward-compatible bug fixes.
   Example: 1.2.3 → 1.2.4 (No new features, just fixes).

## Best Practices

### Steps for a Good Component Library

1. **Modular Design**: Ensure each component is reusable and independent.
2. **Scalability**: Plan for new components and extensions.
3. **Consistency**: Follow a unified design system and coding standards.
4. **Performance Optimization**: Use lazy loading and tree-shaking where necessary.
5. **Accessibility (a11y)**: Ensure components are keyboard and screen-reader friendly.
6. **Comprehensive Documentation**: Provide clear usage examples and API references.
7. **Automated Testing**: Maintain high test coverage with unit and snapshot tests.
8. **Storybook Integration**: Use Storybook to showcase and document components.
9. **CI/CD Setup**: Automate testing, building, and publishing workflows.
10. **Community Engagement**: Encourage contributions and maintain transparency.

## Code Examples

### Example Component Structure

```vue
<template>
  <div>Example</div>
</template>
<script setup lang="ts">
// 1. Imports (Libraries, Components, Utils)
import { ref, computed, watch } from "vue";

// 2. Types & Interfaces (for TypeScript projects)
interface ExampleProps {
  text: string;
}

// 3. Constants (Static values, enums)
const MAX_LENGTH = 100;

// 4. Props & Emits (Props should come before state)
defineProps<ExampleProps>();
const emit = defineEmits<{
  (event: "update", value: string): void;
}>();

// 5. Composables (Reusable logic)
const { someComposableState } = useSomeComposable();

// 6. Reactive State (refs, reactive objects)
const count = ref(0);
const user = reactive({ name: "John", age: 30 });

// 7. Computed Properties (Derived state)
const doubleCount = computed(() => count.value * 2);

// 8. Watchers (For reacting to state changes)
watch(count, (newVal) => {
  console.log("Count changed:", newVal);
});

// 9. Lifecycle Hooks (Mounting, cleanup, etc.)
onMounted(() => {
  console.log("Component Mounted");
});

// 10. Methods (Event handlers, logic)
function increment() {
  console.log("Method Example");
}
</script>
<style lang="scss" scoped src="<filepath>"></style>
```

### Example Storybook File

```ts
// src/stories/Button.stories.ts
import Button from "../components/Button/Button.vue";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    label: { control: "text" },
    primary: { control: "boolean" },
  },
};

const Template = (args: any) => ({
  components: { Button },
  setup() {
    return { args };
  },
  template: '<Button v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {
  label: "Click me",
  primary: true,
};
```

## License

MIT License. Contributions are welcome! 🚀
