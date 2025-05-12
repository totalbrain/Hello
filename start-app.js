// Load the server from our main file
console.log('Starting GIF Generator Application...');
import { spawn } from 'child_process';

const proc = spawn('npx', ['tsx', 'server/index.ts'], {
  env: { ...process.env, NODE_ENV: 'development' },
  stdio: 'inherit'
});

proc.on('error', (err) => {
  console.error('Failed to start server:', err);
});

// Keep process running
process.on('SIGINT', () => {
  proc.kill('SIGINT');
  process.exit(0);
});