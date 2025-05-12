export const educationLevels = {
  preschool: {
    name: 'Preschool',
    grades: ['TPS', 'PS', 'MS', 'GS']
  },
  primary: {
    name: 'Primary School',
    grades: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5']
  },
  middle: {
    name: 'Middle School',
    grades: ['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9']
  },
  high: {
    name: 'High School',
    grades: ['Grade 10', 'Grade 11 L', 'Grade 11 OSE', 'Grade 11 S', 'Grade 12 L', 'Grade 12 OSE', 'Grade 12 S']
  }
} as const;

export type EducationLevel = keyof typeof educationLevels;
export type Grade = typeof educationLevels[EducationLevel]['grades'][number]; 