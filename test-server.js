import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;

// Handle JSON requests
app.use(express.json());

// Simple test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// Serve a simple HTML page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>GIF Generator Test</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1 { color: #4361ee; }
        .test-button { background: #4361ee; color: white; border: none; padding: 10px 15px; 
          border-radius: 4px; cursor: pointer; }
        .test-button:hover { background: #3a56d4; }
        #result { margin-top: 20px; padding: 10px; border: 1px solid #ddd; border-radius: 4px; }
      </style>
    </head>
    <body>
      <h1>GIF Generator Test Server</h1>
      <p>Click the button below to test the server connection:</p>
      <button class="test-button" id="testButton">Test API Connection</button>
      <div id="result"></div>
      
      <script>
        document.getElementById('testButton').addEventListener('click', async () => {
          const resultDiv = document.getElementById('result');
          resultDiv.innerHTML = 'Testing connection...';
          
          try {
            const response = await fetch('/api/test');
            const data = await response.json();
            resultDiv.innerHTML = \`Success! Server response: <strong>\${data.message}</strong>\`;
          } catch (error) {
            resultDiv.innerHTML = \`Error: \${error.message}\`;
          }
        });
      </script>
    </body>
    </html>
  `);
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Test server running at http://0.0.0.0:${port}`);
});