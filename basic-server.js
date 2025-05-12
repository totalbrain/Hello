// Minimal Express server
import express from 'express';

const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('Basic server is working!');
});

app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'API is working!' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Basic server running on http://0.0.0.0:${port}`);
});