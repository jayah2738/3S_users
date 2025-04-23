'use client';

import { format } from 'date-fns';
import { FiX, FiTrash2, FiEdit2 } from 'react-icons/fi';

interface Event {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  type: string;
  grade?: string;
  subject?: string;
  location?: string;
}

interface EventDetailsProps {
  event: Event;
  onClose: () => void;
  onDelete: () => void;
}

export default function EventDetails({
  event,
  onClose,
  onDelete,
}: EventDetailsProps) {
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        const res = await fetch(`/api/calendar/${event._id}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          onDelete();
        }
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Event Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-lg font-medium">{event.title}</h3>
            <p className="text-gray-500">{event.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Date & Time
              </label>
              <p className="mt-1">
                {format(new Date(event.startDate), 'PPp')}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Date & Time
              </label>
              <p className="mt-1">
                {format(new Date(event.endDate), 'PPp')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Event Type
              </label>
              <p className="mt-1 capitalize">{event.type}</p>
            </div>

            {event.grade && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Grade
                </label>
                <p className="mt-1 capitalize">{event.grade}</p>
              </div>
            )}
          </div>

          {event.location && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <p className="mt-1">{event.location}</p>
            </div>
          )}

          <div className="pt-4 border-t flex justify-end space-x-2">
            <button
              onClick={handleDelete}
              className="flex items-center space-x-2 px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50"
            >
              <FiTrash2 />
              <span>Delete</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 