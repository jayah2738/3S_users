"use client";
import Image from "next/image";
import Link from "next/link";


const Header = ({ username, grade }) => {

  return (
    <div className="header flex 
    h-auto w-[420px] xl:w-[700px] lg:w-[700px] md:w-[700px] z-40 
    bg-white text-gray-700 fixed rounded-2xl items-center 
    justify-between xl:rounded-2xl xl:ml-6 p-2 px-4 shadow-sm 
    shadow-white md:relative md:translate-x-0 md:translate-y-0
    lg:relative lg:translate-x-0 lg:translate-y-0
    xl:relative xl:translate-x-0 xl:translate-y-0 lg:mt-4 xl:mt-4">
      <div className="flex">
        <Image
          src="/images/logo/logo1.png"
          alt="logo"
          width={100}
          height={30}
          className=""
        />
      </div>
      <div className="flex gap-2">
        <p className="text-lg hidden xl:block lg:block md:block ">Welcome</p>
        <p className="text-lg">{username}</p>
        <p className="text-lg">{grade}</p>
      </div>

      <div className="flex xl:flex-row lg:flex-row md:flex-row gap-2 flex-col">
       

        <Link href={"/"}>
          <button
            id="lesson"
            className="transition-400 rounded-full border-2 border-amber-500 bg-transparent px-6 text-lg font-bold text-gray-600 hover:border-green-500"
          >
            <p>Previous</p>
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Header;
