import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db/db';

export async function GET(request: Request) {
  try {
    const adminCookie = cookies().get('admin');
    if (!adminCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const level = searchParams.get('level');
    const gradeId = searchParams.get('gradeId');

    const students = await prisma.student.findMany({
      where: {
        grade: {
          ...(level ? { level } : {}),
          ...(gradeId ? { id: gradeId } : {}),
        },
      },
      include: {
        grade: {
          select: {
            id: true,
            name: true,
            level: true,
          },
        },
      },
      orderBy: [
        { grade: { level: 'asc' } },
        { grade: { name: 'asc' } },
        { username: 'asc' },
      ],
    });

    return NextResponse.json(students);
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
    const adminCookie = cookies().get('admin');
    if (!adminCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { username, password, gradeId } = await request.json();

    if (!username || !password || !gradeId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const student = await prisma.student.create({
      data: {
        username,
        password,
        gradeId,
      },
      include: {
        grade: {
          select: {
            id: true,
            name: true,
            level: true,
          },
        },
      },
    });

    return NextResponse.json(student);
  } catch (error) {
    console.error('Error creating student:', error);
    return NextResponse.json(
      { error: 'Failed to create student' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const adminCookie = cookies().get('admin');
    if (!adminCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, isActive } = await request.json();

    if (!id || typeof isActive !== 'boolean') {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const student = await prisma.student.update({
      where: { id },
      data: { isActive },
      include: {
        grade: {
          select: {
            id: true,
            name: true,
            level: true,
          },
        },
      },
    });

    return NextResponse.json(student);
  } catch (error) {
    console.error('Error updating student status:', error);
    return NextResponse.json(
      { error: 'Failed to update student status' },
      { status: 500 }
    );
  }
} 