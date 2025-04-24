import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getGrades, createGrade, initializeGrades } from '@/lib/db/admin';

export async function GET() {
  try {
    const adminCookie = cookies().get('admin');
    if (!adminCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const grades = await getGrades();
    return NextResponse.json(grades);
  } catch (error) {
    console.error('Error fetching grades:', error);
    return NextResponse.json(
      { error: 'Failed to fetch grades' },
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

    const { name, level, description } = await request.json();

    if (!name || !level) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const grade = await createGrade(name, level, description);
    return NextResponse.json(grade);
  } catch (error) {
    console.error('Error creating grade:', error);
    return NextResponse.json(
      { error: 'Failed to create grade' },
      { status: 500 }
    );
  }
}

export async function PUT() {
  try {
    const adminCookie = cookies().get('admin');
    if (!adminCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await initializeGrades();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error initializing grades:', error);
    return NextResponse.json(
      { error: 'Failed to initialize grades' },
      { status: 500 }
    );
  }
} 