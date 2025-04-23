import WebSocket from 'ws';
import { createServer } from 'http';
import { AddressInfo } from 'net';
import setupWebSocketServer from '@/server/websocket';
import { getSession } from 'next-auth/react';

jest.mock('next-auth/react');

describe('WebSocket Server', () => {
  let server: any;
  let wss: any;
  let clientSocket: WebSocket;
  let port: number;

  beforeAll((done) => {
    server = createServer();
    wss = setupWebSocketServer(server);
    server.listen(0, () => {
      port = (server.address() as AddressInfo).port;
      done();
    });
  });

  afterAll((done) => {
    server.close();
    wss.close();
    done();
  });

  beforeEach(() => {
    (getSession as jest.Mock).mockResolvedValue({
      user: { id: 'test-user-id' },
    });
  });

  afterEach(() => {
    if (clientSocket) {
      clientSocket.close();
    }
  });

  it('should establish connection with valid session', (done) => {
    clientSocket = new WebSocket(`ws://localhost:${port}`);

    clientSocket.on('open', () => {
      expect(clientSocket.readyState).toBe(WebSocket.OPEN);
      done();
    });
  });

  it('should handle notification messages', (done) => {
    clientSocket = new WebSocket(`ws://localhost:${port}`);

    clientSocket.on('open', () => {
      clientSocket.send(
        JSON.stringify({
          type: 'notification_read',
          id: 'test-notification-id',
        })
      );
    });

    clientSocket.on('message', (data) => {
      const message = JSON.parse(data.toString());
      expect(message.type).toBe('notification_update');
      expect(message.data.id).toBe('test-notification-id');
      expect(message.data.read).toBe(true);
      done();
    });
  });

  it('should handle chat messages', (done) => {
    clientSocket = new WebSocket(`ws://localhost:${port}`);

    clientSocket.on('open', () => {
      clientSocket.send(
        JSON.stringify({
          type: 'chat_message',
          receiverId: 'test-receiver-id',
          message: {
            content: 'Hello!',
            timestamp: new Date().toISOString(),
          },
        })
      );
    });

    clientSocket.on('message', (data) => {
      const message = JSON.parse(data.toString());
      expect(message.type).toBe('new_message');
      expect(message.data.content).toBe('Hello!');
      done();
    });
  });
}); 