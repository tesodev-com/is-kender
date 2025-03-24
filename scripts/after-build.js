import fs from 'fs';
import { getFolders } from './utils.js';

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
  fs.appendFileSync('./dist/main.d.ts', replacedTemplate);
}

globalDTs();
