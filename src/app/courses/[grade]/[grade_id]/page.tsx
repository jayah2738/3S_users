import React from "react";
import {Programlistdata} from "@/components/coursesdata/Programlistdata";
import Link from "next/link";
import Header from "@/app/header";
const Programlistpage: React.FC = () => {
  return (
    <section className="p-2 place-items-center" style={{
      background: "linear-gradient(90deg, rgba(20, 20, 9, 0.803), rgba(24, 7, 7, 0.441)) ,url(/images/users/bglist.jpg)", backgroundAttachment:'fixed'
    }}>
      <div>
        <Header username={"bob"} grade={"9th"}/>
      </div>
      <div className=" mt-6 flex items-center justify-center text-xl">
        <h1>You are in the six exercise english pdf</h1>
      </div>
      <div className="grid grid-cols-2 grid-rows-12 gap-7 mt-6">
        {Programlistdata.map((item, index) => (
          <a href={"/"} key={index}>
            <div
              id={item.id}
              className="flex h-24 w-[500px] flex-col items-center
              text-gray-500 hover:bg-amber-100 text-gray-60 justify-between 
              hover:translate-x-4 hover:shadow-green-500 hover:text-green-500 transition duration-300 
              rounded-lg  py-4 shadow-md shadow-amber-100"
              style={{
                background:'url(/images/users/title.png)',backgroundPositionX:'50px'
              }}
            >
              <h1 className="font-bold mt-7"><span>{item.num} {"]-"} </span>{item.title}</h1>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Programlistpage;
