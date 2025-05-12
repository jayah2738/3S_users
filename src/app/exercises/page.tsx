"use client";
import React from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import SubjectList from "@/app/subjectlist";
import { subjectlistdata } from "@/components/coursesdata/Sublistdata";
import UserHeader from "@/app/userheader";
import { motion } from "framer-motion";

interface PageProps {
  params: {
    grade: string;
  };
}

const GradeExercisesPage = ({ params }: PageProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="flex items-center justify-center min-h-screen">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-medium text-gray-600 dark:text-gray-300">
              Loading...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    router.push('/signin');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <UserHeader username={session.user.name} grade={params.grade} />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Grade {params.grade} Exercises
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Practice and reinforce your learning with interactive exercises and assessments
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {subjectlistdata.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SubjectList
                key={index}
                programslists={`/courses/${params.grade}/${item.id}`}
                subject={item.subject}
                bglink={item.bglink || '/images/subjects/default.jpg'}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradeExercisesPage; 