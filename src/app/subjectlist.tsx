import React from "react";

const subjectlist = ({ programslists, subject, bglink }) => {
  return (
    <div
      className="mt-8 flex h-36 w-80 flex-col items-center justify-between rounded-lg border  py-4 shadow-md shadow-amber-500"
      style={{
        background: `url(${bglink})`,
        backgroundSize: "cover",
      }}
    >
      <a href={programslists}>
        <div className="mb-4 flex gap-4">
          <p className="text-4xl font-bold text-gray-500 mt-8 ">{subject}</p>
        </div>
      </a>
    </div>
  );
};
export default subjectlist;
