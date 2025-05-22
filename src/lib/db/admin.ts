import { hash, compare } from 'bcryptjs';
import { db } from './db';
import { prisma } from './db';
import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

export async function getCourses(gradeId?: string) {
  return prisma.course.findMany({
    where: gradeId ? { gradeId } : undefined,
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function createCourse(title: string, description: string, gradeId: string, subjectId: string, file: File, type: 'video' | 'pdf', adminId: string) {
  try {
    // Convert file to base64
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const dataURI = `data:${file.type};base64,${base64}`;
    
    console.log('Uploading to Cloudinary...');
    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(dataURI, {
      resource_type: type === 'video' ? 'video' : 'raw',
      folder: `grades/${gradeId}/${subjectId}/${type}s`,
      public_id: `${Date.now()}-${file.name}`,
    });

    console.log('Cloudinary upload successful:', uploadResult.secure_url);

    // Create course in database
    const course = await prisma.course.create({
      data: {
        title,
        description,
        type,
        fileUrl: uploadResult.secure_url,
        cloudinaryId: uploadResult.public_id,
        gradeId,
        subjectId,
        createdBy: adminId
      },
    });

    console.log('Course created in database:', course.id);
    return course;
  } catch (error) {
    console.error('Error in createCourse:', error);
    throw error;
  }
}

export async function updateCourse(id: string, data: { name?: string; description?: string; isActive?: boolean }) {
  return prisma.course.update({
    where: { id },
    data,
  });
}

export async function deleteCourse(id: string) {
  return prisma.course.delete({
    where: { id },
  });
} 