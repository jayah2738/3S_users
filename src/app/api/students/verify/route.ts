import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { fullName, username, grade, gender } = await request.json();

    if (!fullName || !username || !grade || !gender) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Find student in database with case-insensitive matching
    const student = await prisma.student.findFirst({
      where: {
        OR: [
          {
            fullName: {
              contains: fullName.toLowerCase()
            },
            username: {
              contains: username.toLowerCase()
            },
            grade: {
              contains: grade.toLowerCase()
            },
            gender: {
              contains: gender.toLowerCase()
            }
          },
          {
            // Alternative matching with trimmed values
            fullName: {
              contains: fullName.trim().toLowerCase()
            },
            username: {
              contains: username.trim().toLowerCase()
            },
            grade: {
              contains: grade.trim().toLowerCase()
            },
            gender: {
              contains: gender.trim().toLowerCase()
            }
          }
        ]
      },
      include: {
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
        { 
          exists: false, 
          message: 'Student not found. Please verify your details and try again.' 
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        exists: true,
        message: 'Student verified successfully',
        student: {
          id: student.id,
          fullName: student.fullName,
          username: student.username,
          grade: student.grade,
          gender: student.gender,
          level: student.gradeRelation?.level
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error verifying student:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 