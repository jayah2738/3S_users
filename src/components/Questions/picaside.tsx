"use client";

import { useTheme } from "next-themes";

const PicAside = () => {
  const { theme } = useTheme();

  return (
    <div className="relative z-10   sm:bg-transparent p-8 bg-[url(/images/infos/quest1.png)] h-[100%] bg-no-repeat bg:-center  -dark sm:p-11 lg:p-8 xl:p-11">
     
    </div>
  );
};

export default PicAside;
