'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Subject {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

const subjects: Subject[] = [
  {
    id: 'math',
    name: 'Mathematics',
    description: 'Explore numbers, shapes, and patterns',
    icon: '📐',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'science',
    name: 'Science',
    description: 'Discover the wonders of the natural world',
    icon: '🔬',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'english',
    name: 'English',
    description: 'Master language and literature',
    icon: '📚',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'history',
    name: 'History',
    description: 'Journey through time and civilizations',
    icon: '⏳',
    color: 'from-amber-500 to-amber-600'
  }
];

const SubjectList = () => {
  const params = useParams();
  const decodedGrade = decodeURIComponent(params.grade as string);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
          Grade {decodedGrade} Subjects
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Choose a subject to begin your learning journey
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {subjects.map((subject, index) => (
          <motion.div
            key={subject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/courses/${decodedGrade}/${subject.id}`}>
              <div className={`bg-gradient-to-br ${subject.color} rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}>
                <div className="p-6">
                  <div className="text-4xl mb-4">{subject.icon}</div>
                  <h2 className="text-xl font-semibold text-white mb-2">{subject.name}</h2>
                  <p className="text-white/80">{subject.description}</p>
                </div>
                <div className="bg-white/10 p-4 flex items-center justify-between">
                  <span className="text-white text-sm">Start Learning</span>
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SubjectList; 