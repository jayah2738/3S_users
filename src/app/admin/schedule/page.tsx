'use client';
import { useState, useEffect } from 'react';
import {
  AcademicCapIcon,
  ClockIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface Schedule {
  id: string;
  gradeId: string;
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
  teacher: string;
  grade: string;
}

interface Grade {
  id: string;
  name: string;
  level: string;
}

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeSlots = [
  '08:00-10:00', '10:00-12:00', '14:00-15:30', '15:30-17:00'
];

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
  'Physical Education',
  'Art',
  'Music'
];

interface ScheduleForm {
  id?: string;
  gradeId: string;
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
  teacher: string;
}

export default function SchedulePage() {
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [formData, setFormData] = useState<ScheduleForm>({
    gradeId: '',
    day: '',
    startTime: '',
    endTime: '',
    subject: '',
    teacher: ''
  });
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: '1',
      gradeId: '10',
      day: 'Monday',
      startTime: '08:00',
      endTime: '10:00',
      subject: 'Mathematics',
      teacher: 'Mr. Smith',
      grade: 'Grade 6'
    },
    {
      id: '2',
      gradeId: '10',
      day: 'Monday',
      startTime: '10:00',
      endTime: '12:00',
      subject: 'English',
      teacher: 'Ms. Johnson',
      grade: 'Grade 6'
    },
    {
      id: '3',
      gradeId: '14',
      day: 'Monday',
      startTime: '14:00',
      endTime: '15:30',
      subject: 'Physics',
      teacher: 'Mr. Brown',
      grade: 'Grade 10'
    },
    {
      id: '4',
      gradeId: '14',
      day: 'Monday',
      startTime: '15:30',
      endTime: '17:00',
      subject: 'Chemistry',
      teacher: 'Ms. Davis',
      grade: 'Grade 10'
    },
    {
      id: '5',
      gradeId: '10',
      day: 'Tuesday',
      startTime: '08:00',
      endTime: '10:00',
      subject: 'History',
      teacher: 'Mr. Wilson',
      grade: 'Grade 6'
    },
    {
      id: '6',
      gradeId: '14',
      day: 'Tuesday',
      startTime: '10:00',
      endTime: '12:00',
      subject: 'Biology',
      teacher: 'Ms. Taylor',
      grade: 'Grade 10'
    },
    {
      id: '7',
      gradeId: '11',
      day: 'Wednesday',
      startTime: '08:00',
      endTime: '10:00',
      subject: 'Mathematics',
      teacher: 'Mr. Smith',
      grade: 'Grade 7'
    },
    {
      id: '8',
      gradeId: '15',
      day: 'Wednesday',
      startTime: '10:00',
      endTime: '12:00',
      subject: 'Physics',
      teacher: 'Mr. Brown',
      grade: '11 L'
    }
  ]);

  const [grades, setGrades] = useState<Grade[]>([
    // Middle School
    { id: '10', name: 'Grade 6', level: 'middle' },
    { id: '11', name: 'Grade 7', level: 'middle' },
    { id: '12', name: 'Grade 8', level: 'middle' },
    { id: '13', name: 'Grade 9', level: 'middle' },
    
    // High School
    { id: '14', name: 'Grade 10', level: 'high' },
    { id: '15', name: '11 L', level: 'high' },
    { id: '16', name: '11 OSE', level: 'high' },
    { id: '17', name: '11 S', level: 'high' },
    { id: '18', name: '12 L', level: 'high' },
    { id: '19', name: '12 OSE', level: 'high' },
    { id: '20', name: '12 S', level: 'high' }
  ]);

  const schoolLevels = [
    { value: 'middle', label: 'Middle School' },
    { value: 'high', label: 'High School' },
  ];

  const filteredGrades = selectedLevel
    ? grades.filter(grade => grade.level === selectedLevel)
    : grades;

  const filteredSchedules = schedules.filter(schedule => {
    const grade = grades.find(g => g.id === schedule.gradeId);
    return (!selectedLevel || grade?.level === selectedLevel) &&
           (!selectedGrade || schedule.gradeId === selectedGrade);
  });

  const getScheduleForDay = (day: string) => {
    return filteredSchedules.filter(schedule => {
      const grade = grades.find(g => g.id === schedule.gradeId);
      // Only show schedules for middle and high school
      return schedule.day === day && (grade?.level === 'middle' || grade?.level === 'high');
    });
  };

  const getBreakTime = (time: string, level: string) => {
    return null;
  };

  const handleEditSchedule = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setFormData({
      id: schedule.id,
      gradeId: schedule.gradeId,
      day: schedule.day,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      subject: schedule.subject,
      teacher: schedule.teacher
    });
    setShowAddModal(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newSchedule: Schedule = {
      id: editingSchedule?.id || Math.random().toString(36).substr(2, 9),
      gradeId: formData.gradeId,
      day: formData.day,
      startTime: formData.startTime,
      endTime: formData.endTime,
      subject: formData.subject,
      teacher: formData.teacher,
      grade: grades.find(g => g.id === formData.gradeId)?.name || ''
    };

    if (editingSchedule) {
      setSchedules(schedules.map(s => s.id === editingSchedule.id ? newSchedule : s));
    } else {
      setSchedules([...schedules, newSchedule]);
    }

    setShowAddModal(false);
    setEditingSchedule(null);
    setFormData({
      gradeId: '',
      day: '',
      startTime: '',
      endTime: '',
      subject: '',
      teacher: ''
    });
  };

  const handleDeleteSchedule = (scheduleId: string) => {
    setSchedules(schedules.filter(s => s.id !== scheduleId));
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <h1 className="text-2xl font-bold text-black dark:text-white">
          School Schedule
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Schedule</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
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

      {/* Schedule Tables */}
      <div className="space-y-8">
        {/* Grade Schedules */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            {selectedGrade ? `${grades.find(g => g.id === selectedGrade)?.name} Schedule` : 'Grade Schedules'}
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {grades
              .filter(grade => {
                if (selectedGrade) return grade.id === selectedGrade;
                if (selectedLevel) return grade.level === selectedLevel;
                return true;
              })
              .map((grade) => {
                const gradeSchedules = schedules.filter(s => s.gradeId === grade.id);
                if (gradeSchedules.length === 0) return null;

                return (
                  <div key={grade.id} className="overflow-hidden rounded-xl bg-white shadow-sm dark:bg-gray-dark">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg font-medium text-black dark:text-white">
                        {grade.name} Schedule
                      </h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                              Time
                            </th>
                            {daysOfWeek.map((day) => (
                              <th key={day} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                {day}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-dark">
                          {timeSlots.map((time) => (
                            <tr key={time}>
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                {time}
                              </td>
                              {daysOfWeek.map((day) => {
                                const schedule = gradeSchedules.find(
                                  s => s.day === day && s.startTime === time.split('-')[0]
                                );
                                
                                return (
                                  <td key={day} className="px-6 py-4">
                                    {schedule ? (
                                      <div className="group relative rounded-lg bg-amber-50 p-2 dark:bg-amber-900">
                                        <div className="text-sm font-medium text-amber-800 dark:text-amber-200">
                                          {schedule.subject}
                                        </div>
                                        <div className="mt-1 text-xs text-amber-600 dark:text-amber-300">
                                          {schedule.teacher}
                                        </div>
                                        <div className="absolute right-2 top-2 hidden group-hover:block">
                                          <button
                                            onClick={() => handleEditSchedule(schedule)}
                                            className="rounded-full bg-amber-500 p-1 text-white hover:bg-amber-600"
                                          >
                                            <PencilIcon className="h-4 w-4" />
                                          </button>
                                          <button
                                            onClick={() => handleDeleteSchedule(schedule.id)}
                                            className="ml-1 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                                          >
                                            <TrashIcon className="h-4 w-4" />
                                          </button>
                                        </div>
                                      </div>
                                    ) : null}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Add/Edit Schedule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-dark">
            <div className="mb-6 flex justify-between">
              <h3 className="text-lg font-medium text-black dark:text-white">
                {editingSchedule ? 'Edit Schedule' : 'Add Schedule'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingSchedule(null);
                  setFormData({
                    gradeId: '',
                    day: '',
                    startTime: '',
                    endTime: '',
                    subject: '',
                    teacher: ''
                  });
                }}
                className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Grade
                </label>
                <select
                  value={formData.gradeId}
                  onChange={(e) => setFormData({ ...formData, gradeId: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-dark"
                  required
                >
                  <option value="">Select Grade</option>
                  {grades.map((grade) => (
                    <option key={grade.id} value={grade.id}>
                      {grade.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Day
                </label>
                <select
                  value={formData.day}
                  onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-dark"
                  required
                >
                  <option value="">Select Day</option>
                  {daysOfWeek.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Start Time
                  </label>
                  <select
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-dark"
                    required
                  >
                    <option value="">Select Start Time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time.split('-')[0]}>
                        {time.split('-')[0]}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    End Time
                  </label>
                  <select
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-dark"
                    required
                  >
                    <option value="">Select End Time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time.split('-')[1]}>
                        {time.split('-')[1]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
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
                  Teacher
                </label>
                <input
                  type="text"
                  value={formData.teacher}
                  onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-dark"
                  placeholder="Enter teacher name"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingSchedule(null);
                    setFormData({
                      gradeId: '',
                      day: '',
                      startTime: '',
                      endTime: '',
                      subject: '',
                      teacher: ''
                    });
                  }}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-dark dark:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                >
                  {editingSchedule ? 'Update Schedule' : 'Add Schedule'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 