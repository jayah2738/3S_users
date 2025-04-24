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
    const subject = searchParams.get('subject');
    const lessonType = searchParams.get('lessonType');
    const search = searchParams.get('search');

    const materials = await prisma.material.findMany({
      where: {
        grade: {
          ...(level ? { level } : {}),
          ...(gradeId ? { id: gradeId } : {}),
        },
        ...(subject ? { subject } : {}),
        ...(lessonType ? { lessonType } : {}),
        ...(search ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
            { subject: { contains: search, mode: 'insensitive' } },
          ],
        } : {}),
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
        { subject: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    return NextResponse.json(materials);
  } catch (error) {
    console.error('Error fetching materials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch materials' },
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

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const gradeId = formData.get('gradeId') as string;
    const subject = formData.get('subject') as string;
    const lessonType = formData.get('lessonType') as 'lesson' | 'exercise';

    if (!file || !title || !description || !gradeId || !subject || !lessonType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Upload file to storage service (e.g., AWS S3, Cloudinary)
    // For now, we'll just store the file name
    const fileUrl = `https://storage.example.com/${file.name}`;

    const material = await prisma.material.create({
      data: {
        title,
        description,
        type: file.type.startsWith('video/') ? 'video' : 'pdf',
        fileUrl,
        gradeId,
        subject,
        lessonType,
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

    return NextResponse.json(material);
  } catch (error) {
    console.error('Error creating material:', error);
    return NextResponse.json(
      { error: 'Failed to create material' },
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
        { error: 'Material ID is required' },
        { status: 400 }
      );
    }

    // TODO: Delete file from storage service
    await prisma.material.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting material:', error);
    return NextResponse.json(
      { error: 'Failed to delete material' },
      { status: 500 }
    );
  }
} 