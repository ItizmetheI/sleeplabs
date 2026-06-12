import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const logFile = fs.openSync(path.join(process.cwd(), 'scripts/gen.log'), 'a');
const child = spawn('npx', ['tsx', 'scripts/generate-all-blogs.ts', '150'], {
  detached: true,
  stdio: ['ignore', logFile, logFile],
  cwd: process.cwd()
});
child.unref();
console.log('Started background generation of 150 posts. Check scripts/gen.log for progress.');
