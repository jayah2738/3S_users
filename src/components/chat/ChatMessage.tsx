import { format } from 'date-fns';
import Image from 'next/image';

interface Message {
  _id: string;
  sender: {
    _id: string;
    username: string;
  };
  content: string;
  type: 'text' | 'file' | 'image';
  fileUrl?: string;
  createdAt: string;
}

interface ChatMessageProps {
  message: Message;
  isOwnMessage: boolean;
}

export default function ChatMessage({
  message,
  isOwnMessage,
}: ChatMessageProps) {
  const renderContent = () => {
    switch (message.type) {
      case 'image':
        return (
          <div className="relative w-64 h-64">
            <Image
              src={message.fileUrl!}
              alt="Shared image"
              fill
              className="object-cover rounded-md"
            />
          </div>
        );
      case 'file':
        return (
          <a
            href={message.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>Download File</span>
          </a>
        );
      default:
        return <p>{message.content}</p>;
    }
  };

  return (
    <div
      className={`flex ${
        isOwnMessage ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`max-w-[70%] ${
          isOwnMessage
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-900'
        } rounded-lg px-4 py-2 shadow`}
      >
        {!isOwnMessage && (
          <p className="text-xs font-medium mb-1">
            {message.sender.username}
          </p>
        )}
        {renderContent()}
        <p className="text-xs mt-1 opacity-75">
          {format(new Date(message.createdAt), 'p')}
        </p>
      </div>
    </div>
  );
} 