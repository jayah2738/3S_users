'use client';

import { useState, useEffect } from 'react';
import { FiCheckCircle, FiClock, FiAlertCircle } from 'react-icons/fi';

interface Progress {
  _id: string;
  userId: string;
  subject: string;
  grade: string;
  topics: {
    name: string;
    status: 'completed' | 'in_progress' | 'not_started';
    score?: number;
    lastAccessed: string;
  }[];
  overallProgress: number;
}

export default function ProgressTracker() {
  const [progress, setProgress] = useState<Progress[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');

  useEffect(() => {
    fetchProgress();
  }, [selectedSubject, selectedGrade]);

  const fetchProgress = async () => {
    try {
      const params = new URLSearchParams();
      if (selectedSubject !== 'all') params.append('subject', selectedSubject);
      if (selectedGrade !== 'all') params.append('grade', selectedGrade);

      const res = await fetch(`/api/progress?${params}`);
      const data = await res.json();
      setProgress(data);
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <FiCheckCircle className="w-5 h-5 text-green-500" />;
      case 'in_progress':
        return <FiClock className="w-5 h-5 text-yellow-500" />;
      default:
        return <FiAlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const subjects = ['all', 'Math', 'Science', 'English', 'History'];
  const grades = ['all', '6', '7', '8', '9', '10'];

  return (
    <div className="p-6">
      {/* Filters */}
      <div className="flex space-x-4 mb-6">
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject.charAt(0).toUpperCase() + subject.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {grades.map((grade) => (
            <option key={grade} value={grade}>
              {grade === 'all' ? 'All Grades' : `Grade ${grade}`}
            </option>
          ))}
        </select>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {progress.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {item.subject} - Grade {item.grade}
              </h3>
              <div className="flex items-center">
                <div className="w-16 h-16 relative">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="3"
                      strokeDasharray={`${item.overallProgress}, 100`}
                    />
                    <text
                      x="18"
                      y="20.35"
                      className="text-xs"
                      textAnchor="middle"
                      fill="#3B82F6"
                    >
                      {Math.round(item.overallProgress)}%
                    </text>
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {item.topics.map((topic, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded"
                >
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(topic.status)}
                    <div>
                      <p className="font-medium">{topic.name}</p>
                      <p className="text-sm text-gray-500">
                        Last accessed:{' '}
                        {new Date(topic.lastAccessed).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {topic.score !== undefined && (
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        topic.score >= 70
                          ? 'bg-green-100 text-green-800'
                          : topic.score >= 50
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {topic.score}%
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 