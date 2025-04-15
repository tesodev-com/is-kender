import fs from 'node:fs';
import { getFolders, readPackageJson } from './utils';

const packageJson = readPackageJson();
const excludeFolders: string[] = [];

function setPackageExport() {
  const folders = getFolders('src/components') as string[];
  const exports = packageJson.exports || {};
  folders.forEach(folder => {
    if (excludeFolders.includes(folder)) return;
    exports[`./${folder.toLowerCase()}`] = {
      types: `./dist/components/${folder}/index.d.ts`,
      import: `./dist/components/${folder}/index.js`,
    };
  });
  packageJson.exports = exports;
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
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
  fs.writeFileSync('src/components/index.ts', indexContent);
}

export default function preBuild() {
  return {
    name: 'pre-build',
    buildStart() {
      setPackageExport();
      setComponentIndex();
    },
  };
}
