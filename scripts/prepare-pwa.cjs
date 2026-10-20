// Generate an exact, versioned app shell after Angular emits its hashed bundles.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const output = path.resolve(process.argv[2] || 'dist/mythras-tools');
if (!fs.existsSync(path.join(output, 'index.html'))) throw new Error('Build the Angular app before preparing offline support.');
const files = [];
function collect(directory) {
  for (const entry of fs.readdirSync(directory, {withFileTypes:true})) {
    const filename=path.join(directory,entry.name);
    if (entry.isDirectory()) collect(filename);
    else if (!['sw.js','404.html','.gitkeep'].includes(entry.name) && !entry.name.endsWith('.map')) files.push(path.relative(output,filename).split(path.sep).join('/'));
  }
}
collect(output);
files.sort();
const hash=crypto.createHash('sha256');
for(const filename of files) { hash.update(filename); hash.update(fs.readFileSync(path.join(output,filename))); }
const template=fs.readFileSync(path.join(__dirname,'service-worker.template.js'),'utf8');
hash.update(template);
const version=hash.digest('hex').slice(0,20);
fs.writeFileSync(path.join(output,'sw.js'),template.replace('/* BUILD_MANIFEST */',JSON.stringify({version,files})));
console.log(`Offline shell ready: ${files.length} files, version ${version}`);
