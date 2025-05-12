import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getGrades, createGrade, initializeGrades } from '@/lib/db/admin';
import prisma from '@/lib/prisma';

const DEFAULT_GRADES = [
  // Preschool
  { name: 'TPS', level: 'preschool' },
  { name: 'PS', level: 'preschool' },
  { name: 'MS', level: 'preschool' },
  { name: 'GS', level: 'preschool' },
  
  // Primary School
  { name: 'Grade 1', level: 'primary' },
  { name: 'Grade 2', level: 'primary' },
  { name: 'Grade 3', level: 'primary' },
  { name: 'Grade 4', level: 'primary' },
  { name: 'Grade 5', level: 'primary' },
  
  // Middle School
  { name: 'Grade 6', level: 'middle' },
  { name: 'Grade 7', level: 'middle' },
  { name: 'Grade 8', level: 'middle' },
  
  // High School
  { name: 'Grade 9', level: 'high' },
  { name: 'Grade 10', level: 'high' },
  { name: 'Grade 11', level: 'high' },
  { name: 'Grade 12', level: 'high' }
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const level = searchParams.get('level');

    // Define the order for each level
    const levelOrder = {
      preschool: ['TPS', 'PS', 'MS', 'GS'],
      primary: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'],
      middle: ['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9'],
      high: ['Grade 10', 'Grade 11 L', 'Grade 11 S', 'Grade 11 OSE', 'Grade 12 L', 'Grade 12 S', 'Grade 12 OSE']
    };

    // Build the where clause
    const where: any = {};
    if (level) {
      where.level = level;
    }

    // Get all grades
    const grades = await prisma.grade.findMany({
      where,
      select: {
        id: true,
        name: true,
        level: true
      },
      orderBy: [
        { level: 'asc' },
        { name: 'asc' }
      ]
    });

    // Sort grades according to the predefined order
    const sortedGrades = grades.sort((a, b) => {
      if (a.level !== b.level) {
        return Object.keys(levelOrder).indexOf(a.level || '') - Object.keys(levelOrder).indexOf(b.level || '');
      }
      
      const levelGrades = levelOrder[a.level as keyof typeof levelOrder] || [];
      return levelGrades.indexOf(a.name) - levelGrades.indexOf(b.name);
    });

    return NextResponse.json(sortedGrades);
  } catch (error) {
    console.error('Error in grades endpoint:', error);
    return NextResponse.json(
      { error: 'Failed to fetch grades', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, level } = data;

    if (!name) {
      return NextResponse.json(
        { error: 'Grade name is required' },
        { status: 400 }
      );
    }

    const grade = await prisma.grade.create({
      data: {
        name: name.trim(),
        level: level?.trim(),
        description: `Default grade for ${name}`
      }
    });

    return NextResponse.json(grade, { status: 201 });
  } catch (error) {
    console.error('Error creating grade:', error);
    return NextResponse.json(
      { error: 'Failed to create grade' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();
    const adminCookie = await cookieStore.get('admin');
    if (!adminCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Delete all existing grades
    await prisma.grade.deleteMany();

    // Create default grades with proper descriptions
    const grades = await Promise.all(
      DEFAULT_GRADES.map(grade => 
        prisma.grade.create({
          data: {
            name: grade.name,
            level: grade.level,
            description: `${grade.name} - ${grade.level.charAt(0).toUpperCase() + grade.level.slice(1)} School`
          }
        })
      )
    );

    return NextResponse.json(grades);
  } catch (error) {
    console.error('Error initializing grades:', error);
    return NextResponse.json(
      { error: 'Failed to initialize grades' },
      { status: 500 }
    );
  }
} 