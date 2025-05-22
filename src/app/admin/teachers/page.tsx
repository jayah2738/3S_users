'use client';
import { useState } from 'react';
import { useMessages } from '@/context/MessageContext';
import { MagnifyingGlassIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function TeachersInfoPage() {
  const { teacherMessages, addTeacherMessage, updateMessage, deleteMessage, isLoading, error } = useMessages();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingMessage, setEditingMessage] = useState<{ id: string; content: string } | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const filteredMessages = teacherMessages?.filter(message => {
    if (!message?.content) return false;
    return message.content.toLowerCase().includes(searchQuery.toLowerCase());
  }) || [];

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    await addTeacherMessage(newMessage);
    setNewMessage('');
  };

  const handleEditMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMessage?.content.trim()) return;
    await updateMessage(editingMessage.id, editingMessage.content);
    setEditingMessage(null);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Loading messages...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-8">{error}</div>;
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-amber-500 border-t-transparent"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading messages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-dark">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg bg-red-50 p-4 text-red-600 dark:bg-red-900/50">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-dark">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Teacher Communication Center
          </h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 rounded-full border border-gray-300 bg-white px-4 py-2 pl-10 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-dark"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="space-y-6">
          {filteredMessages.length === 0 ? (
            <div className="rounded-xl bg-white p-8 text-center shadow-sm dark:bg-gray-dark">
              <div className="text-gray-500 dark:text-gray-400">
                {searchQuery ? 'No messages match your search.' : 'No messages yet.'}
              </div>
            </div>
          ) : (
            filteredMessages.map((message) => (
              <div key={message.id} className="group relative transform transition-all duration-300 hover:scale-[1.01]">
                <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:bg-gray-dark">
                  {editingMessage?.id === message.id ? (
                    <form onSubmit={handleEditMessage} className="space-y-4">
                      <textarea
                        value={editingMessage.content}
                        onChange={(e) => setEditingMessage({ ...editingMessage, content: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-dark"
                        rows={3}
                      />
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => setEditingMessage(null)}
                          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="inline-flex items-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-amber-500/10 p-2">
                            <Image
                              src="/images/logo/logo1.png"
                              alt="logo"
                              width={24}
                              height={24}
                              className="h-full w-full"
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-amber-500 capitalize">{message.sender}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(message.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingMessage({ id: message.id, content: message.content })}
                            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-amber-500 dark:hover:bg-gray-700"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => deleteMessage(message.id)}
                            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-red-500 dark:hover:bg-gray-700"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-4 text-gray-700 dark:text-gray-300">
                        {message.content}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSendMessage} className="mt-8">
          <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-dark">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message here..."
              className="w-full resize-none rounded-lg border border-gray-300 bg-white p-3 text-base text-gray-800 outline-none placeholder:text-gray-400 dark:border-gray-600 dark:bg-gray-dark dark:text-gray-200 dark:placeholder:text-gray-500"
              rows={3}
            />
            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {newMessage.length > 0 ? `${newMessage.length} characters` : ''}
              </div>
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="inline-flex items-center rounded-lg bg-amber-500 px-6 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-offset-gray-dark"
              >
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Send Message
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 