import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
      name?: string;
      email?: string;
      image?: string;
      fullName?: string;
      grade?: string;
      level?: string;
      isSuperAdmin?: boolean;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    name: string;
    role: string;
    fullName?: string;
    grade?: string;
    level?: string;
    isSuperAdmin?: boolean;
  }
} 