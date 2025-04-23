import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectDB from '@/lib/mongodb';
import Analytics from '@/models/Analytics';
import { startOfDay, subDays } from 'date-fns';

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
    const timeRange = searchParams.get('timeRange') || 'week';
    
    await connectDB();

    const startDate = startOfDay(
      timeRange === 'year'
        ? subDays(new Date(), 365)
        : timeRange === 'month'
        ? subDays(new Date(), 30)
        : subDays(new Date(), 7)
    );

    const [dailyActiveUsers, contentEngagement, quizResults, progressData] =
      await Promise.all([
        Analytics.aggregate([
          {
            $match: {
              timestamp: { $gte: startDate },
              type: 'user_activity',
            },
          },
          {
            $group: {
              _id: {
                $dateToString: { format: '%Y-%m-%d', date: '$timestamp' },
              },
              count: { $addToSet: '$userId' },
            },
          },
          {
            $project: {
              _id: 0,
              date: '$_id',
              count: { $size: '$count' },
            },
          },
          { $sort: { date: 1 } },
        ]),

        Analytics.aggregate([
          {
            $match: {
              timestamp: { $gte: startDate },
              type: { $in: ['video_watch', 'quiz_attempt', 'assignment_submit'] },
            },
          },
          {
            $group: {
              _id: '$type',
              count: { $sum: 1 },
            },
          },
        ]),

        Analytics.aggregate([
          {
            $match: {
              timestamp: { $gte: startDate },
              type: 'quiz_attempt',
            },
          },
          {
            $group: {
              _id: '$metadata.grade',
              averageScore: { $avg: '$metadata.score' },
            },
          },
          { $sort: { _id: 1 } },
        ]),

        Analytics.aggregate([
          {
            $match: {
              timestamp: { $gte: startDate },
              type: 'progress_update',
            },
          },
          {
            $group: {
              _id: {
                $dateToString: { format: '%Y-%m-%d', date: '$timestamp' },
              },
              averageProgress: { $avg: '$metadata.progress' },
            },
          },
          { $sort: { _id: 1 } },
        ]),
      ]);

    return NextResponse.json({
      dailyActiveUsers: dailyActiveUsers.map((d) => d.count),
      contentEngagement: {
        videos: contentEngagement.find((c) => c._id === 'video_watch')?.count || 0,
        quizzes: contentEngagement.find((c) => c._id === 'quiz_attempt')?.count || 0,
        assignments: contentEngagement.find((c) => c._id === 'assignment_submit')?.count || 0,
      },
      quizResults: quizResults.map((r) => ({
        grade: r._id,
        averageScore: Math.round(r.averageScore * 100) / 100,
      })),
      progressData: progressData.map((p) => ({
        date: p._id,
        completionRate: Math.round(p.averageProgress * 100) / 100,
      })),
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Error fetching analytics' },
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

    const analytics = await Analytics.create({
      ...data,
      userId: session.user.id,
      timestamp: new Date(),
    });

    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Error recording analytics:', error);
    return NextResponse.json(
      { error: 'Error recording analytics' },
      { status: 500 }
    );
  }
} 