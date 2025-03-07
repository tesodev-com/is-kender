import fs from 'fs';
import { glob } from 'glob';
import { dirname, join, relative } from 'path';

function copyPackageJson() {
  const packageJsonFiles = glob.sync('./src/**/package.json');
  packageJsonFiles.forEach(file => {
    const srcDir = dirname(file);
    const relativePath = relative('src', srcDir);
    const destDir = join('dist', relativePath);
    if (fs.existsSync(destDir)) {
      const json = fs.readFileSync(file, 'utf8');
      const replacedJson = json.replace(new RegExp('.vue', 'g'), '.js');
      fs.writeFileSync(join(destDir, 'package.json'), replacedJson);
      return;
    }
  });
}

copyPackageJson();
