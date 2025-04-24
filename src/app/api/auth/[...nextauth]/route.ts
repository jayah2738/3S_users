import NextAuth from 'next-auth';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        adminCode: { label: "Admin Code", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Please enter username and password');
        }

        await connectDB();

        // Check if this is an admin login attempt
        if (credentials.adminCode) {
          if (credentials.adminCode !== "0000") {
            throw new Error('Invalid admin code');
          }
          // Create or find admin user
          let admin = await User.findOne({ username: credentials.username, role: 'admin' });
          if (!admin) {
            admin = await User.create({
              username: credentials.username,
              password: credentials.password,
              role: 'admin'
            });
          }
          return {
            id: admin._id.toString(),
            name: admin.username,
            role: 'admin',
          };
        }

        // Regular user login
        const user = await User.findOne({ username: credentials.username });
        if (!user) {
          throw new Error('No user found with this username');
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        return {
          id: user._id.toString(),
          name: user.username,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 