'use client';
import { useState, useEffect, useCallback } from 'react';
import {
  UserGroupIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useDebounce } from '@/hooks/useDebounce';

interface Student {
  id: string;
  name: string;
  grade: {
    id: string;
    name: string;
    level: string;
  };
  username: string;
  lastLogin: string;
  isActive: boolean;
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

export default function StudentsPage() {
  const [activeTab, setActiveTab] = useState<'students' | 'grades'>('students');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState<'video' | 'pdf'>('video');
  const [grades, setGrades] = useState<Grade[]>([]);
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: 'John Doe',
      username: 'john.doe',
      grade: {
        id: '1',
        name: 'TPS',
        level: 'preschool'
      },
      lastLogin: '2024-03-20T10:00:00Z',
      isActive: true
    },
    {
      id: '2',
      name: 'Jane Smith',
      username: 'jane.smith',
      grade: {
        id: '2',
        name: 'PS',
        level: 'preschool'
      },
      lastLogin: '2024-03-20T11:00:00Z',
      isActive: true
    },
    {
      id: '3',
      name: 'Mike Johnson',
      username: 'mike.johnson',
      grade: {
        id: '3',
        name: 'Grade 1',
        level: 'primary'
      },
      lastLogin: '2024-03-20T12:00:00Z',
      isActive: true
    },
    {
      id: '4',
      name: 'Sarah Williams',
      username: 'sarah.williams',
      grade: {
        id: '4',
        name: 'Grade 6',
        level: 'middle'
      },
      lastLogin: '2024-03-20T13:00:00Z',
      isActive: true
    },
    {
      id: '5',
      name: 'David Brown',
      username: 'david.brown',
      grade: {
        id: '5',
        name: 'Grade 10',
        level: 'high'
      },
      lastLogin: '2024-03-20T14:00:00Z',
      isActive: false
    },
    {
      id: '6',
      name: 'Emily Davis',
      username: 'emily.davis',
      grade: {
        id: '6',
        name: '11 L',
        level: 'high'
      },
      lastLogin: '2024-03-20T15:00:00Z',
      isActive: true
    }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState<'all' | 'name' | 'username' | 'grade' | 'lastLogin'>('all');
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  
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
      try {
        const params = new URLSearchParams();
        if (selectedLevel) params.append('level', selectedLevel);
        if (selectedGrade) params.append('gradeId', selectedGrade);
        
        const response = await fetch(`/api/admin/students?${params.toString()}`);
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
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

  const filteredGrades = selectedLevel
    ? grades.filter(grade => grade.level === selectedLevel)
    : grades;

  // Enhanced search handler
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    
    // Add to search history if not empty
    if (query.trim() && !searchHistory.includes(query)) {
      setSearchHistory(prev => [query, ...prev].slice(0, 5));
    }
  }, [searchHistory]);

  // Clear search
  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    setIsSearching(false);
  }, []);

  // Enhanced filter function
  const filteredStudents = students.filter(student => {
    const searchLower = debouncedSearchQuery.toLowerCase();
    
    const matchesSearch = debouncedSearchQuery === '' || 
      (searchField === 'all' && (
        student.name.toLowerCase().includes(searchLower) ||
        student.username.toLowerCase().includes(searchLower) ||
        student.grade.name.toLowerCase().includes(searchLower) ||
        new Date(student.lastLogin).toLocaleDateString().includes(searchLower)
      )) ||
      (searchField === 'name' && student.name.toLowerCase().includes(searchLower)) ||
      (searchField === 'username' && student.username.toLowerCase().includes(searchLower)) ||
      (searchField === 'grade' && student.grade.name.toLowerCase().includes(searchLower)) ||
      (searchField === 'lastLogin' && new Date(student.lastLogin).toLocaleDateString().includes(searchLower));
    
    const matchesLevel = !selectedLevel || student.grade.level === selectedLevel;
    const matchesGrade = !selectedGrade || student.grade.id === selectedGrade;
    
    return matchesSearch && matchesLevel && matchesGrade;
  });

  // Reset search when changing search field
  useEffect(() => {
    setSearchQuery('');
  }, [searchField]);

  // Update searching state when debounced query changes
  useEffect(() => {
    setIsSearching(false);
  }, [debouncedSearchQuery]);

  const handleStatusChange = async (studentId: string, isActive: boolean) => {
    try {
      const response = await fetch('/api/admin/students', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: studentId, isActive }),
      });

      if (response.ok) {
        const updatedStudent = await response.json();
        setStudents(students.map(student => 
          student.id === studentId ? updatedStudent : student
        ));
      }
    } catch (error) {
      console.error('Error updating student status:', error);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // ... existing upload logic ...
  };

  // Example data for demonstration
  const exampleGrades: Grade[] = [
    // Preschool
    { id: '1', name: 'TPS', level: 'preschool', studentCount: 15, materials: { videos: 5, pdfs: 8 } },
    { id: '2', name: 'PS', level: 'preschool', studentCount: 20, materials: { videos: 6, pdfs: 10 } },
    { id: '3', name: 'MS', level: 'preschool', studentCount: 18, materials: { videos: 7, pdfs: 9 } },
    { id: '4', name: 'GS', level: 'preschool', studentCount: 22, materials: { videos: 8, pdfs: 12 } },
    
    // Primary School
    { id: '5', name: 'Grade 1', level: 'primary', studentCount: 25, materials: { videos: 10, pdfs: 15 } },
    { id: '6', name: 'Grade 2', level: 'primary', studentCount: 28, materials: { videos: 12, pdfs: 18 } },
    { id: '7', name: 'Grade 3', level: 'primary', studentCount: 30, materials: { videos: 15, pdfs: 20 } },
    { id: '8', name: 'Grade 4', level: 'primary', studentCount: 32, materials: { videos: 18, pdfs: 22 } },
    { id: '9', name: 'Grade 5', level: 'primary', studentCount: 35, materials: { videos: 20, pdfs: 25 } },
    
    // Middle School
    { id: '10', name: 'Grade 6', level: 'middle', studentCount: 40, materials: { videos: 25, pdfs: 30 } },
    { id: '11', name: 'Grade 7', level: 'middle', studentCount: 38, materials: { videos: 22, pdfs: 28 } },
    { id: '12', name: 'Grade 8', level: 'middle', studentCount: 42, materials: { videos: 28, pdfs: 32 } },
    { id: '13', name: 'Grade 9', level: 'middle', studentCount: 45, materials: { videos: 30, pdfs: 35 } },
    
    // High School
    { id: '14', name: 'Grade 10', level: 'high', studentCount: 50, materials: { videos: 35, pdfs: 40 } },
    { id: '15', name: 'Grade 11 L', level: 'high', studentCount: 48, materials: { videos: 32, pdfs: 38 } },
    { id: '16', name: 'Grade 11 OSE', level: 'high', studentCount: 45, materials: { videos: 30, pdfs: 35 } },
    { id: '17', name: 'Grade 11 S', level: 'high', studentCount: 42, materials: { videos: 28, pdfs: 32 } },
    { id: '18', name: 'Grade 12 L', level: 'high', studentCount: 40, materials: { videos: 25, pdfs: 30 } },
    { id: '19', name: 'Grade 12 OSE', level: 'high', studentCount: 38, materials: { videos: 22, pdfs: 28 } },
    { id: '20', name: 'Grade 12 S', level: 'high', studentCount: 35, materials: { videos: 20, pdfs: 25 } }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <h1 className="text-2xl font-bold text-black dark:text-white">
          Student Management
        </h1>
        <div className="flex items-center space-x-4">
          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
            <select
              value={searchField}
              onChange={(e) => setSearchField(e.target.value as any)}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-dark"
            >
              <option value="all">All Fields</option>
              <option value="name">Name</option>
              <option value="username">Username</option>
              <option value="grade">Grade</option>
              <option value="lastLogin">Last Login</option>
            </select>
            <div className="relative flex-1 sm:max-w-md">
              <input
                type="text"
                placeholder={`Search by ${searchField}...`}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 pl-10 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-dark"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  <svg
                    className="h-5 w-5 text-gray-400 hover:text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center space-x-2 rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Search History */}
      {searchHistory.length > 0 && !searchQuery && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-500">Recent searches:</span>
          {searchHistory.map((term, index) => (
            <button
              key={index}
              onClick={() => handleSearch(term)}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {term}
            </button>
          ))}
        </div>
      )}

      {/* Level and Grade Filters */}
      <div className="flex space-x-4">
        <select
          value={selectedLevel}
          onChange={(e) => {
            setSelectedLevel(e.target.value);
            setSelectedGrade('');
          }}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-dark"
        >
          <option value="">All Levels</option>
          {schoolLevels.map((level) => (
            <option key={level.value} value={level.value}>
              {level.label}
            </option>
          ))}
        </select>

        <select
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-dark"
        >
          <option value="">All Grades</option>
          {filteredGrades.map((grade) => (
            <option key={grade.id} value={grade.id}>
              {grade.name}
            </option>
          ))}
        </select>
      </div>

      {/* Loading State */}
      {isSearching && (
        <div className="flex items-center justify-center py-4">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-amber-500 border-t-transparent"></div>
          <span className="ml-2 text-sm text-gray-500">Searching...</span>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('students')}
            className={`border-b-2 px-1 py-4 text-sm font-medium ${
              activeTab === 'students'
                ? 'border-amber-500 text-amber-500'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Students
          </button>
          <button
            onClick={() => setActiveTab('grades')}
            className={`border-b-2 px-1 py-4 text-sm font-medium ${
              activeTab === 'grades'
                ? 'border-amber-500 text-amber-500'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Grades
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'students' ? (
        <div className="overflow-hidden rounded-xl bg-white shadow-sm dark:bg-gray-dark">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-black dark:text-white">
                Student List
              </h3>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Grade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-dark">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      {isSearching ? 'Searching...' : 'No students found. Try adjusting your search or filters.'}
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm font-medium text-black dark:text-white">
                          {student.name}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {student.grade.name}
                          <span className="ml-2 text-xs text-gray-400 dark:text-gray-500">
                            ({student.grade.level})
                          </span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {student.username}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {student.lastLogin || 'Never'}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <button
                          onClick={() => handleStatusChange(student.id, !student.isActive)}
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            student.isActive
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}
                        >
                          {student.isActive ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          <button className="text-amber-500 hover:text-amber-600">
                            <EyeIcon className="h-5 w-5" />
                          </button>
                          <button className="text-blue-500 hover:text-blue-600">
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button className="text-red-500 hover:text-red-600">
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {schoolLevels.map((level) => (
            <div key={level.value} className="space-y-4">
              <h2 className="text-xl font-semibold text-black dark:text-white">
                {level.label}
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {exampleGrades
                  .filter((grade) => grade.level === level.value)
                  .map((grade) => (
                    <div
                      key={grade.id}
                      className="overflow-hidden rounded-xl bg-white shadow-sm dark:bg-gray-dark"
                    >
                      <div className="p-5">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-black dark:text-white">
                            {grade.name}
                          </h3>
                          <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                            {grade.studentCount} Students
                          </span>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                            <div className="flex items-center">
                              <VideoCameraIcon className="h-5 w-5 text-gray-400" />
                              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                                Videos
                              </span>
                            </div>
                            <p className="mt-2 text-2xl font-semibold text-black dark:text-white">
                              {grade.materials.videos}
                            </p>
                          </div>
                          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                            <div className="flex items-center">
                              <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                                PDFs
                              </span>
                            </div>
                            <p className="mt-2 text-2xl font-semibold text-black dark:text-white">
                              {grade.materials.pdfs}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <button
                            onClick={() => {
                              setSelectedGrade(grade.id);
                              setShowUploadModal(true);
                            }}
                            className="w-full rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600"
                          >
                            Upload Material
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-dark">
            <div className="mb-6 flex justify-between">
              <h3 className="text-lg font-medium text-black dark:text-white">
                Upload {uploadType === 'video' ? 'Video' : 'PDF'}
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  School Level
                </label>
                <select
                  value={selectedLevel}
                  onChange={(e) => {
                    setSelectedLevel(e.target.value);
                    setSelectedGrade('');
                  }}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-dark"
                >
                  <option value="">Select Level</option>
                  {schoolLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Grade
                </label>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-dark"
                >
                  <option value="">Select Grade</option>
                  {filteredGrades.map((grade) => (
                    <option key={grade.id} value={grade.id}>
                      {grade.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Title
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-dark"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-dark"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  File
                </label>
                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 dark:border-gray-600">
                  <div className="space-y-1 text-center">
                    <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                      <label className="relative cursor-pointer rounded-md bg-white font-medium text-amber-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-amber-500 focus-within:ring-offset-2 hover:text-amber-500 dark:bg-gray-dark">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept={uploadType === 'video' ? 'video/*' : '.pdf'}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {uploadType === 'video'
                        ? 'MP4, MOV up to 100MB'
                        : 'PDF up to 10MB'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-dark dark:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 