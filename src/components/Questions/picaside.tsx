"use client";

import { useTheme } from "next-themes";

const PicAside = () => {
  const { theme } = useTheme();

  return (
    <div className="relative z-10 rounded-lg bg-white sm:bg-transparent p-8 shadow-three dark:bg-[url(/images/about/questions.png)] h-[100%] bg-no-repeat bg:-center  -dark sm:p-11 lg:p-8 xl:p-11">
     
    </div>
  );
};

export default PicAside;
