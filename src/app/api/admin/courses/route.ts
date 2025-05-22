import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getCourses, createCourse, updateCourse, deleteCourse } from '@/lib/db/admin';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify if user is admin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    });

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const gradeId = searchParams.get('gradeId');

    try {
      const courses = await getCourses(gradeId || undefined);
      return NextResponse.json(courses);
    } catch (error) {
      console.error('Error in getCourses:', error);
      return NextResponse.json(
        { error: 'Failed to fetch courses', details: error instanceof Error ? error.message : 'Unknown error' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in GET handler:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    // Check admin authentication
    const adminCookie = request.headers.get('cookie')?.split(';')
      .find(c => c.trim().startsWith('admin='));
    
    if (!adminCookie || adminCookie.split('=')[1] !== 'true') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const gradeId = formData.get('gradeId') as string;
    const subjectId = formData.get('subjectId') as string;
    const file = formData.get('file') as File;
    const type = formData.get('type') as 'video' | 'pdf';

    console.log('Received form data:', { title, description, gradeId, subjectId, type, fileSize: file?.size });

    if (!title || !gradeId || !subjectId || !file || !type) {
      console.error('Missing required fields:', { title, gradeId, subjectId, file: !!file, type });
      return NextResponse.json(
        { error: 'Missing required fields', details: { title, gradeId, subjectId, file: !!file, type } },
        { status: 400 }
      );
    }

    try {
      const course = await createCourse(title, description, gradeId, subjectId, file, type, session.user.id);
      return NextResponse.json(course);
    } catch (error) {
      console.error('Error in createCourse:', error);
      return NextResponse.json(
        { error: 'Failed to create course', details: error instanceof Error ? error.message : 'Unknown error' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json(
      { error: 'Failed to create course', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const adminCookie = (await cookies()).get('admin');
    if (!adminCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, name, description, isActive } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Missing course ID' },
        { status: 400 }
      );
    }

    const course = await updateCourse(id, { name, description, isActive });
    return NextResponse.json(course);
  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json(
      { error: 'Failed to update course' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const adminCookie = (await cookies()).get('admin');
    if (!adminCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Missing course ID' },
        { status: 400 }
      );
    }

    await deleteCourse(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json(
      { error: 'Failed to delete course' },
      { status: 500 }
    );
  }
} 