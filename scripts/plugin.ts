import fs from 'node:fs';
import { getFolders, readPackageJson } from './utils';

const packageJson = readPackageJson();
const excludeFolders: string[] = ['calculatePosition', 'eventBus', 'localStorage', 'position'];

function setPackageExport() {
  const componentFolders = getFolders('src/components') as string[];
  const composableFolders = getFolders('src/composables') as string[];
  const utilsFolders = getFolders('src/utils') as string[];
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
  utilsFolders.forEach(folder => {
    if (excludeFolders.includes(folder)) return;
    exports[`./${folder}`] = {
      types: `./dist/utils/${folder}/index.d.ts`,
      import: `./dist/utils/${folder}/index.js`,
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
  };
}
