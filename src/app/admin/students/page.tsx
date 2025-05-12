'use client';
import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import {
  UserGroupIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useDebounce } from '@/hooks/useDebounce';
import StudentTable from '../../../components/admin/StudentTable';
import StudentForm from '../../../components/admin/StudentForm';
import { motion } from 'framer-motion';

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

interface Grade {
  id: string;
  name: string;
  level: string;
  studentCount: number;
  materials: {
    videos: number;
    pdfs: number;
  };
}

const StudentsPage = () => {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<'students' | 'grades'>('students');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState<'video' | 'pdf'>('video');
  const [grades, setGrades] = useState<Grade[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState<'all' | 'name' | 'username' | 'grade' | 'lastLogin'>('all');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  
  // Add debounced search query
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    // Fetch grades from API
    const fetchGrades = async () => {
      try {
        const response = await fetch('/api/admin/grades');
        const data = await response.json();
        setGrades(data);
      } catch (error) {
        console.error('Error fetching grades:', error);
      }
    };

    fetchGrades();
  }, []);

  useEffect(() => {
    // Fetch students from API
    const fetchStudents = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedLevel) params.append('level', selectedLevel);
        if (selectedGrade) params.append('gradeId', selectedGrade);
        
        const response = await fetch(`/api/admin/students?${params.toString()}`);
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, [selectedLevel, selectedGrade]);

  const schoolLevels = [
    { value: 'preschool', label: 'Preschool' },
    { value: 'primary', label: 'Primary School' },
    { value: 'middle', label: 'Middle School' },
    { value: 'high', label: 'High School' },
  ];

  // Ensure grades is an array before filtering
  const gradesArray = Array.isArray(grades) ? grades : [];
  
  const filteredGrades = selectedLevel
    ? gradesArray.filter(grade => grade.level === selectedLevel)
    : gradesArray;

  // Enhanced search handler
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    
    // Add to search history if not empty
    if (query.trim() && !searchHistory.includes(query)) {
      setSearchHistory(prev => [query, ...prev].slice(0, 5));
    }
  }, [searchHistory]);

  // Clear search
  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  // Handle student status change
  const handleStatusChange = async (studentId: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/students/${studentId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update student status');
      }

      setStudents(prev =>
        prev.map(student =>
          student.id === studentId ? { ...student, isActive } : student
        )
      );
    } catch (error) {
      console.error('Error updating student status:', error);
      alert(error instanceof Error ? error.message : 'An error occurred while updating student status');
    }
  };

  // Handle student delete
  const handleDelete = async (student: Student) => {
    if (window.confirm(`Are you sure you want to delete ${student.fullName}?`)) {
      try {
        const response = await fetch(`/api/admin/students/${student.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to delete student');
        }

        setStudents(prev => prev.filter(s => s.id !== student.id));
      } catch (error) {
        console.error('Error deleting student:', error);
        alert(error instanceof Error ? error.message : 'An error occurred while deleting the student');
      }
    }
  };

  // Handle student edit
  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setShowForm(true);
  };

  // Handle student view
  const handleView = (student: Student) => {
    // Implement view functionality
    console.log('View student:', student);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Students</h1>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center space-x-2 rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add Student</span>
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-64 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 focus:border-amber-500 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}
          </div>

          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 focus:border-amber-500 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Levels</option>
            {schoolLevels.map(level => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>

          {selectedLevel && (
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 focus:border-amber-500 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Grades</option>
              {filteredGrades.map(grade => (
                <option key={grade.id} value={grade.id}>
                  {grade.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <StudentTable
        students={students}
        searchQuery={debouncedSearchQuery}
        isLoading={isLoading}
        onStatusChange={handleStatusChange}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />

      {showForm && (
        <StudentForm
          student={selectedStudent}
          onSuccess={(data) => {
            if (selectedStudent) {
              setStudents(prev => {
                const prevArray = Array.isArray(prev) ? prev : [];
                return prevArray.map(s => s.id === selectedStudent.id ? { ...s, ...data } : s);
              });
            } else {
              setStudents(prev => {
                const prevArray = Array.isArray(prev) ? prev : [];
                return [...prevArray, {
                  ...data,
                  id: Date.now().toString(),
                  lastLogin: new Date().toISOString(),
                  isActive: true,
                  password: data.password || ''
                }];
              });
            }
            setShowForm(false);
            setSelectedStudent(null);
          }}
          onClose={() => {
            setShowForm(false);
            setSelectedStudent(null);
          }}
        />
      )}
    </div>
  );
};

export default StudentsPage; 