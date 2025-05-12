import Link from "next/link";
import React from "react";

const subjectlist = ({ subject,pdflink,videolink,bglink }) => {
  return (
    <div className="mt-8 flex h-36 w-80 flex-col items-center justify-between rounded-lg border  py-4 shadow-md shadow-amber-500"
    style={{
      background: `url(${bglink})`, backgroundSize:'cover'
    }}>
      <div className="mb-4 flex gap-4">
        <p className="text-3xl font-bold text-gray-500 ">{subject}</p>
      </div>
      <div className="flex gap-4">
        <Link href={pdflink}>
          <button className="transition-400 rounded-full border-2 border-rose-500 bg-rose-500 px-6 text-xl font-bold text-white hover:text-rose-500 hover:bg-white">
            <p>PDF</p>
          </button>
        </Link>
        <Link href={videolink}>
          <button className="transition-400 rounded-full border-2 border-rose-500 bg-rose-500 px-6 text-xl font-bold text-white hover:text-rose-500 hover:bg-white">
            <p>Video</p>
          </button>
        </Link>
      </div>
    </div>
  );
};
export default subjectlist;
