import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectDB from '@/lib/mongodb';
import Progress from '@/models/Progress';

export async function GET(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const progress = await Progress.find({ userId: session.user.id })
      .populate('fileId')
      .sort({ lastAccessed: -1 });

    return NextResponse.json(progress);
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json(
      { error: 'Error fetching progress' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await req.json();
    await connectDB();

    const progress = await Progress.findOneAndUpdate(
      {
        userId: session.user.id,
        fileId: data.fileId,
      },
      {
        $set: {
          status: data.status,
          progress: data.progress,
          lastAccessed: new Date(),
          ...(data.status === 'completed' ? { completedAt: new Date() } : {}),
          ...(data.notes ? { notes: data.notes } : {}),
        },
      },
      { new: true, upsert: true }
    );

    return NextResponse.json(progress);
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json(
      { error: 'Error updating progress' },
      { status: 500 }
    );
  }
} 