import fs from 'fs';
import path from 'path';
import { COMPONENT_TEMPLATE, COMPONENT_TYPES_TEMPLATE, EXPORT_TEMPLATE, STORY_TEMPLATE, STYLE_TEMPLATE } from './templates';

function toPascalCase(str: string) {
  return str.replace(/(^|\s+)\w/g, match => match.toUpperCase());
}

function createComponent(componentName: string) {
  componentName = toPascalCase(componentName);
  const componentDir = path.join('src/components', componentName);

  if (fs.existsSync(componentDir)) {
    console.error(`Component ${componentName} already exists!`);
    return;
  }

  const componentPath = path.join(componentDir, `${componentName}.vue`);
  const typesPath = path.join(componentDir, 'types.ts');
  const stylePath = path.join(componentDir, `${componentName}.style.scss`);
  const indexPath = path.join(componentDir, 'index.ts');
  const storyPath = path.join('src/stories', `${componentName}.stories.ts`);

  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }

  const componentContent = COMPONENT_TEMPLATE.replace(/ComponentName/g, componentName);
  const typesContent = COMPONENT_TYPES_TEMPLATE.replace(/ComponentName/g, componentName);
  const styleContent = STYLE_TEMPLATE.replace(/ComponentName/g, componentName);
  const indexContent = EXPORT_TEMPLATE.replace(/ComponentName/g, componentName);
  const storyContent = STORY_TEMPLATE.replace(/ComponentName/g, componentName);

  fs.writeFileSync(componentPath, componentContent);
  fs.writeFileSync(typesPath, typesContent);
  fs.writeFileSync(stylePath, styleContent);
  fs.writeFileSync(indexPath, indexContent);
  fs.writeFileSync(storyPath, storyContent);

  console.log(`Component ${componentName} created successfully!`);
  console.log(`Files created:
  - ${componentPath}
  - ${typesPath}
  - ${stylePath}
  - ${indexPath}
  - ${storyPath}`);
}

const componentName = process.argv[2];
if (!componentName) {
  console.error('Please provide a component name');
  process.exit(1);
}

createComponent(componentName);
