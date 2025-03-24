import fs from 'node:fs';
import { indexFile, mapPlaceholders, scssFile, storyFile, testFile, typesFile, vueFile } from './templates.js';

const files = [
  {
    type: 'components',
    ext: '.vue',
    template: placeholders => mapPlaceholders(vueFile, placeholders),
  },
  {
    type: 'components',
    ext: '.style.scss',
    template: scssFile,
  },
  {
    type: 'components',
    ext: '.spec.ts',
    template: testFile,
  },
  {
    type: 'components',
    name: 'index',
    ext: '.ts',
    template: placeholders => mapPlaceholders(indexFile, placeholders),
  },
  {
    type: 'components',
    name: 'types',
    ext: '.ts',
    template: placeholders => mapPlaceholders(typesFile, placeholders),
  },
  {
    type: 'stories',
    ext: '.stories.ts',
    template: storyFile,
  },
];

function createComponentFiles() {
  try {
    const componentName = process.argv[2];
    if (!componentName) {
      console.error('Component name is required');
      return;
    }
    const componentNameCapitalized = componentName.charAt(0).toUpperCase() + componentName.slice(1);
    const path = `./src/components/${componentNameCapitalized}`;
    const placeholders = { $template: componentNameCapitalized, $scssFile: `${componentNameCapitalized}.style.scss` };
    fs.mkdirSync(path);
    files.forEach(file => {
      if (file.type === 'components') {
        fs.writeFileSync(`${path}/${file?.name || componentNameCapitalized}${file.ext}`, typeof file.template === 'function' ? file.template(placeholders) : file.template);
      } else if (file.type === 'stories') {
        fs.writeFileSync(`./src/stories/${componentNameCapitalized}${file.ext}`, typeof file.template === 'function' ? file.template(placeholders) : file.template);
      }
    });
  } catch (error) {
    if (error.code === 'EEXIST') {
      console.error('Component already exists');
    } else {
      console.error(error);
    }
  }
}

createComponentFiles();
