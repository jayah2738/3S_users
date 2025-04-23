import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { writeFile } from 'fs/promises';
import path from 'path';
import connectDB from '@/lib/mongodb';
import Message from '@/models/Message';

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const receiver = formData.get('receiver') as string;
    const type = formData.get('type') as 'file' | 'image';

    if (!file || !receiver) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'chat');
    const filepath = path.join(uploadDir, filename);

    await writeFile(filepath, buffer);

    await connectDB();
    const message = await Message.create({
      sender: session.user.id,
      receiver,
      type,
      content: file.name,
      fileUrl: `/uploads/chat/${filename}`,
    });

    await message.populate('sender', 'username');

    return NextResponse.json(message);
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
} 