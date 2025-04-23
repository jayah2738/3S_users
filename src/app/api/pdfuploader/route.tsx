import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('pdf') as File;
    const title = formData.get('title') as string;
    const grade = formData.get('grade') as string;
    const uploadPath = formData.get('path') as string;

    if (!file || !title || !grade) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create unique filename
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${file.name}`;
    const filepath = path.join(process.cwd(), uploadPath, filename);

    // Ensure directory exists
    const dir = path.dirname(filepath);
    await writeFile(`${dir}/.keep`, '');

    // Save file
    await writeFile(filepath, buffer);

    // Here you would typically save the metadata to your database
    // For now, we'll just return success
    return NextResponse.json({
      message: 'PDF uploaded successfully!',
      file: {
        title,
        grade,
        path: `${uploadPath}/${filename}`,
        type: 'pdf'
      }
    });

  } catch (error) {
    console.error('Error in file upload:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
} 