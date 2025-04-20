import React from "react";
import {Programlistdata} from "@/components/coursesdata/Programlistdata";
import Link from "next/link";
import Header from "@/app/header";
const Programlistpage: React.FC = () => {
  return (
    <div className="p-2 h-[100vh] " style={{
      background: "linear-gradient(90deg, rgba(20, 20, 9, 0.803), rgba(24, 7, 7, 0.441)) ,url(/images/users/bglist.jpg)", backgroundAttachment:'fixed'
    }}>
    <div className='xl:place-items-center' >
    <Header username={"Guest_14121015"} grade={"12L"} />
    </div>
    <div className="place-items-center" >
   
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-7 translate-y-[6rem] xl:translate-y-0 pb-6 xl:mt-6">
        {Programlistdata.map((item, index) => (
          <a href={item.href} key={index}>
            <div
              id={item.id}
              className="flex w-[370px] h-24 xl:w-[500px] flex-col items-center
              text-gray-500 hover:bg-amber-100 text-gray-60 justify-between 
              hover:translate-x-4 hover:shadow-green-500 hover:text-green-500 transition duration-300 
              rounded-lg  py-4 shadow-md shadow-amber-100 bg-[url(/images/users/title.png)] bg-center"
              
            >
              <h1 className="font-bold mt-7"><span className="text-red-500" >{item.num} {"]-"} </span>{item.title}</h1>
            </div>
          </a>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Programlistpage;
