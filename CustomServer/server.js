// Import required modules
const http = require('http');
const os = require('os');
const path = require('path');
const EventEmitter = require('events');

// Custom event emitter class
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

// Event listener
myEmitter.on('userVisit', () => {
  console.log('A new user visited the site!');
});

// Create HTTP server
const server = http.createServer((req, res) => {
  // Emit custom event whenever a request comes in
  myEmitter.emit('userVisit');

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Welcome to Custom Node.js Server</h1>');

  // Explore OS module
  res.write('<h2>System Info:</h2>');
  res.write(`<p>Hostname: ${os.hostname()}</p>`);
  res.write(`<p>Platform: ${os.platform()}</p>`);
  res.write(`<p>Free Memory: ${os.freemem()} bytes</p>`);

  // Explore Path module
  const filePath = __filename;
  res.write('<h2>Path Info:</h2>');
  res.write(`<p>File: ${path.basename(filePath)}</p>`);
  res.write(`<p>Directory: ${path.dirname(filePath)}</p>`);
  res.write(`<p>Extension: ${path.extname(filePath)}</p>`);

  res.end('<h3>Request handled successfully!</h3>');
});

// Start the server
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

