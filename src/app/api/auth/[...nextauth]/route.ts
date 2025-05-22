import NextAuth from 'next-auth';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

// Extend the User type to include our custom fields
declare module "next-auth" {
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

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        grade: { label: "Grade", type: "text" }
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Please enter username and password');
        }

        // Check for super admin (haja)
        if (credentials.username === "haja" && credentials.password === "justletitbe") {
          let admin = await prisma.user.findFirst({ 
            where: { 
              username: "haja",
              role: 'ADMIN'
            }
          });
          if (!admin) {
            admin = await prisma.user.create({
              data: {
                username: "haja",
                password: await bcrypt.hash("justletitbe", 10),
                role: 'ADMIN',
                isSuperAdmin: true
              }
            });
          }
          return {
            id: admin.id,
            name: admin.username,
            role: admin.role,
            isSuperAdmin: true
          };
        }

        // Check for regular admin login
        if (credentials.password === "2043") {
          let admin = await prisma.user.findFirst({ 
            where: { 
              username: credentials.username,
              role: 'ADMIN'
            }
          });
          if (!admin) {
            admin = await prisma.user.create({
              data: {
                username: credentials.username,
                password: await bcrypt.hash(credentials.password, 10),
                role: 'ADMIN'
              }
            });
          }
          return {
            id: admin.id,
            name: admin.username,
            role: admin.role,
            isSuperAdmin: false
          };
        }

        // Regular student login
        if (!credentials.grade) {
          throw new Error('Please enter your grade');
        }

        // Normalize inputs
        const normalizedUsername = credentials.username.toLowerCase().trim();
        const normalizedGrade = credentials.grade.toLowerCase().trim();

        console.log('Attempting login with:', {
          username: normalizedUsername,
          grade: normalizedGrade,
          password: credentials.password
        });

        // First try exact match
        let student = await prisma.student.findFirst({
          where: {
            username: {
              equals: normalizedUsername
            },
            gradeRelation: {
              name: {
                contains: normalizedGrade
              }
            },
            isActive: true
          },
          select: {
            id: true,
            password: true,
            username: true,
            fullName: true,
            gradeRelation: {
              select: {
                id: true,
                name: true,
                level: true
              }
            }
          }
        });

        // If not found, try with "Grade" prefix
        if (!student) {
          const gradeWithPrefix = `Grade ${normalizedGrade.replace('grade', '').trim()}`;
          console.log('Trying with grade prefix:', gradeWithPrefix);
          
          student = await prisma.student.findFirst({
            where: {
              username: {
                equals: normalizedUsername
              },
              gradeRelation: {
                name: {
                  contains: gradeWithPrefix
                }
              },
              isActive: true
            },
            select: {
              id: true,
              password: true,
              username: true,
              fullName: true,
              gradeRelation: {
                select: {
                  id: true,
                  name: true,
                  level: true
                }
              }
            }
          });
        }

        if (!student) {
          console.log('Student not found');
          throw new Error('Student not found. Please verify your details and try again.');
        }

        console.log('Found student:', {
          id: student.id,
          username: student.username,
          grade: student.gradeRelation.name,
          storedPasswordHash: student.password
        });

        // Get the user record
        const user = await prisma.user.findUnique({
          where: { username: student.username }
        });

        if (!user) {
          console.log('User record not found');
          throw new Error('User record not found');
        }

        console.log('Found user:', {
          id: user.id,
          username: user.username,
          storedPasswordHash: user.password
        });

        // Try comparing with both passwords
        const isStudentPasswordValid = await bcrypt.compare(
          credentials.password.trim(),
          student.password
        );

        const isUserPasswordValid = await bcrypt.compare(
          credentials.password.trim(),
          user.password
        );

        console.log('Password validation details:', {
          providedPassword: credentials.password.trim(),
          studentPasswordHash: student.password,
          userPasswordHash: user.password,
          isStudentPasswordValid,
          isUserPasswordValid
        });

        if (!isStudentPasswordValid && !isUserPasswordValid) {
          throw new Error('Invalid password');
        }

        // If passwords don't match, update the one that's wrong
        if (isStudentPasswordValid && !isUserPasswordValid) {
          await prisma.user.update({
            where: { username: student.username },
            data: { password: student.password }
          });
        } else if (isStudentPasswordValid && !isUserPasswordValid) {
          await prisma.student.update({
            where: { id: student.id },
            data: { password: student.password }
          });
        }

        return {
          id: user.id,
          name: user.username,
          role: user.role,
          fullName: student.fullName,
          grade: student.gradeRelation.name,
          level: student.gradeRelation.level,
          isSuperAdmin: user.isSuperAdmin
        };
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.fullName = user.fullName;
        token.grade = user.grade;
        token.level = user.level;
        token.isSuperAdmin = user.isSuperAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).name = token.name;
        (session.user as any).fullName = token.fullName;
        (session.user as any).grade = token.grade;
        (session.user as any).level = token.level;
        (session.user as any).isSuperAdmin = token.isSuperAdmin;
      }
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      if (user.role === 'ADMIN') {
        const response = new Response(null, {
          status: 200,
          headers: {
            'Set-Cookie': `admin=true; Path=/; HttpOnly; SameSite=Lax`
          }
        });
        return response;
      }
    },
    async signOut() {
      cookies().set('admin', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 0
      });
    }
  },
  debug: true, // Enable debug mode
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 