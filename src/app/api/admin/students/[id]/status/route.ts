import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getToken } from 'next-auth/jwt';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated and is an admin
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is super admin (haja)
    const isSuperAdmin = (session.user as any).isSuperAdmin;
    if (!isSuperAdmin) {
      return NextResponse.json({ 
        error: "Only super admin can modify student status" 
      }, { status: 403 });
    }

    const { id } = params;
    const { isActive } = await request.json();

    // Find the student to get their username and password
    const student = await prisma.student.findUnique({
      where: { id },
      select: { 
        username: true,
        password: true,
        isActive: true
      }
    });

    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }

    // If student is currently active and we're deactivating them
    if (student.isActive && !isActive) {
      // Delete the user record to prevent login
      await prisma.user.delete({
        where: { username: student.username }
      });

      // Update the student's status
      await prisma.student.update({
        where: { id },
        data: { isActive: false }
      });

      // Create a response with the deactivation message
      const response = NextResponse.json({ 
        message: 'Student deactivated successfully',
        action: 'deactivate',
        username: student.username
      });

      // Set a cookie to trigger client-side sign-out
      response.cookies.set({
        name: 'force_signout',
        value: student.username,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 // 1 minute
      });

      return response;
    } 
    // If student is inactive and we're activating them
    else if (!student.isActive && isActive) {
      // Create a new user record
      await prisma.user.create({
        data: {
          username: student.username,
          password: student.password,
          role: 'USER'
        }
      });

      // Update the student's status
      await prisma.student.update({
        where: { id },
        data: { isActive: true }
      });

      return NextResponse.json({ 
        message: 'Student activated successfully',
        action: 'activate'
      });
    }

    return NextResponse.json({ 
      message: 'Student status unchanged',
      action: 'unchanged'
    });
  } catch (error) {
    console.error('Error updating student status:', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update student status' },
      { status: 500 }
    );
  }
} 