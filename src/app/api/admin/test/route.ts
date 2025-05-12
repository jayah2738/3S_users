import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const grades = await prisma.grade.findMany();
    const admin = await prisma.admin.findMany();
    
    return NextResponse.json({
      grades,
      admin,
      databaseUrl: process.env.DATABASE_URL
    });
  } catch (error) {
    console.error('Test error:', error);
    return NextResponse.json(
      { error: 'Test failed', details: error },
      { status: 500 }
    );
  }
} 