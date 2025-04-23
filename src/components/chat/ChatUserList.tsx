'use client';

import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

interface User {
  _id: string;
  username: string;
  role: string;
  grade?: string;
}

interface ChatUserListProps {
  users: User[];
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
}

export default function ChatUserList({
  users,
  selectedUser,
  onSelectUser,
}: ChatUserListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => onSelectUser(user)}
            className={`w-full p-4 text-left hover:bg-gray-50 flex items-center space-x-3 ${
              selectedUser?._id === user._id ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-600 font-medium">
                  {user.username[0].toUpperCase()}
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.username}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {user.role} {user.grade && `- ${user.grade}`}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
} 