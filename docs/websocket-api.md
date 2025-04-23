# WebSocket API Documentation

## Connection

Connect to the WebSocket server at `ws://your-domain/ws`. The connection requires authentication via NextAuth session.

### Connection Example
```javascript
const ws = new WebSocket('ws://your-domain/ws');

ws.onopen = () => {
  console.log('Connected to WebSocket server');
};

ws.onclose = () => {
  console.log('Disconnected from WebSocket server');
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};
```

## Message Types

### 1. Notifications

#### Mark notification as read
```javascript
ws.send(JSON.stringify({
  type: 'notification_read',
  id: 'notification-id'
}));
```

#### Receive notification update
```javascript
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'notification_update') {
    console.log('Notification updated:', data.data);
  }
};
```

### 2. Chat Messages

#### Send chat message
```javascript
ws.send(JSON.stringify({
  type: 'chat_message',
  receiverId: 'user-id',
  message: {
    content: 'Hello!',
    timestamp: new Date().toISOString()
  }
}));
```

#### Receive chat message
```javascript
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'new_message') {
    console.log('New message:', data.data);
  }
};
```

### 3. Progress Updates

#### Send progress update
```javascript
ws.send(JSON.stringify({
  type: 'progress_update',
  progress: {
    subject: 'Math',
    topic: 'Algebra',
    completion: 75
  }
}));
```

#### Receive progress sync
```javascript
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'progress_sync') {
    console.log('Progress synced:', data.data);
  }
};
```
```

4. Create performance optimizations. Create `src/lib/optimizations.ts`:

```typescript:src/lib/optimizations.ts
import { useCallback, useRef, useEffect } from 'react';
import { debounce } from 'lodash';

// Debounce WebSocket messages
export function useWebSocketDebounce(ws: WebSocket, delay = 1000) {
  const sendMessage = useCallback(
    debounce((message: any) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(message));
      }
    }, delay),
    [ws]
  );

  return sendMessage;
}

// Cache WebSocket messages while offline
export function useWebSocketCache() {
  const cache = useRef<any[]>([]);
  const isOnline = useRef(true);

  const sendMessage = useCallback(
    (ws: WebSocket, message: any) => {
      if (!isOnline.current) {
        cache.current.push(message);
        return;
      }

      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(message));
      }
    },
    []
  );

  useEffect(() => {
    const handleOnline = () => {
      isOnline.current = true;
      // Flush cache when back online
      cache.current.forEach((message) => {
        sendMessage(message);
      });
      cache.current = [];
    };

    const handleOffline = () => {
      isOnline.current = false;
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [sendMessage]);

  return sendMessage;
}

// Batch WebSocket messages
export function useWebSocketBatch(ws: WebSocket, batchSize = 10, delay = 1000) {
  const batch = useRef<any[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const sendBatch = useCallback(() => {
    if (batch.current.length > 0) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(
          JSON.stringify({
            type: 'batch',
            messages: batch.current,
          })
        );
      }
      batch.current = [];
    }
  }, [ws]);

  const queueMessage = useCallback(
    (message: any) => {
      batch.current.push(message);

      if (batch.current.length >= batchSize) {
        sendBatch();
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(sendBatch, delay);
      }
    },
    [sendBatch, batchSize, delay]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      sendBatch();
    };
  }, [sendBatch]);

  return queueMessage;
}

// Reconnection strategy
export function useWebSocketReconnect(url: string, options = {
  maxRetries: 5,
  baseDelay: 1000,
  maxDelay: 30000,
}) {
  const ws = useRef<WebSocket>();
  const retries = useRef(0);

  const connect = useCallback(() => {
    try {
      ws.current = new WebSocket(url);

      ws.current.onopen = () => {
        retries.current = 0;
      };

      ws.current.onclose = () => {
        if (retries.current < options.maxRetries) {
          const delay = Math.min(
            options.baseDelay * Math.pow(2, retries.current),
            options.maxDelay
          );
          setTimeout(connect, delay);
          retries.current++;
        }
      };
    } catch (error) {
      console.error('WebSocket connection error:', error);
    }
  }, [url, options]);

  useEffect(() => {
    connect();
    return () => {
      ws.current?.close();
    };
  }, [connect]);

  return ws;
}

// Message compression
export function compressMessage(message: any) {
  try {
    const jsonString = JSON.stringify(message);
    const compressed = btoa(jsonString);
    return compressed;
  } catch (error) {
    console.error('Error compressing message:', error);
    return null;
  }
}

export function decompressMessage(compressed: string) {
  try {
    const jsonString = atob(compressed);
    const message = JSON.parse(jsonString);
    return message;
  } catch (error) {
    console.error('Error decompressing message:', error);
    return null;
  }
}
```

5. Create a performance monitoring component. Create `src/components/admin/PerformanceMonitor.tsx`:

```typescript:src/components/admin/PerformanceMonitor.tsx
'use client';

import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

interface PerformanceMetrics {
  timestamp: number;
  websocketLatency: number;
  messageQueueSize: number;
  connectionStatus: 'connected' | 'disconnected' | 'reconnecting';
} 