import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hash } from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { username, password, grade, gender, fullName } = await request.json();

    if (!username || !password || !grade || !gender || !fullName) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if the student exists in the database
    const existingStudent = await prisma.student.findFirst({
      where: { 
        OR: [
          {
            username: {
              contains: username.toLowerCase()
            },
            grade: {
              contains: grade.toLowerCase()
            },
            gender: {
              contains: gender.toLowerCase()
            },
            fullName: {
              contains: fullName.toLowerCase()
            }
          },
          {
            username: {
              contains: username.trim().toLowerCase()
            },
            grade: {
              contains: grade.trim().toLowerCase()
            },
            gender: {
              contains: gender.trim().toLowerCase()
            },
            fullName: {
              contains: fullName.trim().toLowerCase()
            }
          }
        ]
      },
      select: {
        id: true,
        password: true,
        isActive: true,
        gradeRelation: {
          select: {
            id: true
          }
        }
      }
    });

    if (!existingStudent) {
      return NextResponse.json(
        { error: 'Student not found. Please verify your details and try again.' },
        { status: 404 }
      );
    }

    if (!existingStudent.isActive) {
      return NextResponse.json(
        { error: 'Your account is not active. Please contact your administrator.' },
        { status: 403 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { username }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create user with the hashed password
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: 'USER'
      }
    });

    // Update student's password
    await prisma.student.update({
      where: { id: existingStudent.id },
      data: { password: hashedPassword }
    });

    return NextResponse.json({
      message: 'User created successfully',
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
} 