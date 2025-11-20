const http = require('http');
const os = require('os');
const path = require('path');
const EventEmitter = require('events');

// Create a custom event emitter
const myEvents = new EventEmitter();

// Event listener
myEvents.on('requestReceived', () => {
  console.log('A new request was received!');
});

http.createServer((req, res) => {

  // Emit event every time a request comes
  myEvents.emit('requestReceived');

  const f = __filename;

  res.end(`
    <h1>Welcome to Node Server</h1>

    <h2>System Info</h2>
    <p>Host: ${os.hostname()}</p>
    <p>Platform: ${os.platform()}</p>
    <p>Free Memory: ${os.freemem()} bytes</p>

    <h2>Path Info</h2>
    <p>File: ${path.basename(f)}</p>
    <p>Dir: ${path.dirname(f)}</p>
    <p>Ext: ${path.extname(f)}</p>

    <h2>Event Info</h2>
    <p>Check console for event logs!</p>

    <h3>Request handled!</h3>
  `);
}).listen(4000, () => console.log('Server running at http://localhost:4000'));
