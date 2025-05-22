import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hash } from 'bcryptjs';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const level = searchParams.get('level');
    const gradeId = searchParams.get('gradeId');

    // First, get all students from the Student table
    const students = await prisma.student.findMany({
      where: {
        ...(level && { level }),
        ...(gradeId && { gradeId }),
      },
      include: {
        gradeRelation: {
          select: {
            id: true,
            name: true,
            level: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Get all users with role 'USER' (students)
    const users = await prisma.user.findMany({
      where: {
        role: 'USER'
      },
      select: {
        id: true,
        username: true,
        createdAt: true,
        updatedAt: true
      }
    });

    // Combine the data
    const combinedStudents = students.map(student => ({
      ...student,
      isActive: true, // All students in the new schema are active
      lastLogin: student.lastLogin || null
    }));

    // Add any users that don't have corresponding student records
    const existingUsernames = new Set(students.map(s => s.username));
    const additionalStudents = users
      .filter(user => !existingUsernames.has(user.username))
      .map(user => ({
        id: user.id,
        fullName: user.username, // Use username as fullName if not available
        username: user.username,
        level: 'Not Set',
        grade: 'Not Set',
        gender: 'Not Set',
        gradeRelation: {
          id: '',
          name: 'Not Set',
          level: null
        },
        lastLogin: null,
        isActive: true,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }));

    // Sort all students by creation date (newest first)
    const allStudents = [...combinedStudents, ...additionalStudents].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json(allStudents);
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, username, level, grade, gender, password } = data;

    // Validate required fields
    if (!name || !username || !level || !grade || !gender || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if username already exists
    const existingStudent = await prisma.student.findUnique({
      where: { username }
    });

    const existingUser = await prisma.user.findUnique({
      where: { username }
    });

    if (existingStudent || existingUser) {
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 400 }
      );
    }

    // Find or create the grade
    let gradeRecord = await prisma.grade.findFirst({
      where: {
        name: grade,
        level: level
      }
    });

    if (!gradeRecord) {
      gradeRecord = await prisma.grade.create({
        data: {
          name: grade.trim(),
          level: level.trim(),
          description: `Grade ${grade} for ${level} level`
        }
      });
    }

    // Hash the password
    const hashedPassword = await hash(password.trim(), 10);
    console.log('Creating student with password:', {
      username,
      originalPassword: password,
      hashedPassword
    });

    // Create new student
    const student = await prisma.student.create({
      data: {
        fullName: name.trim(),
        username: username.trim().toLowerCase(),
        level: level.trim(),
        grade: grade.trim(),
        gender: gender.trim(),
        password: hashedPassword,
        gradeId: gradeRecord.id
      },
      include: {
        gradeRelation: {
          select: {
            id: true,
            name: true,
            level: true,
          },
        },
      }
    });

    // Create corresponding user record with the same hashed password
    const user = await prisma.user.create({
      data: {
        username: student.username,
        password: hashedPassword,
        role: 'USER'
      }
    });

    console.log('Created records:', {
      student: {
        id: student.id,
        username: student.username,
        password: student.password
      },
      user: {
        id: user.id,
        username: user.username,
        password: user.password
      }
    });

    // Return the created student without password
    const { password: _, ...studentWithoutPassword } = student;
    return NextResponse.json(studentWithoutPassword, { status: 201 });
  } catch (error) {
    console.error('Error creating student:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create student' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, name, level, grade, gender, password } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Student ID is required' },
        { status: 400 }
      );
    }

    // Find the student
    const existingStudent = await prisma.student.findUnique({
      where: { id }
    });

    if (!existingStudent) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }

    // Find or create the grade
    let gradeRecord = await prisma.grade.findFirst({
      where: {
        name: grade,
        level: level
      }
    });

    if (!gradeRecord) {
      gradeRecord = await prisma.grade.create({
        data: {
          name: grade.trim(),
          level: level.trim(),
          description: `Grade ${grade} for ${level} level`
        }
      });
    }

    // Hash the password if it's being updated
    let hashedPassword = existingStudent.password;
    if (password) {
      hashedPassword = await hash(password.trim(), 10);
      console.log('Updated password for student:', {
        id,
        username: existingStudent.username,
        newHashedPassword: hashedPassword
      });

      // Update user record with new password
      await prisma.user.update({
        where: { username: existingStudent.username },
        data: { password: hashedPassword }
      });
    }

    // Update student
    const updatedStudent = await prisma.student.update({
      where: { id },
      data: {
        fullName: name?.trim() || existingStudent.fullName,
        level: level?.trim() || existingStudent.level,
        grade: grade?.trim() || existingStudent.grade,
        gender: gender?.trim() || existingStudent.gender,
        password: hashedPassword,
        gradeId: gradeRecord.id
      },
      include: {
        gradeRelation: {
          select: {
            id: true,
            name: true,
            level: true,
          },
        },
      }
    });

    // Return the updated student without password
    const { password: _, ...studentWithoutPassword } = updatedStudent;
    return NextResponse.json(studentWithoutPassword);
  } catch (error) {
    console.error('Error updating student:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update student' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Student ID is required' },
        { status: 400 }
      );
    }

    await prisma.student.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting student:', error);
    return NextResponse.json(
      { error: 'Failed to delete student' },
      { status: 500 }
    );
  }
} 