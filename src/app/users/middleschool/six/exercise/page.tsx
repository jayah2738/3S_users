import React from "react";
import Header from "@/app/users/header";
import Subjectlist from "@/app/users/subjectlist";
import SixExoData from "./SixExoData";

const SixExerciseVideo = () => {
   // bg-[url(/images/users/bglist.jpg)] 
  return (
    <div className="pt-2 place-items-center pb-48 
    bg-cover bg-fixed" style={{
      background: "linear-gradient(90deg, rgba(20, 20, 9, 0.803), rgba(24, 7, 7, 0.441)) ,url(/images/users/bglist.jpg)"
    }}>
      <div className="">
        <Header username="bob" grade="9th" />
      </div>
      <div className="mt-20 grid grid-cols-1 grid-rows-3 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {SixExoData.map((item, index) => (
          <Subjectlist
            key={index}
            subject={item.subject}
            pdflink={item.pdflink}
            videolink={item.videolink}
            bglink={item.bglink}
          />
        ))}
      </div>
    </div>
  );
};
export default SixExerciseVideo;
