import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const DEFAULT_ADMIN = {
  name: 'admin',
  password: 'admin123'
};

const DEFAULT_GRADES = [
  { name: '12 S', level: 'high' },
  { name: '11 S', level: 'high' },
  { name: '10 S', level: 'high' },
  { name: '9 S', level: 'high' },
  { name: '8 S', level: 'middle' },
  { name: '7 S', level: 'middle' },
  { name: '6 S', level: 'middle' },
  { name: '5 S', level: 'primary' },
  { name: '4 S', level: 'primary' },
  { name: '3 S', level: 'primary' },
  { name: '2 S', level: 'primary' },
  { name: '1 S', level: 'primary' },
];

export async function GET() {
  try {
    // Check if admin exists
    const admin = await prisma.admin.findUnique({
      where: { name: DEFAULT_ADMIN.name }
    });

    if (!admin) {
      // Create admin
      await prisma.admin.create({
        data: {
          name: DEFAULT_ADMIN.name,
          password: DEFAULT_ADMIN.password
        }
      });
    }

    // Delete all existing grades
    await prisma.grade.deleteMany();

    // Create default grades
    const grades = await Promise.all(
      DEFAULT_GRADES.map(grade => 
        prisma.grade.create({
          data: {
            name: grade.name,
            level: grade.level,
            description: `${grade.name} grade level`
          }
        })
      )
    );

    return NextResponse.json({
      success: true,
      message: 'Admin account and grades initialized successfully',
      admin: {
        name: DEFAULT_ADMIN.name,
        password: DEFAULT_ADMIN.password
      }
    });
  } catch (error) {
    console.error('Error initializing:', error);
    return NextResponse.json(
      { error: 'Failed to initialize' },
      { status: 500 }
    );
  }
} 