import { useState } from 'react';
import {
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface Teacher {
  id: string;
  fullName: string;
  username: string;
  password: string;
  subject: string;
  gradeRelation: {
    id: string;
    name: string;
    level: string;
  };
  lastLogin: string;
  isActive: boolean;
  email?: string;
}

interface TeacherTableProps {
  teachers: Teacher[];
  searchQuery: string;
  isLoading: boolean;
  onStatusChange: (id: string, isActive: boolean) => void;
  onEdit: (teacher: Teacher) => void;
  onDelete: (teacher: Teacher) => void;
  onView: (teacher: Teacher) => void;
  onMessage: (teacher: Teacher) => void;
}

const TeacherTable = ({
  teachers,
  searchQuery,
  isLoading,
  onStatusChange,
  onEdit,
  onDelete,
  onView,
  onMessage,
}: TeacherTableProps) => {
  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>({});

  const togglePasswordVisibility = (id: string) => {
    setShowPassword(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredTeachers = teachers.filter(teacher => {
    const searchLower = searchQuery.toLowerCase();
    return (
      teacher.fullName.toLowerCase().includes(searchLower) ||
      teacher.username.toLowerCase().includes(searchLower) ||
      teacher.subject.toLowerCase().includes(searchLower) ||
      teacher.gradeRelation.name.toLowerCase().includes(searchLower)
    );
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Username
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Password
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Subject
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Grade
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Last Login
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
          {filteredTeachers.map((teacher) => (
            <motion.tr
              key={teacher.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {teacher.fullName}
                </div>
                {teacher.email && (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {teacher.email}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-white">
                  {teacher.username}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-2">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {showPassword[teacher.id] ? teacher.password : '••••••••'}
                  </div>
                  <button
                    onClick={() => togglePasswordVisibility(teacher.id)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword[teacher.id] ? 'Hide' : 'Show'}
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-white">
                  {teacher.subject}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-white">
                  {teacher.gradeRelation.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {teacher.gradeRelation.level}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-white">
                  {teacher.lastLogin
                    ? new Date(teacher.lastLogin).toLocaleDateString()
                    : 'Never'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => onStatusChange(teacher.id, !teacher.isActive)}
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    teacher.isActive
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  }`}
                >
                  {teacher.isActive ? 'Active' : 'Inactive'}
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button
                  onClick={() => onView(teacher)}
                  className="text-amber-600 hover:text-amber-900 dark:text-amber-400 dark:hover:text-amber-300"
                >
                  <EyeIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onEdit(teacher)}
                  className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete(teacher)}
                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onMessage(teacher)}
                  className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                >
                  <ChatBubbleLeftIcon className="h-5 w-5" />
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherTable; 