'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import UserHeader from '@/app/userheader';

export default function GradesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <UserHeader username={session.user?.name} grade={session.user?.grade} />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
} 