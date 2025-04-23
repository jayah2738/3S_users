import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { getServerSession } from 'next-auth/next';
import connectDB from '@/lib/mongodb';
import File from '@/models/File';

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const formData = await req.formData();
    const file = formData.get('video') as File;
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

    // Save file metadata to database
    const fileDoc = await File.create({
      title,
      filename,
      path: `${uploadPath}/${filename}`,
      type: 'video',
      grade,
      uploadedBy: session.user.id,
    });

    return NextResponse.json({
      message: 'Video uploaded successfully!',
      file: fileDoc
    });

  } catch (error) {
    console.error('Error in file upload:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
}

// Add GET method to retrieve videos
export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const grade = searchParams.get('grade');
    
    const query = grade ? { type: 'video', grade } : { type: 'video' };
    const files = await File.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json(files);
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { error: 'Error fetching videos' },
      { status: 500 }
    );
  }
}

// Add DELETE method
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const fileId = searchParams.get('id');

    if (!fileId) {
      return NextResponse.json(
        { error: 'File ID is required' },
        { status: 400 }
      );
    }

    await connectDB();
    const file = await File.findByIdAndDelete(fileId);

    if (!file) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    // You might want to also delete the physical file here
    // fs.unlinkSync(path.join(process.cwd(), file.path));

    return NextResponse.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json(
      { error: 'Error deleting file' },
      { status: 500 }
    );
  }
}
