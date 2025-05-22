"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
// import UserHeader from '@/app/userheader';
import { useParams, useRouter } from 'next/navigation';
import { Programlistdata } from '@/components/coursesdata/Programlistdata';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.min.js';

const ProgramPage = () => {
  const { data: session, status } = useSession();
  const { gradeId, subjectId } = useParams<{ gradeId: string; subjectId: string }>();

  const router = useRouter();
  const program = Programlistdata.find(p => p.id === subjectId);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Verify PDF exists before trying to load it
    const verifyPdf = async () => {
      try {
        const response = await fetch('/pdf/level1.pdf', { method: 'HEAD' });
        if (response.ok) {
          setPdfUrl('/pdf/level1.pdf');
        } else {
          setPdfError('PDF file not found on server');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error verifying PDF:', error);
        setPdfError('Failed to verify PDF file');
        setIsLoading(false);
      }
    };

    verifyPdf();
  }, []);

  useEffect(() => {
    if (!pdfUrl || !canvasRef.current) return;

    const loadPdf = async () => {
      try {
        setIsLoading(true);
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        setNumPages(pdf.numPages);
        await renderPage(pdf, currentPage);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading PDF:', error);
        setPdfError('Failed to load PDF. Please try again later.');
        setIsLoading(false);
      }
    };

    loadPdf();
  }, [pdfUrl, currentPage]);

  const renderPage = async (pdf: pdfjsLib.PDFDocumentProxy, pageNumber: number) => {
    try {
      const page = await pdf.getPage(pageNumber);
      const canvas = canvasRef.current;
      if (!canvas) return;

      const viewport = page.getViewport({ scale: 1.5 });
      const context = canvas.getContext('2d');
      if (!context) return;

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      await page.render(renderContext).promise;
    } catch (error) {
      console.error('Error rendering page:', error);
      setPdfError('Failed to render PDF page. Please try again later.');
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (numPages && currentPage < numPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleGoBack = () => {
    router.push(`/grades/${gradeId}/subjects/`);
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!session || !session.user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Please sign in to access this content</h1>
          </div>
        </div>
      </div>
    );
  }

  // if (!program) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
  //       {/* <UserHeader username={session.user.name || "Guest"} grade={params.grade as string} /> */}
  //       <div className="container mx-auto px-4 py-8">
  //         <div className="text-center">
  //           <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Program not found</h1>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* <UserHeader username={session.user.name || "Guest"} grade={params.grade as string} /> */}
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 mt-12">
          <button
            onClick={handleGoBack}
            className="mb-4 flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Programs
          </button>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            {/* {program.title} */}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {/* Program {program.num} - {gradeId} */}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Video Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Video Lesson
            </h2>
            <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/ZcO4KuriDU8"
                title="Example Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>

          {/* PDF Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Study Materials
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                {isLoading && (
                  <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
                  </div>
                )}
                {pdfError ? (
                  <div className="text-center p-4">
                    <p className="text-red-500 dark:text-red-400">{pdfError}</p>
                    <button
                      onClick={() => {
                        setIsLoading(true);
                        setPdfError(null);
                        setPdfUrl('/pdf/level1.pdf');
                      }}
                      className="mt-2 px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-500 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <canvas ref={canvasRef} className="max-w-full" />
                    {numPages && (
                      <div className="flex items-center justify-center mt-4 space-x-4">
                        <button
                          onClick={handlePreviousPage}
                          disabled={currentPage <= 1}
                          className="px-4 py-2 bg-amber-500 text-white rounded-md disabled:opacity-50 hover:bg-amber-500 transition-colors"
                        >
                          Previous
                        </button>
                        <span className="text-gray-600 dark:text-gray-300">
                          Page {currentPage} of {numPages}
                        </span>
                        <button
                          onClick={handleNextPage}
                          disabled={currentPage >= numPages}
                          className="px-4 py-2 bg-amber-500 text-white rounded-md disabled:opacity-50 hover:bg-amber-500 transition-colors"
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <a
                href="/pdf/level1.pdf"
                download
                className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-500 hover:bg-green-500 transition-colors"
              >
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramPage; 
























// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { CourseContent } from '@/lib/cloudinary';
// import { getGradeById } from '@/lib/gradeData';
// import { ChevronLeftIcon } from '@heroicons/react/24/outline';

// export default function SubjectPage() {
//   const params = useParams();
//   const router = useRouter();
//   const [courses, setCourses] = useState<CourseContent[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await fetch(
//           `/api/courses?gradeId=${params.gradeId}&subjectId=${params.subjectId}`
//         );
//         if (!response.ok) throw new Error('Failed to fetch courses');
//         const data = await response.json();
//         setCourses(data);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An error occurred');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, [params.gradeId, params.subjectId]);

//   const grade = getGradeById(params.gradeId as string);
//   const subject = grade?.subjects.find((s) => s.id === params.subjectId);

//   const handlePrevious = () => {
//     router.push(`/grades/${params.gradeId}`);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
//         <div className="text-red-500">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12">
//       <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-around place-items-center">
//           <button
//             onClick={handlePrevious}
//             className="flex items-center text-amber-500 hover:text-amber-600 transition-colors mb-8 group"
//           >
//             <ChevronLeftIcon className="h-6 w-6 mr-2 group-hover:-translate-x-1 transition-transform" />
//             <span>Back to {grade?.name}</span>
//           </button>

//           <div className="text-center mb-12">
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//               {subject?.name}
//             </h1>
//             <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
//               {subject?.description}
//             </p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {courses.map((course) => (
//             <div
//               key={course.id}
//               className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
//             >
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
//                   {course.title}
//                 </h3>
//                 {course.description && (
//                   <p className="text-gray-600 dark:text-gray-400 mb-4">
//                     {course.description}
//                   </p>
//                 )}
//                 <div className="space-y-4">
//                   {course.pdfUrl && (
//                     <a
//                       href={course.pdfUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="block w-full text-center px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
//                     >
//                       View PDF
//                     </a>
//                   )}
//                   {course.videoUrl && (
//                     <a
//                       href={course.videoUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="block w-full text-center px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
//                     >
//                       Watch Video
//                     </a>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>



//         {courses.length === 0 && (
//           <div className="text-center py-12">
//             <p className="text-gray-600 dark:text-gray-400">
//               No course content available yet.
//             </p>
//           </div>
//         )}

        
//       </div>
//     </div>
//   );
// } 