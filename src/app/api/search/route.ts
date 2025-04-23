import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import File from '@/models/File';
import Announcement from '@/models/Announcement';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');
    const type = searchParams.get('type');
    const grade = searchParams.get('grade');

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    await connectDB();

    const searchRegex = new RegExp(query, 'i');
    let results = [];

    if (!type || type === 'files') {
      const fileQuery = {
        $or: [
          { title: searchRegex },
          { type: searchRegex },
        ],
      };
      
      if (grade) {
        fileQuery['grade'] = grade;
      }

      const files = await File.find(fileQuery).limit(20);
      results = [...results, ...files];
    }

    if (!type || type === 'announcements') {
      const announcementQuery = {
        $or: [
          { title: searchRegex },
          { content: searchRegex },
          { type: searchRegex },
        ],
      };

      if (grade) {
        announcementQuery['targetGrade'] = grade;
      }

      const announcements = await Announcement.find(announcementQuery).limit(20);
      results = [...results, ...announcements];
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Error performing search' },
      { status: 500 }
    );
  }
} 