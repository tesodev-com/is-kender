import fs from 'node:fs';
import { getFolders, readPackageJson } from './utils';

const packageJson = readPackageJson();
const excludeFolders: string[] = [];

function globalDTs() {
  const template = `
declare module 'vue' {
  export interface GlobalComponents {
$componentList
  }
}`;
  const components = getFolders('./src/components');
  const globalComponents = components.map(component => {
    const componentName = component.charAt(0).toUpperCase() + component.slice(1);
    return `    Lib${componentName}: typeof import('./components/${component}')['default']`;
  });
  const globalComponentsString = globalComponents.join('\n');
  const replacedTemplate = template.replace('$componentList', globalComponentsString);
  if (fs.existsSync('./dist/main.d.ts')) {
    fs.appendFileSync('./dist/main.d.ts', replacedTemplate);
  }
}

function setPackageExport() {
  const componentFolders = getFolders('src/components') as string[];
  const composableFolders = getFolders('src/composables') as string[];
  const exports = packageJson.exports || {};
  componentFolders.forEach(folder => {
    if (excludeFolders.includes(folder)) return;
    exports[`./${folder.toLowerCase()}`] = {
      types: `./dist/components/${folder}/index.d.ts`,
      import: `./dist/components/${folder}/index.js`,
    };
  });
  composableFolders.forEach(folder => {
    if (excludeFolders.includes(folder)) return;
    exports[`./${folder}`] = {
      types: `./dist/composables/${folder}/index.d.ts`,
      import: `./dist/composables/${folder}/index.js`,
    };
  });
  packageJson.exports = exports;
  if (fs.existsSync('package.json')) {
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
  }
}

function setComponentIndex() {
  const folders = getFolders('src/components');
  const indexContent =
    folders
      .map(folder => {
        if (excludeFolders.includes(folder)) return;
        return `export { default as ${folder} } from 'library-components/${folder}';`;
      })
      .filter(Boolean)
      .join('\n') + '\n';
  if (fs.existsSync('src/components/index.ts')) {
    fs.writeFileSync('src/components/index.ts', indexContent);
  }
}

function setComposableIndex() {
  const folders = getFolders('src/composables');
  const indexContent =
    folders
      .map(folder => {
        if (excludeFolders.includes(folder)) return;
        return `export * from 'library-composables/${folder}';`;
      })
      .filter(Boolean)
      .join('\n') + '\n';
  if (fs.existsSync('src/composables/index.ts')) {
    fs.writeFileSync('src/composables/index.ts', indexContent);
  }
}

export default function libPlugin() {
  return {
    name: 'lib-plugin',
    buildStart() {
      setPackageExport();
      setComponentIndex();
      setComposableIndex();
    },
    closeBundle() {
      globalDTs();
    },
  };
}
