import { WebSocketServer } from 'ws';
import { Server } from 'http';
import { parse } from 'url';
import { getSession } from 'next-auth/react';

interface WebSocketClient extends WebSocket {
  userId?: string;
  isAlive: boolean;
}

export default function setupWebSocketServer(server: Server) {
  const wss = new WebSocketServer({ noServer: true });

  server.on('upgrade', async (request, socket, head) => {
    try {
      const { query } = parse(request.url!, true);
      const session = await getSession({ req: request });

      if (!session?.user) {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
        return;
      }

      wss.handleUpgrade(request, socket, head, (ws) => {
        const client = ws as WebSocketClient;
        client.userId = session.user.id;
        client.isAlive = true;
        wss.emit('connection', client);
      });
    } catch (error) {
      console.error('WebSocket upgrade error:', error);
      socket.write('HTTP/1.1 500 Internal Server Error\r\n\r\n');
      socket.destroy();
    }
  });

  wss.on('connection', (ws: WebSocketClient) => {
    console.log(`Client connected: ${ws.userId}`);

    ws.on('pong', () => {
      ws.isAlive = true;
    });

    ws.on('message', async (message: string) => {
      try {
        const data = JSON.parse(message);
        handleWebSocketMessage(ws, data);
      } catch (error) {
        console.error('Error handling WebSocket message:', error);
      }
    });

    ws.on('close', () => {
      console.log(`Client disconnected: ${ws.userId}`);
    });
  });

  // Heartbeat to keep connections alive
  const interval = setInterval(() => {
    wss.clients.forEach((ws: WebSocketClient) => {
      if (!ws.isAlive) {
        ws.terminate();
        return;
      }
      ws.isAlive = false;
      ws.ping();
    });
  }, 30000);

  wss.on('close', () => {
    clearInterval(interval);
  });

  return wss;
}

async function handleWebSocketMessage(ws: WebSocketClient, data: any) {
  switch (data.type) {
    case 'notification_read':
      broadcastToUser(ws.userId!, {
        type: 'notification_update',
        data: { id: data.id, read: true },
      });
      break;

    case 'chat_message':
      broadcastToUser(data.receiverId, {
        type: 'new_message',
        data: data.message,
      });
      break;

    case 'progress_update':
      broadcastToUser(ws.userId!, {
        type: 'progress_sync',
        data: data.progress,
      });
      break;

    default:
      console.warn('Unknown WebSocket message type:', data.type);
  }
}

function broadcastToUser(userId: string, message: any) {
  const wss = global.wss as WebSocketServer;
  wss.clients.forEach((client: WebSocketClient) => {
    if (client.userId === userId && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
} 