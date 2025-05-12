import { spawn } from 'child_process';

// Create a child process for the server
console.log('Starting server with detailed logging...');
const server = spawn('npx', ['tsx', 'server/index.ts'], {
  env: { ...process.env, NODE_ENV: 'development', DEBUG: '*' },
  stdio: 'pipe' // Capture output
});

// Forward stdout and stderr to our process
server.stdout.on('data', (data) => {
  console.log(`Server stdout: ${data}`);
});

server.stderr.on('data', (data) => {
  console.error(`Server stderr: ${data}`);
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.kill('SIGINT');
  process.exit(0);
});