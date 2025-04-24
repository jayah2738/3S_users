'use client';
import { useState, useEffect } from 'react';
import {
  AcademicCapIcon,
  UserGroupIcon,
  BookOpenIcon,
  ChartBarIcon,
  CalendarIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  ChatBubbleLeftRightIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalCourses: number;
  activeUsers: number;
  totalAnnouncements: number;
  totalMaterials: number;
  totalVideos: number;
  upcomingEvents: number;
  averageAttendance: number;
  recentActivity: {
    id: string;
    type: string;
    title: string;
    time: string;
  }[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalTeachers: 0,
    totalCourses: 0,
    activeUsers: 0,
    totalAnnouncements: 0,
    totalMaterials: 0,
    totalVideos: 0,
    upcomingEvents: 0,
    averageAttendance: 0,
    recentActivity: [],
  });

  useEffect(() => {
    // TODO: Fetch actual stats from API
    setStats({
      totalStudents: 1500,
      totalTeachers: 45,
      totalCourses: 50,
      activeUsers: 1200,
      totalAnnouncements: 25,
      totalMaterials: 300,
      totalVideos: 150,
      upcomingEvents: 5,
      averageAttendance: 85,
      recentActivity: [
        {
          id: '1',
          type: 'course',
          title: 'New Mathematics Course Added',
          time: '2 hours ago',
        },
        {
          id: '2',
          type: 'announcement',
          title: 'School Holiday Announcement',
          time: '4 hours ago',
        },
        {
          id: '3',
          type: 'student',
          title: 'New Student Registration',
          time: '6 hours ago',
        },
      ],
    });
  }, []);

  const statCards = [
    {
      title: 'Total Students',
      value: stats.totalStudents,
      icon: UserGroupIcon,
      color: 'bg-blue-500',
      trend: '+12%',
      trendColor: 'text-green-500',
    },
    {
      title: 'Total Teachers',
      value: stats.totalTeachers,
      icon: AcademicCapIcon,
      color: 'bg-purple-500',
      trend: '+5%',
      trendColor: 'text-green-500',
    },
    {
      title: 'Total Courses',
      value: stats.totalCourses,
      icon: BookOpenIcon,
      color: 'bg-green-500',
      trend: '+8%',
      trendColor: 'text-green-500',
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: ChartBarIcon,
      color: 'bg-amber-500',
      trend: '+15%',
      trendColor: 'text-green-500',
    },
  ];

  const infoPanels = [
    {
      title: 'Learning Materials',
      icon: DocumentTextIcon,
      value: stats.totalMaterials,
      color: 'bg-indigo-500',
    },
    {
      title: 'Video Lessons',
      icon: VideoCameraIcon,
      value: stats.totalVideos,
      color: 'bg-red-500',
    },
    {
      title: 'Announcements',
      icon: ChatBubbleLeftRightIcon,
      value: stats.totalAnnouncements,
      color: 'bg-pink-500',
    },
    {
      title: 'Upcoming Events',
      icon: CalendarIcon,
      value: stats.upcomingEvents,
      color: 'bg-teal-500',
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black dark:text-white">
          Dashboard Overview
        </h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <ClockIcon className="h-5 w-5" />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <div
            key={stat.title}
            className="overflow-hidden rounded-xl bg-white shadow-sm dark:bg-gray-dark"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-lg p-3 ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                      {stat.title}
                    </dt>
                    <dd className="flex items-center">
                      <p className="text-2xl font-semibold text-black dark:text-white">
                        {stat.value}
                      </p>
                      <span className={`ml-2 text-sm font-medium ${stat.trendColor}`}>
                        {stat.trend}
                      </span>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Info Panels */}
        <div className="col-span-2">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {infoPanels.map((panel) => (
              <div
                key={panel.title}
                className="overflow-hidden rounded-xl bg-white shadow-sm dark:bg-gray-dark"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 rounded-lg p-3 ${panel.color}`}>
                      <panel.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {panel.title}
                      </p>
                      <p className="text-xl font-semibold text-black dark:text-white">
                        {panel.value}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="overflow-hidden rounded-xl bg-white shadow-sm dark:bg-gray-dark">
          <div className="border-b border-gray-200 dark:border-gray-700 px-5 py-4">
            <h3 className="text-lg font-medium text-black dark:text-white">
              Recent Activity
            </h3>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {stats.recentActivity.map((activity) => (
              <div key={activity.id} className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ArrowTrendingUpIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-black dark:text-white">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {activity.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attendance Overview */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm dark:bg-gray-dark">
        <div className="border-b border-gray-200 dark:border-gray-700 px-5 py-4">
          <h3 className="text-lg font-medium text-black dark:text-white">
            Attendance Overview
          </h3>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Average Attendance
              </p>
              <p className="text-2xl font-semibold text-black dark:text-white">
                {stats.averageAttendance}%
              </p>
            </div>
            <div className="h-24 w-24">
              {/* TODO: Add a circular progress chart here */}
              <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                <span className="text-lg font-semibold text-black dark:text-white">
                  {stats.averageAttendance}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 