import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const [parentMessages, studentMessages] = await Promise.all([
      prisma.message.findMany({
        where: { type: 'parent' },
        orderBy: { timestamp: 'desc' }
      }),
      prisma.message.findMany({
        where: { type: 'student' },
        orderBy: { timestamp: 'desc' }
      })
    ]);

    return NextResponse.json({ parentMessages, studentMessages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { content, type } = await request.json();
    
    if (!content || !type) {
      return NextResponse.json({ error: 'Content and type are required' }, { status: 400 });
    }

    const message = await prisma.message.create({
      data: {
        content,
        type,
        sender: '3S Admin',
        timestamp: new Date()
      }
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json({ error: 'Failed to create message' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, content } = await request.json();
    
    if (!id || !content) {
      return NextResponse.json({ error: 'ID and content are required' }, { status: 400 });
    }

    const message = await prisma.message.update({
      where: { id },
      data: { content }
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await prisma.message.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
} 