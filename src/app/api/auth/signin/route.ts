import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { compare } from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { username, password, grade } = await request.json();

    if (!username || !password || !grade) {
      return NextResponse.json(
        { error: 'Username, password, and grade are required' },
        { status: 400 }
      );
    }

    // Normalize inputs
    const normalizedUsername = username.toLowerCase().trim();
    const normalizedGrade = grade.toLowerCase().trim();

    // Check if the student exists and is active
    const student = await prisma.student.findFirst({
      where: {
        username: {
          contains: normalizedUsername
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
        fullName: true,
        username: true,
        gradeRelation: {
          select: {
            id: true,
            name: true,
            level: true
          }
        }
      }
    });

    if (!student) {
      return NextResponse.json(
        { error: 'Student not found. Please verify your details and try again.' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await compare(password, student.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    // Update last login
    await prisma.student.update({
      where: { id: student.id },
      data: { lastLogin: new Date() }
    });

    // Create or update user record
    const user = await prisma.user.upsert({
      where: { username: student.username },
      update: {
        password: student.password // Keep password in sync
      },
      create: {
        username: student.username,
        password: student.password,
        role: 'USER'
      }
    });

    return NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        fullName: student.fullName,
        grade: student.gradeRelation.name,
        level: student.gradeRelation.level
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Failed to login. Please try again.' },
      { status: 500 }
    );
  }
} 