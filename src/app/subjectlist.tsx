import React from "react";
import { motion } from "framer-motion";

interface SubjectListProps {
  programslists: string;
  subject: string;
  bglink: string;
}

const SubjectList: React.FC<SubjectListProps> = ({ programslists, subject }) => {
  const firstLetter = subject.charAt(0).toUpperCase();

  return (
    <motion.div
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.98 }}
      className="group relative overflow-hidden bg-gradient-to-l from-pink-700 to-blue-700 rounded-xl border-l-4 hover:border-amber-500 shadow-lg transition-all duration-300 hover:shadow-xl"
    >
      <a href={programslists} className="relative block h-42 p-6">
        <div className="flex h-full items-center space-x-4">
          {/* First Letter Logo */}
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border-2 border-white/20 group-hover:border-amber-400 transition-colors">
            <span className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
              {firstLetter}
            </span>
          </div>

          {/* Subject Content */}
          <div className="flex-grow">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                {subject}
              </h3>
              <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity">
                Click to explore lessons and exercises
              </p>
            </div>
            
            <div className="flex items-center space-x-2 text-white/80 group-hover:text-amber-400 transition-colors mt-2">
              <span className="text-sm font-medium">View Course</span>
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
      </a>
    </motion.div>
  );
};

export default SubjectList;
