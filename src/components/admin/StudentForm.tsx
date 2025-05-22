'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import GradeSelect from '@/components/GradeSelect';
import { educationLevels, type EducationLevel } from '@/utils/education';

interface Student {
  id: string;
  fullName: string;
  username: string;
  password: string;
  gradeRelation: {
    id: string;
    name: string;
    level: string;
  };
  lastLogin: string;
  isActive: boolean;
  gender?: string;
}

interface StudentFormProps {
  student?: Student;
  onSuccess: (data: any) => void;
  onClose?: () => void;
}

interface StudentFormData {
  fullName: string;
  username: string;
  password: string;
  gradeId: string;
  gender: string;
  level: string;
  grade: string;
}

const StudentForm: React.FC<StudentFormProps> = ({ student, onSuccess, onClose }) => {
  const [formData, setFormData] = useState<StudentFormData>({
    fullName: student?.fullName || '',
    username: student?.username || '',
    password: '',
    gradeId: student?.gradeRelation?.id || '',
    gender: student?.gender || '',
    level: student?.gradeRelation?.level || '',
    grade: student?.gradeRelation?.name || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [grades, setGrades] = useState<{ id: string; name: string; level: string }[]>([]);
  const [filteredGrades, setFilteredGrades] = useState<{ id: string; name: string; level: string }[]>([]);

  useEffect(() => {
    if (student) {
      setFormData({
        fullName: student.fullName || '',
        username: student.username || '',
        password: '', // Don't pre-fill password for security
        gradeId: student.gradeRelation?.id || '',
        gender: student.gender || '',
        level: student.gradeRelation?.level || '',
        grade: student.gradeRelation?.name || '',
      });
    }
  }, [student]);

  useEffect(() => {
    // Fetch grades when component mounts
    const fetchGrades = async () => {
      try {
        const response = await fetch('/api/admin/grades');
        if (!response.ok) {
          throw new Error('Failed to fetch grades');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setGrades(data);
          setFilteredGrades(data);
        } else {
          console.error('Grades data is not an array:', data);
          setGrades([]);
          setFilteredGrades([]);
        }
      } catch (error) {
        console.error('Error fetching grades:', error);
        setGrades([]);
        setFilteredGrades([]);
      }
    };

    fetchGrades();
  }, []);

  useEffect(() => {
    // Filter grades based on selected level
    if (formData.level && Array.isArray(grades)) {
      const filtered = grades.filter(grade => grade.level === formData.level);
      setFilteredGrades(filtered);
      // Reset grade if it's not in the filtered list
      if (formData.grade && !filtered.some(g => g.name === formData.grade)) {
        setFormData(prev => ({ ...prev, grade: '', gradeId: '' }));
      }
    } else {
      setFilteredGrades(Array.isArray(grades) ? grades : []);
    }
  }, [formData.level, grades]);

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const level = e.target.value as EducationLevel;
    setFormData(prev => ({ ...prev, level, grade: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const url = student 
        ? `/api/admin/students/${student.id}`
        : '/api/admin/students';
      
      const method = student ? 'PATCH' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          username: formData.username,
          level: formData.level,
          grade: formData.grade,
          gender: formData.gender,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save student');
      }

      onSuccess(data);
      if (onClose) onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {student ? 'Edit Student' : 'Add New Student'}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900 dark:text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-amber-500 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Username
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-amber-500 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                required
                disabled={!!student}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Level
              </label>
              <select
                value={formData.level}
                onChange={handleLevelChange}
                className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-amber-500 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                
              >
                <option value="">Select level</option>
                {Object.entries(educationLevels).map(([key, { name }]) => (
                  <option key={key} value={key}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Grade
              </label>
              <GradeSelect
                value={formData.grade}
                onChange={(value) => setFormData({ ...formData, grade: value })}
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-amber-500 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                required
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-amber-500 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                required={!student}
                placeholder={student ? "Leave blank to keep current password" : ""}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-lg bg-amber-500 px-4 py-2 text-white hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default StudentForm; 