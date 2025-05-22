export type Subject = {
  id: string;
  name: string;
  description?: string;
};

export type Grade = {
  id: string;
  name: string;
  level: 'preschool' | 'primary' | 'middle' | 'high';
  subjects: Subject[];
};

export const gradeData: Grade[] = [
  {
    id: 'tps',
    name: 'TPS',
    level: 'preschool',
    subjects: [
      { id: 'lang-dev', name: 'Develop the language skills in all of their dimensions' },
      { id: 'physical', name: 'Act, express oneself, and understand through physical activities' },
      { id: 'artistic', name: 'Act, express oneself, and understand through artistic activities' },
      { id: 'math', name: 'Acquire foundational mathematical skills' },
      { id: 'world', name: 'Explore the world' }
    ]
  },
  {
    id: 'ps',
    name: 'PS',
    level: 'preschool',
    subjects: [
      { id: 'lang-dev', name: 'Develop the language skills in all of their dimensions' },
      { id: 'physical', name: 'Act, express oneself, and understand through physical activities' },
      { id: 'artistic', name: 'Act, express oneself, and understand through artistic activities' },
      { id: 'math', name: 'Acquire foundational mathematical skills' },
      { id: 'world', name: 'Explore the world' }
    ]
  },
  {
    id: 'ms',
    name: 'MS',
    level: 'preschool',
    subjects: [
      { id: 'lang-dev', name: 'Develop the language skills in all of their dimensions' },
      { id: 'physical', name: 'Act, express oneself, and understand through physical activities' },
      { id: 'artistic', name: 'Act, express oneself, and understand through artistic activities' },
      { id: 'math', name: 'Acquire foundational mathematical skills' },
      { id: 'world', name: 'Explore the world' }
    ]
  },
  {
    id: 'gs',
    name: 'GS',
    level: 'preschool',
    subjects: [
      { id: 'lang-dev', name: 'Develop the language skills in all of their dimensions' },
      { id: 'physical', name: 'Act, express oneself, and understand through physical activities' },
      { id: 'artistic', name: 'Act, express oneself, and understand through artistic activities' },
      { id: 'math', name: 'Acquire foundational mathematical skills' },
      { id: 'world', name: 'Explore the world' }
    ]
  },
  {
    id: 'grade1',
    name: 'Grade 1',
    level: 'primary',
    subjects: [
      { id: 'malagasy', name: 'Malagasy' },
      { id: 'vikiteny', name: 'Vikiteny' },
      { id: 'french', name: 'French' },
      { id: 'lecture', name: 'Lecture' },
      { id: 'language', name: 'Language' },
      { id: 'ecriture', name: 'Ecriture' },
      { id: 'english', name: 'English' },
      { id: 'mathematics', name: 'Mathematics' },
      { id: 'ffmom', name: 'FFMOM' },
      { id: 'recitation', name: 'Recitation' },
      { id: 'informatics', name: 'Informatics' }
    ]
  },
  {
    id: 'grade2',
    name: 'Grade 2',
    level: 'primary',
    subjects: [
      { id: 'malagasy', name: 'Malagasy' },
      { id: 'vikiteny', name: 'Vikiteny' },
      { id: 'french', name: 'French' },
      { id: 'lecture', name: 'Lecture' },
      { id: 'language', name: 'Language' },
      { id: 'ecriture', name: 'Ecriture' },
      { id: 'english', name: 'English' },
      { id: 'mathematics', name: 'Mathematics' },
      { id: 'ffmom', name: 'FFMOM' },
      { id: 'recitation', name: 'Recitation' },
      { id: 'informatics', name: 'Informatics' }
    ]
  },
  {
    id: 'grade3',
    name: 'Grade 3',
    level: 'primary',
    subjects: [
      { id: 'malagasy', name: 'Malagasy' },
      { id: 'vikiteny', name: 'Vikiteny' },
      { id: 'french', name: 'French' },
      { id: 'lecture', name: 'Lecture' },
      { id: 'language', name: 'Language' },
      { id: 'geography', name: 'Geography' },
      { id: 'english', name: 'English' },
      { id: 'mathematics', name: 'Mathematics' },
      { id: 'ffmomtantara', name: 'FFMOM + Tantara' },
      { id: 'recitation', name: 'Recitation' },
      { id: 'informatics', name: 'Informatics' },
      {id:'svt',name:'SVT'}
    ]
  },
  {
    id: 'grade4',
    name: 'Grade 4',
    level: 'primary',
    subjects: [
      { id: 'malagasy', name: 'Malagasy' },
      { id: 'vikiteny', name: 'Vikiteny' },
      { id: 'french', name: 'French' },
      { id: 'lecture', name: 'Lecture' },
      { id: 'language', name: 'Language' },
      { id: 'dictation', name: 'Dictation' },
      { id: 'operation', name: 'Operation' },
      { id: 'geography', name: 'Geography' },
      { id: 'problem', name: 'Problem' },
      { id: 'english', name: 'English' },
      { id: 'mathematics', name: 'Mathematics' },
      { id: 'ffmomtantara', name: 'FFMOM + Tantara' },
      { id: 'recitation', name: 'Recitation' },
      { id: 'informatics', name: 'Informatics' },
      {id:'svt',name:'SVT'}
    ]
  },
  {
    id: 'grade5',
    name: 'Grade 5',
    level: 'primary',
    subjects: [
      { id: 'malagasy', name: 'Malagasy' },
      { id: 'vakiteny', name: 'Vakiteny' },
      { id: 'french', name: 'French' },
      { id: 'lecture', name: 'Lecture' },
      { id: 'operation', name: 'Operation' },
      { id: 'geography', name: 'Geography' },
      { id: 'problem', name: 'Problem' },
      { id: 'english', name: 'English' },
      { id: 'mathematics', name: 'Mathematics' },
      { id: 'tfm', name: 'TFM' },
      { id: 'informatics', name: 'Informatics' },
      {id:'svt',name:'SVT'}
    ]
  },
  {
    id: 'grade6',
    name: 'Grade 6',
    level: 'middle',
    subjects: [
      { id: 'malagasy', name: 'Malagasy' },
      { id: 'english', name: 'English' },
      { id: 'french', name: 'French' },
      { id: 'history', name: 'History' },
      { id: 'geography', name: 'Geography' },
      { id: 'mathematics', name: 'Mathematics' },
      { id: 'physics', name: 'Physics' },
      { id: 'svt', name: 'SVT' },
      { id: 'eps', name: 'EPS' },
      { id: 'informatics', name: 'Informatics' },
    ]
  },
  {
    id: 'grade7',
    name: 'Grade 7',
    level: 'middle',
    subjects: [
      { id: 'malagasy', name: 'Malagasy' },
      { id: 'english', name: 'English' },
      { id: 'french', name: 'French' },
      { id: 'history', name: 'History' },
      { id: 'geography', name: 'Geography' },
      { id: 'mathematics', name: 'Mathematics' },
      { id: 'physics', name: 'Physics' },
      { id: 'svt', name: 'SVT' },
      { id: 'eps', name: 'EPS' },
      { id: 'informatics', name: 'Informatics' },
    ]
  },{
    id: 'grade8',
    name: 'Grade 8',
    level: 'middle',
    subjects: [
      { id: 'malagasy', name: 'Malagasy' },
      { id: 'english', name: 'English' },
      { id: 'french', name: 'French' },
      { id: 'history', name: 'History' },
      { id: 'geography', name: 'Geography' },
      { id: 'mathematics', name: 'Mathematics' },
      { id: 'physics', name: 'Physics' },
      { id: 'svt', name: 'SVT' },
      { id: 'eps', name: 'EPS' },
      { id: 'informatics', name: 'Informatics' },
    ]
  },{
    id: 'grade9',
    name: 'Grade 9',
    level: 'middle',
    subjects: [
      { id: 'malagasy', name: 'Malagasy' },
      { id: 'english', name: 'English' },
      { id: 'french', name: 'French' },
      { id: 'history', name: 'History' },
      { id: 'geography', name: 'Geography' },
      { id: 'mathematics', name: 'Mathematics' },
      { id: 'physics', name: 'Physics' },
      { id: 'svt', name: 'SVT' },
      { id: 'eps', name: 'EPS' },
      { id: 'informatics', name: 'Informatics' },
    ]
  },
  {
    id: 'grade10',
    name: 'Grade 10',
    level: 'high',
    subjects: [
      { id: 'malagasy', name: 'Malagasy' },
      { id: 'english', name: 'English' },
      { id: 'french', name: 'French' },
      { id: 'history', name: 'History' },
      { id: 'geography', name: 'Geography' },
      { id: 'mathematics', name: 'Mathematics' },
      { id: 'physics', name: 'Physics' },
      { id: 'svt', name: 'SVT' },
      { id: 'ses', name: 'SES' },
      { id: 'eac', name: 'EAC' },
      { id: 'eps', name: 'EPS' },
      { id: 'informatics', name: 'Informatics' },
    ]
  },
  {
    id: 'grade11l',
    name: 'Grade 11 L',
    level: 'high',
    subjects: [
      { id: 'malagasy', name: 'Malagasy' },
      { id: 'english', name: 'English' },
      { id: 'french', name: 'French' },
      { id: 'history', name: 'History' },
      { id: 'geography', name: 'Geography' },
      { id: 'mathematics', name: 'Mathematics' },
      { id: 'physics', name: 'Physics' },
      { id: 'svt', name: 'SVT' },
      { id: 'ses', name: 'SES' },
      { id: 'eac', name: 'EAC' },
      { id: 'eps', name: 'EPS' },
      { id: 'philosophy', name: 'Philosophy' },
      { id: 'informatics', name: 'Informatics' },
    ]
  },
  {
    id: 'grade11ose',
    name: 'Grade 11 OSE',
    level: 'high',
    subjects: [
      { id: 'malagasy', name: 'Malagasy' },
      { id: 'english', name: 'English' },
      { id: 'french', name: 'French' },
      { id: 'history', name: 'History' },
      { id: 'geography', name: 'Geography' },
      { id: 'mathematics', name: 'Mathematics' },
      { id: 'physics', name: 'Physics' },
      { id: 'svt', name: 'SVT' },
      { id: 'ses', name: 'SES' },
      { id: 'eac', name: 'EAC' },
      { id: 'eps', name: 'EPS' },
      { id: 'philosophy', name: 'Philosophy' },
      { id: 'informatics', name: 'Informatics' },
    ]
  },{
    id: 'grade11s',
    name: 'Grade 11 S',
    level: 'high',
    subjects: [
      { id: 'malagasy', name: 'Malagasy' },
      { id: 'english', name: 'English' },
      { id: 'french', name: 'French' },
      { id: 'history', name: 'History' },
      { id: 'geography', name: 'Geography' },
      { id: 'mathematics', name: 'Mathematics' },
      { id: 'physics', name: 'Physics' },
      { id: 'svt', name: 'SVT' },
      { id: 'ses', name: 'SES' },
      { id: 'eac', name: 'EAC' },
      { id: 'eps', name: 'EPS' },
      { id: 'philosophy', name: 'Philosophy' },
      { id: 'informatics', name: 'Informatics' },
    ]
  },
  {
    id: 'grade12l',
    name: 'Grade 12 L',
    level: 'high',
    subjects: [
      { id: 'malagasy', name: 'Malagasy' },
      { id: 'english', name: 'English' },
      { id: 'french', name: 'French' },
      { id: 'history', name: 'History' },
      { id: 'geography', name: 'Geography' },
      { id: 'mathematics', name: 'Mathematics' },
      { id: 'physics', name: 'Physics' },
      { id: 'svt', name: 'SVT' },
      { id: 'ses', name: 'SES' },
      { id: 'eac', name: 'EAC' },
      { id: 'eps', name: 'EPS' },
      { id: 'philosophy', name: 'Philosophy' },
      { id: 'informatics', name: 'Informatics' },
    ]
  },
  {
    id: 'grade12ose',
    name: 'Grade 12 OSE',
    level: 'high',
    subjects: [
      { id: 'malagasy', name: 'Malagasy' },
      { id: 'english', name: 'English' },
      { id: 'french', name: 'French' },
      { id: 'history', name: 'History' },
      { id: 'geography', name: 'Geography' },
      { id: 'mathematics', name: 'Mathematics' },
      { id: 'physics', name: 'Physics' },
      { id: 'svt', name: 'SVT' },
      { id: 'ses', name: 'SES' },
      { id: 'eac', name: 'EAC' },
      { id: 'eps', name: 'EPS' },
      { id: 'philosophy', name: 'Philosophy' },
      { id: 'informatics', name: 'Informatics' },
    ]
  },{
    id: 'grade12s',
    name: 'Grade 12 S',
    level: 'high',
    subjects: [
      { id: 'malagasy', name: 'Malagasy' },
      { id: 'french', name: 'French' },
      { id: 'english', name: 'English' },
      { id: 'history', name: 'History' },
      { id: 'svt', name: 'SVT' },
      { id: 'physics', name: 'Physics' },
      { id: 'mathematics', name: 'Mathematics' },
      { id: 'ses', name: 'SES' },
      { id: 'philosophy', name: 'Philosophy' },
      { id: 'eps', name: 'EPS' },
      { id: 'informatics', name: 'Informatics' },
      { id: 'geography', name: 'Geography' },
      { id: 'eac', name: 'EAC' }
    ]
  },
];

export const getGradeById = (id: string): Grade | undefined => {
  const decodedId = decodeURIComponent(id).toLowerCase().replace(/\s+/g, '');
  return gradeData.find(grade => grade.id.toLowerCase() === decodedId);
};

export const getSubjectsByGradeId = (gradeId: string): Subject[] | undefined => {
  const grade = getGradeById(gradeId);
  return grade?.subjects;
}; 