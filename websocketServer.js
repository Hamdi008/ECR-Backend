const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 },()=>{
    console.log('WebSocket server started on ws://localhost:8080');
});

wss.on('connection', ws => {
  console.log('New client connected');

  ws.on('message', message => {
    console.log(`Received: ${message}`);

    // Broadcast the received message to all connected clients
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(`Broadcast message: ${message}`);
        }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
