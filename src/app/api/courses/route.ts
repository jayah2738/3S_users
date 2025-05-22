import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { CourseContent } from '@/lib/cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import prisma from '@/lib/prisma';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET /api/courses?gradeId=xxx&subjectId=xxx
export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const gradeId = searchParams.get('gradeId');
  const subjectId = searchParams.get('subjectId');

  if (!gradeId || !subjectId) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  try {
    const courses = await prisma.course.findMany({
      where: {
        gradeId,
        subjectId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}

// POST /api/courses
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is super admin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (!user?.isSuperAdmin) {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 403 });
    }

    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const gradeId = formData.get('gradeId') as string;
    const subjectId = formData.get('subjectId') as string;
    const file = formData.get('file') as File;
    const type = formData.get('type') as 'video' | 'pdf';

    console.log('Received form data:', { title, description, gradeId, subjectId, type });

    if (!title || !gradeId || !subjectId || !file || !type) {
      console.error('Missing required fields:', { title, gradeId, subjectId, file: !!file, type });
      return NextResponse.json({ 
        error: 'Missing required fields',
        details: { title, gradeId, subjectId, file: !!file, type }
      }, { status: 400 });
    }

    // Convert file to base64
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const dataURI = `data:${file.type};base64,${base64}`;
    
    console.log('Uploading to Cloudinary...');
    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(dataURI, {
      resource_type: type === 'video' ? 'video' : 'raw',
      folder: `grades/${gradeId}/${subjectId}/${type}s`,
      public_id: `${Date.now()}-${file.name}`,
    });

    console.log('Cloudinary upload successful:', uploadResult.secure_url);

    // Create course in database
    const course = await prisma.course.create({
      data: {
        title,
        description,
        gradeId,
        subjectId,
        type,
        fileUrl: uploadResult.secure_url,
        cloudinaryId: uploadResult.public_id,
        createdBy: session.user.id,
      },
    });

    console.log('Course created in database:', course.id);
    
    const responseData = {
      id: course.id,
      title: course.title,
      description: course.description,
      type: course.type,
      fileUrl: course.fileUrl,
      gradeId: course.gradeId,
      subjectId: course.subjectId,
      createdAt: course.createdAt
    };

    console.log('Sending response:', responseData);
    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Detailed error in course upload:', error);
    const errorResponse = { 
      error: 'Failed to upload course',
      details: error instanceof Error ? error.message : 'Unknown error'
    };
    console.error('Sending error response:', errorResponse);
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

// DELETE /api/courses?id=xxx
export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check if user is super admin
  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  });

  if (!user?.isSuperAdmin) {
    return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing course ID' }, { status: 400 });
    }

    // Get course to delete
    const course = await prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Delete from Cloudinary
    if (course.cloudinaryId) {
      await cloudinary.uploader.destroy(course.cloudinaryId);
    }

    // Delete from database
    await prisma.course.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json(
      { error: 'Failed to delete course' },
      { status: 500 }
    );
  }
} 