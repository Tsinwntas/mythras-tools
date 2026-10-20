// One GitHub Pages build command for Windows, macOS and Linux; no Bash required.
const path = require('path');
const fs = require('fs');
const {spawnSync} = require('child_process');

const root = path.resolve(__dirname, '..');
function run(script, args) {
  const result = spawnSync(process.execPath, [script, ...args], {cwd:root, stdio:'inherit'});
  if (result.error) console.error(result.error.message);
  if (result.error || result.status !== 0) process.exit(result.status || 1);
}

run(require.resolve('@angular/cli/bin/ng.js'), ['build', '--output-path', 'docs', '--base-href', process.argv[2] || './']);
fs.copyFileSync(path.join(root, 'docs/index.html'), path.join(root, 'docs/404.html'));
run(path.join(__dirname, 'prepare-pwa.cjs'), [path.join(root, 'docs')]);
console.log('GitHub Pages build ready in docs/.');
