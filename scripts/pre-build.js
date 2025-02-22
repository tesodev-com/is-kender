import fs from 'node:fs';
import { getFolders, readPackageJson } from './utils.js';

const packageJson = readPackageJson();
const excludeFolders = [];

function setPackgeExport() {
  const folders = getFolders('src/components');
  const exports = packageJson.exports || {};
  folders.forEach(folder => {
    if (excludeFolders.includes(folder)) return;
    exports[`./${folder.toLowerCase()}`] = {
      types: `./dist/components/${folder}.d.ts`,
      import: `./dist/components/${folder}.js`,
    };
  });
  packageJson.exports = exports;
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
}

function setComponentIndex() {
  const folders = getFolders('src/components');
  const indexContent = folders.map(folder => `export { default as ${folder} } from './${folder}/${folder}.vue';`).join('\n');
  fs.writeFileSync('src/components/index.ts', indexContent);
}

setPackgeExport();
setComponentIndex();
