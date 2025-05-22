'use client';
import React from 'react';
import Link from 'next/link';
import { Subject } from '@/lib/gradeData';
import { motion } from "framer-motion";


interface SubjectListProps {
  subjects: Subject[];
  gradeId: string;
}

const SubjectList: React.FC<SubjectListProps> = ({ subjects, gradeId }) => {

  return (
    <div className='grid grid-flow-rows lg:grid-cols-4 grid-cols-1'>
      {subjects.map((subject,index) => (
        <motion.div
        key={index}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.98 }}
          className="relative block h-42 m-4 p-2 group overflow-hidden bg-gradient-to-l from-pink-700 to-blue-800 rounded-xl border-l-4 hover:border-amber-500 shadow-lg transition-all duration-300 hover:shadow-xl"
        >

          <Link
            key={subject.id}
            // href={`/grades/${gradeId}/subjects/${subject.id}`}
            href={`/grades/${gradeId}/subjects`}
            className="relative block h-42 p-6"
          >
            <div className="flex h-full items-center space-x-4">
              {/* First Letter Logo */}
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border-2 border-white/20 group-hover:border-amber-400 transition-colors">
                <span className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                  {subject.name.charAt(0).toUpperCase()}
                </span>
              </div>

              {/* Subject Content */}
              <div className="flex-grow">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {subject.name}
                  </h3>
                  <p className="text-sm text-gray-200 opacity-1 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to explore lessons and exercises
                  </p>
                </div>

                <div className="flex items-center space-x-2 text-white/80 group-hover:text-amber-400 transition-colors mt-2">
                  <span className="text-sm font-medium">
                    <p className="text-amber-500">View Courses</p>
                  </span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

          </Link>
        </motion.div>
         ))}
  </div>);
};

export default SubjectList; 