'use client';

import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import SubjectList from '@/components/coursesdata/SubjectList';
import UserHeader from '@/app/userheader';
import { useEffect } from 'react';

const CoursesPage = () => {
  const { data: session, status } = useSession();
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    // Debug session data
    console.log('Session status:', status);
    console.log('Session data:', session);
    console.log('Session user:', session?.user);
  }, [session, status]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/auth/signin');
    return null;
  }

  // Decode the grade parameter to remove %20
  const decodedGrade = decodeURIComponent(params.grade as string);

  // Get the username from session, with fallbacks
  const username =  session?.user?.name || "Guest";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <UserHeader username={username} grade={decodedGrade} />
      <SubjectList />
    </div>
  );
};

export default CoursesPage;
