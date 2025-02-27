import fs from 'node:fs';
import { getFolders, readPackageJson } from './utils.js';

const packageJson = readPackageJson();
const excludeFolders = [];

function setPackageExport() {
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
  const indexContent = folders
    .map(folder => {
      if (excludeFolders.includes(folder)) return;
      return `export { default as ${folder} } from 'library/${folder}';`;
    })
    .filter(Boolean)
    .join('\n');
  fs.writeFileSync('src/components/index.ts', indexContent);
}

setPackageExport();
setComponentIndex();
