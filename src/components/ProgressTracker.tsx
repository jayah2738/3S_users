'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  FiCheckCircle,
  FiClock,
  FiPlayCircle,
  FiBarChart2,
} from 'react-icons/fi';

interface Progress {
  _id: string;
  fileId: {
    _id: string;
    title: string;
    type: string;
  };
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number;
  lastAccessed: string;
  completedAt?: string;
}

export default function ProgressTracker() {
  const { data: session } = useSession();
  const [progress, setProgress] = useState<Progress[]>([]);

  useEffect(() => {
    if (session) {
      fetchProgress();
    }
  }, [session]);

  const fetchProgress = async () => {
    try {
      const res = await fetch('/api/progress');
      const data = await res.json();
      if (res.ok) {
        setProgress(data);
      }
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <FiCheckCircle className="text-green-500" />;
      case 'in_progress':
        return <FiPlayCircle className="text-blue-500" />;
      default:
        return <FiClock className="text-gray-500" />;
    }
  };

  const calculateOverallProgress = () => {
    if (progress.length === 0) return 0;
    const total = progress.reduce((sum, item) => sum + item.progress, 0);
    return Math.round(total / progress.length);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Learning Progress</h2>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Overall Progress
            </span>
            <span className="text-sm font-medium text-gray-700">
              {calculateOverallProgress()}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${calculateOverallProgress()}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-4">
          {progress.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg p-4 hover:bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(item.status)}
                  <div>
                    <h3 className="font-medium">{item.fileId.title}</h3>
                    <p className="text-sm text-gray-500">
                      Last accessed:{' '}
                      {new Date(item.lastAccessed).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {item.progress}%
                  </div>
                  <div className="text-sm text-gray-500">
                    {item.status.replace('_', ' ')}
                  </div>
                </div>
              </div>
              
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 