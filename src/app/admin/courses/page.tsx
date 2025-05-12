'use client';
import { useState, useEffect } from 'react';
import {
  AcademicCapIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface Material {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'pdf';
  fileUrl: string;
  gradeId: string;
  subject: string;
  lessonType: 'lesson' | 'exercise';
  createdAt: string;
}

interface Grade {
  id: string;
  name: string;
  level: string;
}

const subjects = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'French',
  'History',
  'Geography',
  'Computer Science',
];

export default function CoursesPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState<'video' | 'pdf'>('video');
  const [lessonType, setLessonType] = useState<'lesson' | 'exercise'>('lesson');
  const [materials, setMaterials] = useState<Material[]>([
    {
      id: '1',
      title: 'Introduction to Numbers',
      description: 'Basic counting and number recognition for preschool students',
      type: 'video',
      fileUrl: 'https://example.com/video1.mp4',
      gradeId: '1',
      subject: 'Mathematics',
      lessonType: 'lesson',
      createdAt: '2024-03-20T10:00:00Z'
    },
    {
      id: '2',
      title: 'Alphabet Practice',
      description: 'Learning letters and basic phonics',
      type: 'pdf',
      fileUrl: 'https://example.com/pdf1.pdf',
      gradeId: '2',
      subject: 'English',
      lessonType: 'lesson',
      createdAt: '2024-03-20T11:00:00Z'
    },
    {
      id: '3',
      title: 'Basic Addition',
      description: 'Introduction to addition for primary students',
      type: 'video',
      fileUrl: 'https://example.com/video2.mp4',
      gradeId: '5',
      subject: 'Mathematics',
      lessonType: 'lesson',
      createdAt: '2024-03-20T12:00:00Z'
    },
    {
      id: '4',
      title: 'Multiplication Exercises',
      description: 'Practice problems for multiplication',
      type: 'pdf',
      fileUrl: 'https://example.com/pdf2.pdf',
      gradeId: '6',
      subject: 'Mathematics',
      lessonType: 'exercise',
      createdAt: '2024-03-20T13:00:00Z'
    },
    {
      id: '5',
      title: 'Physics Basics',
      description: 'Introduction to physics concepts',
      type: 'video',
      fileUrl: 'https://example.com/video3.mp4',
      gradeId: '14',
      subject: 'Physics',
      lessonType: 'lesson',
      createdAt: '2024-03-20T14:00:00Z'
    },
    {
      id: '6',
      title: 'Chemistry Lab Safety',
      description: 'Safety guidelines for chemistry experiments',
      type: 'pdf',
      fileUrl: 'https://example.com/pdf3.pdf',
      gradeId: '15',
      subject: 'Chemistry',
      lessonType: 'lesson',
      createdAt: '2024-03-20T15:00:00Z'
    }
  ]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const schoolLevels = [
    { value: 'preschool', label: 'Preschool' },
    { value: 'primary', label: 'Primary School' },
    { value: 'middle', label: 'Middle School' },
    { value: 'high', label: 'High School' },
  ];

  const handleDeleteMaterial = async (materialId: string) => {
    try {
      const response = await fetch(`/api/admin/materials/${materialId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMaterials(materials.filter(material => material.id !== materialId));
      }
    } catch (error) {
      console.error('Error deleting material:', error);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    try {
      const response = await fetch('/api/admin/materials', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const newMaterial = await response.json();
        setMaterials([...materials, newMaterial]);
        setShowUploadModal(false);
      }
    } catch (error) {
      console.error('Error uploading material:', error);
    }
  };

  useEffect(() => {
    const fetchMaterials = async () => {
      setIsSearching(true);
      try {
        const params = new URLSearchParams();
        if (selectedLevel) params.append('level', selectedLevel);
        if (selectedGrade) params.append('gradeId', selectedGrade);
        if (selectedSubject) params.append('subject', selectedSubject);
        if (lessonType) params.append('lessonType', lessonType);
        if (searchQuery) params.append('search', searchQuery);

        const response = await fetch(`/api/admin/materials?${params.toString()}`);
        const data = await response.json();
        setMaterials(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching materials:', error);
        setMaterials([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchMaterials();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [selectedLevel, selectedGrade, selectedSubject, lessonType, searchQuery]);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <h1 className="text-2xl font-bold text-black dark:text-white">
          Course Materials
        </h1>
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 sm:max-w-md">
            <input
              type="text"
              placeholder="Search materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center space-x-2 rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Upload Material</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
          {grades
            .filter((grade) => !selectedLevel || grade.level === selectedLevel)
            .map((grade) => (
              <option key={grade.id} value={grade.id}>
                {grade.name}
              </option>
            ))}
        </select>

        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-dark"
        >
          <option value="">All Subjects</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>

        <select
          value={lessonType}
          onChange={(e) => setLessonType(e.target.value as 'lesson' | 'exercise')}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-dark"
        >
          <option value="lesson">Lessons</option>
          <option value="exercise">Exercises</option>
        </select>
      </div>

      {/* Materials Grid */}
      <div className="relative">
        {isSearching && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-gray-dark/50">
            <div className="flex items-center space-x-2 rounded-lg bg-white p-4 shadow-lg dark:bg-gray-dark">
              <svg
                className="h-5 w-5 animate-spin text-amber-500"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Searching...
              </span>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {materials.length === 0 ? (
            <div className="col-span-full rounded-xl bg-white p-8 text-center shadow-sm dark:bg-gray-dark">
              <AcademicCapIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                No materials found
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {searchQuery
                  ? 'Try adjusting your search or filters'
                  : 'Get started by uploading a new material'}
              </p>
              {!searchQuery && (
                <div className="mt-6">
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="inline-flex items-center rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600"
                  >
                    <PlusIcon className="mr-2 h-5 w-5" />
                    Upload Material
                  </button>
                </div>
              )}
            </div>
          ) : (
            materials.map((material) => (
              <div
                key={material.id}
                className="overflow-hidden rounded-xl bg-white shadow-sm dark:bg-gray-dark"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {material.type === 'video' ? (
                        <VideoCameraIcon className="h-5 w-5 text-amber-500" />
                      ) : (
                        <DocumentTextIcon className="h-5 w-5 text-amber-500" />
                      )}
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {material.type.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-amber-500">
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteMaterial(material.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <h3 className="mt-2 text-lg font-medium text-black dark:text-white">
                    {material.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {material.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                      {material.subject}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(material.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

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
            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  School Level
                </label>
                <select
                  name="level"
                  value={selectedLevel}
                  onChange={(e) => {
                    setSelectedLevel(e.target.value);
                    setSelectedGrade('');
                  }}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-dark"
                  required
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
                  name="gradeId"
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-dark"
                  required
                >
                  <option value="">Select Grade</option>
                  {grades
                    .filter((grade) => !selectedLevel || grade.level === selectedLevel)
                    .map((grade) => (
                      <option key={grade.id} value={grade.id}>
                        {grade.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subject
                </label>
                <select
                  name="subject"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-dark"
                  required
                >
                  <option value="">Select Subject</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Type
                </label>
                <select
                  name="lessonType"
                  value={lessonType}
                  onChange={(e) => setLessonType(e.target.value as 'lesson' | 'exercise')}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-dark"
                  required
                >
                  <option value="lesson">Lesson</option>
                  <option value="exercise">Exercise</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-dark"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-dark"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  File
                </label>
                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 dark:border-gray-600">
                  <div className="space-y-1 text-center">
                    {uploadType === 'video' ? (
                      <VideoCameraIcon className="mx-auto h-12 w-12 text-gray-400" />
                    ) : (
                      <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                    )}
                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                      <label className="relative cursor-pointer rounded-md bg-white font-medium text-amber-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-amber-500 focus-within:ring-offset-2 hover:text-amber-500 dark:bg-gray-dark">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          name="file"
                          className="sr-only"
                          accept={uploadType === 'video' ? 'video/*' : '.pdf'}
                          required
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