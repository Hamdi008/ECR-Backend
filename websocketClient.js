// Import the 'ws' module
const WebSocket = require('ws');

// Create a WebSocket client that connects to the WebSocket server
const ws = new WebSocket('ws://192.168.116.249:50000');

// Event listener for when the connection is open
ws.on('open', function open() {
  console.log('Connected to the WebSocket server');
  
  // Send a message to the server
  ws.send('Hello from WebSocket client!');
});

// Event listener for when a message is received from the server
ws.on('message', function incoming(data) {
  console.log('Received:', data);
});

// Event listener for when the connection is closed
ws.on('close', function close() {
  console.log('Disconnected from the WebSocket server');
});

// Event listener for when there is an error with the connection
ws.on('error', function error(err) {
  console.error('WebSocket error:', err);
});
