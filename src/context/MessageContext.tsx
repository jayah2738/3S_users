'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  type: 'parent' | 'student';
}

interface MessageContextType {
  parentMessages: Message[];
  studentMessages: Message[];
  addParentMessage: (content: string) => Promise<void>;
  addStudentMessage: (content: string) => Promise<void>;
  updateMessage: (id: string, content: string) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export function MessageProvider({ children }: { children: ReactNode }) {
  const [parentMessages, setParentMessages] = useState<Message[]>([]);
  const [studentMessages, setStudentMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages');
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      const data = await response.json();
      setParentMessages(data.parentMessages || []);
      setStudentMessages(data.studentMessages || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch messages');
      console.error('Error fetching messages:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    // Set up polling to refresh messages every 5 seconds
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  const addParentMessage = async (content: string) => {
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, type: 'parent' }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      const newMessage = await response.json();
      // Update both parent and student messages to ensure consistency
      setParentMessages(prev => [newMessage, ...prev]);
      setStudentMessages(prev => [newMessage, ...prev]);
      setError(null);
    } catch (error) {
      console.error('Error sending message:', error);
      setError(error instanceof Error ? error.message : 'Failed to send message');
    }
  };

  const addStudentMessage = async (content: string) => {
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, type: 'student' }),
      });
      const newMessage = await response.json();
      setStudentMessages(prev => [newMessage, ...prev]);
    } catch (err) {
      setError('Failed to add message');
      console.error('Error adding message:', err);
    }
  };

  const updateMessage = async (id: string, content: string) => {
    try {
      const response = await fetch('/api/messages', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update message');
      }

      const updatedMessage = await response.json();
      setParentMessages(prev => 
        prev.map(msg => msg.id === id ? updatedMessage : msg)
      );
      setError(null);
    } catch (error) {
      console.error('Error updating message:', error);
      setError(error instanceof Error ? error.message : 'Failed to update message');
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const response = await fetch('/api/messages', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete message');
      }

      setParentMessages(prev => prev.filter(msg => msg.id !== id));
      setError(null);
    } catch (error) {
      console.error('Error deleting message:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete message');
    }
  };

  return (
    <MessageContext.Provider value={{
      parentMessages,
      studentMessages,
      addParentMessage,
      addStudentMessage,
      updateMessage,
      deleteMessage,
      isLoading,
      error
    }}>
      {children}
    </MessageContext.Provider>
  );
}

export function useMessages() {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
} 