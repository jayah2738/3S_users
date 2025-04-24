import { hash, compare } from 'bcryptjs';
import { db } from './db';
import { prisma } from './db';
import bcrypt from 'bcryptjs';

export interface Admin {
  id: string;
  name: string;
  password: string;
}

export async function verifyAdminPassword(name: string, password: string): Promise<boolean> {
  try {
    const admin = await db.admin.findUnique({
      where: { name },
    });

    if (!admin) return false;

    return compare(password, admin.password);
  } catch (error) {
    console.error('Error verifying admin password:', error);
    return false;
  }
}

export async function updateAdminPassword(name: string, newPassword: string): Promise<boolean> {
  try {
    const hashedPassword = await hash(newPassword, 12);
    
    await db.admin.update({
      where: { name },
      data: { password: hashedPassword },
    });

    return true;
  } catch (error) {
    console.error('Error updating admin password:', error);
    return false;
  }
}

export async function createStudent(username: string, password: string, gradeId: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.student.create({
    data: {
      username,
      password: hashedPassword,
      gradeId,
    },
  });
}

export async function getStudents(gradeId?: string) {
  return prisma.student.findMany({
    where: gradeId ? { gradeId } : undefined,
    include: {
      grade: true,
    },
  });
}

export async function updateStudentStatus(id: string, isActive: boolean) {
  return prisma.student.update({
    where: { id },
    data: { isActive },
  });
}

export async function getGrades() {
  return prisma.grade.findMany({
    include: {
      _count: {
        select: {
          materials: true,
          students: true,
        },
      },
    },
    orderBy: [
      { level: 'asc' },
      { name: 'asc' }
    ],
  });
}

export async function createGrade(name: string, level: string, description?: string) {
  return prisma.grade.create({
    data: {
      name,
      level,
      description,
    },
  });
}

export async function initializeGrades() {
  const grades = [
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
    { name: 'Grade 9', level: 'middle' },
    
    // High School
    { name: 'Grade 10', level: 'high' },
    { name: 'Grade 11 L', level: 'high' },
    { name: 'Grade 11 OSE', level: 'high' },
    { name: 'Grade 11 S', level: 'high' },
    { name: 'Grade 12 L', level: 'high' },
    { name: 'Grade 12 OSE', level: 'high' },
    { name: 'Grade 12 S', level: 'high' },
  ];

  for (const grade of grades) {
    await prisma.grade.upsert({
      where: { name: grade.name },
      update: { level: grade.level },
      create: grade,
    });
  }
}

export async function getMaterials(gradeId?: string) {
  return prisma.material.findMany({
    where: gradeId ? { gradeId } : undefined,
    include: {
      grade: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function deleteMaterial(id: string) {
  return prisma.material.delete({
    where: { id },
  });
} 