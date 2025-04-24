import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getCourses, createCourse, updateCourse, deleteCourse } from '@/lib/db/admin';

export async function GET(request: Request) {
  try {
    const adminCookie = cookies().get('admin');
    if (!adminCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const gradeId = searchParams.get('gradeId');

    const courses = await getCourses(gradeId || undefined);
    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
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

    const { name, description, gradeId } = await request.json();

    if (!name || !gradeId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const course = await createCourse(name, description, gradeId);
    return NextResponse.json(course);
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { error: 'Failed to create course' },
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
    const adminCookie = cookies().get('admin');
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