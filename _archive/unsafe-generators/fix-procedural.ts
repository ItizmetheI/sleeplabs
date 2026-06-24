import fs from 'node:fs';

let f = fs.readFileSync('scripts/procedural-blogs.mjs', 'utf8');
f = f.replace(/\\\$\\{/g, '${');
f = f.replace(/\\\\s\+/g, '\\s+');
f = f.replace(/\\\\n/g, '\\n');
fs.writeFileSync('scripts/procedural-blogs.mjs', f);
console.log('Fixed');
