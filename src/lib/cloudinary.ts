import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface CourseContent {
  id: string;
  title: string;
  description?: string;
  pdfUrl?: string;
  videoUrl?: string;
  gradeId: string;
  subjectId: string;
  createdAt: Date;
}

export async function uploadToCloudinary(file: File, folder: string): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
  formData.append('folder', folder);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  const data = await response.json();
  return data.secure_url;
}

export async function getCourseContent(gradeId: string, subjectId: string): Promise<CourseContent[]> {
  const response = await fetch(`/api/courses?gradeId=${gradeId}&subjectId=${subjectId}`);
  const data = await response.json();
  return data;
} 