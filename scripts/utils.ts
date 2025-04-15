import fs from 'node:fs';

export function getFolders(path: string) {
  return fs.readdirSync(path).filter(file => fs.statSync(`${path}/${file}`).isDirectory());
}

export function readPackageJson() {
  return JSON.parse(fs.readFileSync('package.json', 'utf8'));
}
