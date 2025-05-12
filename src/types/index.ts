export interface Grade {
  id: string;
  name: string;
  level: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Student {
  id: string;
  fullName: string;
  username: string;
  level: string;
  grade: string;
  gender: string;
  password: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  gradeRelation: {
    id: string;
    name: string;
    level: string | null;
  };
} 