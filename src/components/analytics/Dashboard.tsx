'use client';

import { useState, useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { format } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface AnalyticsData {
  dailyActiveUsers: number[];
  contentEngagement: {
    videos: number;
    quizzes: number;
    assignments: number;
  };
  quizResults: {
    grade: string;
    averageScore: number;
  }[];
  progressData: {
    date: string;
    completionRate: number;
  }[];
}

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      const res = await fetch(`/api/analytics?timeRange=${timeRange}`);
      const data = await res.json();
      setAnalyticsData(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-500">Failed to load analytics data</p>
      </div>
    );
  }

  const userActivityChart = {
    labels: Array.from({ length: analyticsData.dailyActiveUsers.length }, (_, i) =>
      format(new Date().setDate(new Date().getDate() - i), 'MMM d')
    ).reverse(),
    datasets: [
      {
        label: 'Daily Active Users',
        data: analyticsData.dailyActiveUsers,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
      },
    ],
  };

  const contentEngagementChart = {
    labels: ['Videos', 'Quizzes', 'Assignments'],
    datasets: [
      {
        data: [
          analyticsData.contentEngagement.videos,
          analyticsData.contentEngagement.quizzes,
          analyticsData.contentEngagement.assignments,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(75, 192, 192, 0.8)',
        ],
      },
    ],
  };

  const quizResultsChart = {
    labels: analyticsData.quizResults.map((item) => `Grade ${item.grade}`),
    datasets: [
      {
        label: 'Average Quiz Score',
        data: analyticsData.quizResults.map((item) => item.averageScore),
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
      },
    ],
  };

  const progressChart = {
    labels: analyticsData.progressData.map((item) =>
      format(new Date(item.date), 'MMM d')
    ),
    datasets: [
      {
        label: 'Completion Rate',
        data: analyticsData.progressData.map((item) => item.completionRate),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
        fill: true,
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-end space-x-2">
        {(['week', 'month', 'year'] as const).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 rounded-md ${
              timeRange === range
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </button>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Active Users</h3>
          <p className="text-3xl font-bold text-blue-600">
            {analyticsData.dailyActiveUsers[analyticsData.dailyActiveUsers.length - 1]}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total Videos Watched</h3>
          <p className="text-3xl font-bold text-red-600">
            {analyticsData.contentEngagement.videos}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Quizzes Taken</h3>
          <p className="text-3xl font-bold text-green-600">
            {analyticsData.contentEngagement.quizzes}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Average Completion</h3>
          <p className="text-3xl font-bold text-purple-600">
            {Math.round(
              analyticsData.progressData[analyticsData.progressData.length - 1]
                .completionRate
            )}%
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">User Activity</h3>
          <Line
            data={userActivityChart}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Content Engagement</h3>
          <Pie
            data={contentEngagementChart}
            options={{
              responsive: true,
            }}
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Quiz Results by Grade</h3>
          <Bar
            data={quizResultsChart}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                },
              },
            }}
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Progress Tracking</h3>
          <Line
            data={progressChart}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
} 