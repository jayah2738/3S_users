'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { FiX } from 'react-icons/fi';

interface EventFormProps {
  date: Date;
  onClose: () => void;
  onSave: () => void;
}

export default function EventForm({ date, onClose, onSave }: EventFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: format(date, "yyyy-MM-dd'T'HH:mm"),
    endDate: format(date, "yyyy-MM-dd'T'HH:mm"),
    type: 'other',
    grade: '',
    subject: '',
    location: '',
    isRecurring: false,
    recurrencePattern: {
      frequency: 'weekly',
      interval: 1,
      endDate: format(date, 'yyyy-MM-dd'),
    },
    reminders: [
      {
        type: 'email',
        time: 30, // minutes before event
      },
    ],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        onSave();
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Event form content */}
      </div>
    </div>
  );
} 