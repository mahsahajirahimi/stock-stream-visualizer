const WebSocket = require('ws');

const { generateMockMessage } = require('./utils/dataGenerator');

const wss = new WebSocket.Server({ port: 8080 });

console.log('📡 WebSocket server started on ws://localhost:8080');

wss.on('connection', (ws) => {
  console.log('✅ Client connected');

  const firstMessage = generateMockMessage();
  ws.send(firstMessage);
  console.log('📤 Sent initial message');

  const interval = setInterval(() => {
    const message = generateMockMessage();
    try {
      ws.send(message);
      console.log('📤 Sent periodic message');
    } catch (err) {
      console.error('❌ Error sending message:', err.message);
    }
  }, 10000);

  ws.on('close', (code, reason) => {
    clearInterval(interval);
    console.log(`❌ Client disconnected. Code: ${code}, Reason: ${reason}`);
  });

  ws.on('error', (err) => {
    console.error('🛑 WebSocket error:', err.message);
  });
});
