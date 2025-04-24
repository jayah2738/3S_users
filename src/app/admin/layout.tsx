'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { Bars3Icon, XMarkIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    // Check if user is admin
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const name = localStorage.getItem('adminName') || '';
    setAdminName(name);

    if (!isAdmin) {
      router.push('/');
    }
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem('adminName');
    localStorage.removeItem('isAdmin');
    router.push('/');
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobile Sidebar Toggle */}
      <button
        type="button"
        className="fixed left-4 top-4 z-40 rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500 dark:bg-gray-dark dark:hover:bg-gray-700 lg:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <span className="sr-only">Open sidebar</span>
        {isSidebarOpen ? (
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white dark:bg-gray-dark transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-dark">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-black dark:text-white">
              Welcome, {adminName}
            </h2>
          </div>
          <button
            onClick={handleSignOut}
            className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500 dark:hover:bg-gray-700"
            title="Sign Out"
          >
            <span className="sr-only">Sign Out</span>
            <ArrowRightOnRectangleIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-gray-900/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
} 