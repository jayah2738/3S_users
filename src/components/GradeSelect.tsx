'use client';

import React from 'react';
import { educationLevels, type EducationLevel } from '@/utils/education';

interface GradeSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

const GradeSelect: React.FC<GradeSelectProps> = ({ value, onChange, disabled = false, className = '' }) => {
  const [level, setLevel] = React.useState<EducationLevel | ''>('');

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLevel = e.target.value as EducationLevel | '';
    setLevel(newLevel);
    // Reset grade when level changes
    onChange('');
  };

  return (
    <div className="space-y-4">
      <select
        value={level}
        onChange={handleLevelChange}
        disabled={disabled}
        className={`relative block w-full rounded-md border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-amber-500 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 dark:focus:ring-amber-500 sm:text-sm sm:leading-6 ${className}`}
      >
        <option value="">Select Level</option>
        {Object.entries(educationLevels).map(([key, { name }]) => (
          <option key={key} value={key}>
            {name}
          </option>
        ))}
      </select>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled || !level}
        className={`relative block w-full rounded-md border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-amber-500 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 dark:focus:ring-amber-500 sm:text-sm sm:leading-6 ${className}`}
      >
        <option value="">Select Grade</option>
        {level && educationLevels[level].grades.map((grade) => (
          <option key={grade} value={grade}>
            {grade}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GradeSelect; 