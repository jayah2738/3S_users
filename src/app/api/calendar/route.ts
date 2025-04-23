import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectDB from '@/lib/mongodb';
import Event from '@/models/Event';

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
    const data = await req.json();
    
    const event = await Event.create({
      ...data,
      createdBy: session.user.id,
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Error creating event' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const start = searchParams.get('start');
    const end = searchParams.get('end');
    const grade = searchParams.get('grade');

    await connectDB();
    
    const query = {
      ...(start && end && {
        startDate: { $gte: new Date(start) },
        endDate: { $lte: new Date(end) },
      }),
      ...(grade && { grade }),
    };

    const events = await Event.find(query)
      .populate('createdBy', 'username')
      .sort({ startDate: 1 });

    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Error fetching events' },
      { status: 500 }
    );
  }
} 