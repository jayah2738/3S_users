'use client';

import { useState, useEffect } from 'react';
import { FiBell, FiX } from 'react-icons/fi';

interface Notification {
  _id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
    setupWebSocket();
  }, []);

  useEffect(() => {
    setUnreadCount(notifications.filter((n) => !n.read).length);
  }, [notifications]);

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications');
      const data = await res.json();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const setupWebSocket = () => {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001');

    ws.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      setNotifications((prev) => [notification, ...prev]);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  };

  const markAsRead = async (id: string) => {
    try {
      await fetch('/api/notifications/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      fetchNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <div className="fixed top-0 right-0 w-80 p-4 space-y-4">
      {/* Notification Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Notifications</h2>
        <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
          <FiX size={20} />
        </button>
      </div>

      {/* Notification List */}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification._id}
            className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-700">{notification.title}</h3>
              <p className="text-gray-500">{notification.message}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">{notification.createdAt}</span>
              <button
                onClick={() => markAsRead(notification._id)}
                className="text-red-500 hover:text-red-700"
              >
                Mark as Read
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Notification Footer */}
      <div className="text-center">
        <button className="text-blue-500 hover:text-blue-700">View All Notifications</button>
      </div>
    </div>
  );
} 