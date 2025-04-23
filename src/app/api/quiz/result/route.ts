import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectDB from '@/lib/mongodb';
import QuizResult from '@/models/QuizResult';
import Analytics from '@/models/Analytics';

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
    
    const result = await QuizResult.create({
      ...data,
      userId: session.user.id,
    });

    // Record analytics
    await Analytics.create({
      userId: session.user.id,
      type: 'quiz_attempt',
      itemId: data.quizId,
      itemType: 'Quiz',
      duration: data.timeTaken,
      progress: 100,
      metadata: {
        score: data.score,
        totalQuestions: data.answers.length,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error saving quiz result:', error);
    return NextResponse.json(
      { error: 'Error saving quiz result' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const quizId = searchParams.get('quizId');

    await connectDB();
    
    const query = {
      userId: session.user.id,
      ...(quizId && { quizId }),
    };

    const results = await QuizResult.find(query)
      .populate('quizId')
      .sort({ submittedAt: -1 });

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching quiz results:', error);
    return NextResponse.json(
      { error: 'Error fetching quiz results' },
      { status: 500 }
    );
  }
} 