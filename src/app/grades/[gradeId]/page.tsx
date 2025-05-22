'use client';

import { getGradeById } from '@/lib/gradeData';
import SubjectList from '@/components/SubjectList';
import { notFound } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { use } from 'react';

interface GradePageProps {
  params: Promise<{
    gradeId: string;
  }>;
}

export default function GradePage({ params }: GradePageProps) {
  const { data: session } = useSession();
  const { gradeId } = use(params);
  const grade = getGradeById(gradeId);

  // Check if the user is authorized to view this grade
  // if (session?.user?.grade !== gradeId) {
  //   notFound();
  // }

  // if (!grade) {
  //   notFound();
  // }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          {grade.name} Subjects
        </h1>
        <SubjectList subjects={grade.subjects} gradeId={grade.id} />
      </div>
    </div>
  );
} 