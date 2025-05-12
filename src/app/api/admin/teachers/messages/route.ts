import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    console.log('Fetching messages...');
    
    // Check admin authentication from Authorization header
    const authHeader = request.headers.get('Authorization');
    console.log('Auth header:', authHeader);
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Unauthorized: No valid Authorization header');
      return NextResponse.json({ error: 'Unauthorized: No valid Authorization header' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      console.log('Unauthorized: No token provided');
      return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
    }

    try {
      const messages = await prisma.message.findMany({
        where: {
          type: 'admin'
        },
        orderBy: {
          timestamp: 'desc'
        }
      });

      console.log('Successfully fetched messages:', messages.length);
      return NextResponse.json(messages);
    } catch (dbError) {
      console.error('Database error fetching messages:', dbError);
      return NextResponse.json(
        { error: 'Database error while fetching messages' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in GET handler:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Check admin authentication
    const adminCookie = request.headers.get('cookie')?.split(';')
      .find(c => c.trim().startsWith('admin='));
    
    if (!adminCookie || adminCookie.split('=')[1] !== 'true') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    console.log('Received request body:', body);

    const { content, sender, type } = body;

    if (!content || !sender || !type) {
      console.log('Missing required fields:', { content, sender, type });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    try {
      // Create the message with only required fields
      const message = await prisma.message.create({
        data: {
          content,
          sender,
          type,
          timestamp: new Date()
        }
      });

      console.log('Successfully created message:', message);
      return NextResponse.json(message);
    } catch (dbError) {
      console.error('Database error creating message:', dbError);
      return NextResponse.json(
        { error: 'Database error while creating message' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json(
      { error: 'Failed to create message' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    // Check admin authentication
    const adminCookie = request.headers.get('cookie')?.split(';')
      .find(c => c.trim().startsWith('admin='));
    
    if (!adminCookie || adminCookie.split('=')[1] !== 'true') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(request.url);
    const messageId = url.pathname.split('/').pop();
    const body = await request.json();
    const { content } = body;

    if (!content) {
      return NextResponse.json(
        { error: 'Missing content field' },
        { status: 400 }
      );
    }

    const message = await prisma.message.update({
      where: { id: messageId },
      data: {
        content,
        updatedAt: new Date()
      }
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json(
      { error: 'Failed to update message' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    // Check admin authentication
    const adminCookie = request.headers.get('cookie')?.split(';')
      .find(c => c.trim().startsWith('admin='));
    
    if (!adminCookie || adminCookie.split('=')[1] !== 'true') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(request.url);
    const messageId = url.pathname.split('/').pop();

    await prisma.message.delete({
      where: { id: messageId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json(
      { error: 'Failed to delete message' },
      { status: 500 }
    );
  }
} 