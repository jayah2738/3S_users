import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db/db';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { mkdir } from 'fs/promises';

export async function POST(req: NextRequest) {
  try {
    // Verify admin authentication
    const adminName = cookies().get('adminName')?.value;
    const isAdmin = cookies().get('isAdmin')?.value === 'true';

    if (!adminName || !isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const gradeId = formData.get('gradeId') as string;
    const type = formData.get('type') as 'video' | 'pdf';

    if (!file || !title || !description || !gradeId || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate file type and size
    const maxSize = type === 'video' ? 100 * 1024 * 1024 : 10 * 1024 * 1024; // 100MB for videos, 10MB for PDFs
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File size exceeds limit (${type === 'video' ? '100MB' : '10MB'})` },
        { status: 400 }
      );
    }

    // Create upload directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', 'uploads', gradeId, type);
    await mkdir(uploadDir, { recursive: true });

    // Generate unique filename
    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const filename = `${title.toLowerCase().replace(/\s+/g, '-')}-${timestamp}.${extension}`;
    const filePath = join(uploadDir, filename);

    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Save to database
    const material = await prisma.material.create({
      data: {
        title,
        description,
        filePath: `/uploads/${gradeId}/${type}/${filename}`,
        type,
        gradeId,
        uploadedBy: adminName,
      },
    });

    return NextResponse.json(
      { success: true, material },
      { status: 201 }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload material' },
      { status: 500 }
    );
  }
} 