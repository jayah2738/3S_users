'use client';

import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

interface PerformanceMetrics {
  timestamp: number;
  websocketLatency: number;
  messageQueueSize: number;
  connectionStatus: 'connected' | 'disconnected' | 'reconnecting';
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    if (!isMonitoring) return;

    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001');
    const interval = setInterval(measurePerformance, 1000);

    async function measurePerformance() {
      const start = performance.now();
      
      // Measure WebSocket latency
      ws.send(JSON.stringify({ type: 'ping', timestamp: start }));
      
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'pong') {
          const latency = performance.now() - data.timestamp;
          
          setMetrics((prev) => [
            ...prev.slice(-60), // Keep last 60 seconds
            {
              timestamp: Date.now(),
              websocketLatency: latency,
              messageQueueSize: (ws as any)._bufferedAmount || 0,
              connectionStatus: ws.readyState === WebSocket.OPEN ? 'connected' : 'disconnected',
            },
          ]);
        }
      };
    }

    return () => {
      clearInterval(interval);
      ws.close();
    };
  }, [isMonitoring]);

  const chartData = {
    labels: metrics.map((m) => new Date(m.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'WebSocket Latency (ms)',
        data: metrics.map((m) => m.websocketLatency),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Message Queue Size',
        data: metrics.map((m) => m.messageQueueSize),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Performance Monitor</h2>
        <button
          onClick={() => setIsMonitoring(!isMonitoring)}
          className={`px-4 py-2 rounded-md ${
            isMonitoring
              ? 'bg-red-600 text-white'
              : 'bg-blue-600 text-white'
          }`}
        >
          {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Current Latency</h3>
          <p className="text-3xl font-bold text-blue-600">
            {metrics[metrics.length - 1]?.websocketLatency.toFixed(2) || 0} ms
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Message Queue</h3>
          <p className="text-3xl font-bold text-green-600">
            {metrics[metrics.length - 1]?.messageQueueSize || 0}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Connection Status</h3>
          <p
            className={`text-xl font-bold ${
              metrics[metrics.length - 1]?.connectionStatus === 'connected'
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {metrics[metrics.length - 1]?.connectionStatus || 'disconnected'}
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
        <Line
          data={chartData}
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
} 