"use client";
import React from "react";
import Subjectlist from "@/app/subjectlist";
import { subjectlistdata } from "@/components/coursesdata/Sublistdata";
import Header from "@/app/header";

const Subjectlistpage = () => {
  return (
    <div>
      <div>
        <Header username={"Guest_14121015"} grade={"12L"} />
      </div>
      <div className="place-items-center translate-y-14 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 ">
        {subjectlistdata.map((item, index) => (
          <div key={index}>
            <Subjectlist
              bglink={item.bglink}
              programslists={item.programlists}
              subject={item.subject}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Subjectlistpage;
