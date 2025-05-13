# Contributing to Component Library

Thank you for your interest in contributing to our component library! This document provides guidelines and steps for contributing.

## Table of Contents

1. [How to Contribute](#how-to-contribute)
2. [Development Process](#development-process)
3. [Quality Checks](#quality-checks)
4. [Code Standards](#code-standards)
5. [Review Process](#review-process)

## How to Contribute

### 1. Create an Issue

Before making any changes, please create an issue to discuss the proposed changes. This helps us:

- Avoid duplicate work
- Ensure the change aligns with our goals
- Plan the implementation

When creating an issue, please:

- Use a clear and descriptive title
- Provide a detailed description of the proposed changes
- Include any relevant screenshots or examples
- Label the issue appropriately (bug, enhancement, etc.)

### 2. Create a Pull Request

Once your issue is approved, you can create a pull request:

1. Fork the repository
2. Create a new branch from `master`:
   ```bash
   git checkout -b feature/your-name/subject
   ```
3. Make your changes
4. Push your branch and create a pull request
5. Link your pull request to the related issue using the issue number

## Development Process

### Local Testing with Yalc

Before publishing your package, you can test it locally in your projects using Yalc. Yalc creates a local package store and simulates package installation, making it perfect for testing your component library in real projects.

1. Install Yalc globally:

```bash
npm install -g yalc
```

2. Build your package:

```bash
yarn build
```

3. Publish to Yalc:

```bash
yalc push
```

4. In your test project, add the package using Yalc:

```bash
yalc add @tsd/component-library
```

5. When you make changes to your component library:

```bash
yarn build
yalc push
```

6. To remove the package from your test project:

```bash
yalc remove @tsd/component-library
```

### Component Structure

Maintain the existing component structure:

- Follow the established file organization
- Use consistent naming conventions
- Include necessary documentation
- Add proper TypeScript types
- Include unit tests
- Add Storybook stories

#### Vue Component Structure Example

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

## Quality Checks

Before submitting your pull request, please ensure you've completed the following:

### 1. Build and Verify

```bash
# Install dependencies
yarn install

# Run build
yarn build

# Verify the build output
```

### 2. Lint Your Code

```bash
# Run linter
yarn lint
```

### 3. Test Coverage

- Aim for 100% test coverage
- Run tests:
  ```bash
  yarn test
  ```
- Check coverage report:
  ```bash
  yarn coverage
  ```

## Code Standards

### Style Guidelines

- Follow the existing code style
- Use meaningful variable and function names
- Write clear and concise comments
- Keep components small and focused
- Follow the single responsibility principle

### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## Review Process

1. All pull requests require at least one review
2. CI checks must pass
3. Code review feedback must be addressed
4. Maintainers will merge the PR once approved

## Questions?

If you have any questions, feel free to:

- Comment on the issue
- Reach out to the maintainers
- Check our documentation

Thank you for contributing! 🚀
