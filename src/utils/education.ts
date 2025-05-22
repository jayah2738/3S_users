export const educationLevels = {
  preschool: {
    name: 'preschool',
    grades: ['tps', 'ps', 'ms', 'gs']
  },
  primary: {
    name: 'primary school',
    grades: ['grade 1', 'grade 2', 'grade 3', 'grade 4', 'grade 5']
  },
  middle: {
    name: 'middle school',
    grades: ['grade 6', 'grade 7', 'grade 8', 'grade 9']
  },
  high: {
    name: 'high school',
    grades: ['grade 10', 'grade 11 l', 'grade 11 ose', 'grade 11 s', 'grade 12 l', 'grade 12 ose', 'grade 12 s']
  }
} as const;

export type EducationLevel = keyof typeof educationLevels;
export type Grade = typeof educationLevels[EducationLevel]['grades'][number]; 