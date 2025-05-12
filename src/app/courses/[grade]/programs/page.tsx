"use client";

import React from "react";
import { Programlistdata } from "@/components/coursesdata/Programlistdata";
import Link from "next/link";
import UserHeader from "@/app/userheader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Programlistpage = ({ params }: { params: { grade: string; grade_id: string } }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleGoBack = () => {
    router.push(`/courses/${params.grade}`);
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <UserHeader username={session?.user?.name || "Guest"} grade={params.grade} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mt-8 mb-8 text-center">
          <button
            onClick={handleGoBack}
            className="mb-4 flex items-center mx-auto text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
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
            Back to Grades
          </button>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Program List
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Select a program to explore its contents
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Programlistdata.map((item, index) => (
            <Link 
              href={`/courses/${params.grade}/${params.grade_id}/programs/${item.id}`} 
              key={index}
            >
              <div
                className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900">
                    <span className="text-xl font-bold text-amber-600 dark:text-amber-400">
                      {item.num}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Programlistpage;
