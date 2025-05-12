import { Feature } from "@/types/feature";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph } = feature;
  return (
    <motion.div
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.7 }}
      className="wow p-4 rounded-lg border border-pink-500 hover:border-none fadeInUp hover:bg-gradient-to-l from-pink-700 to-blue-700"
    >
      <div className="flex justify-center place-items-center gap-2">
        <div className="mb-10 rounded-full flex h-[70px] w-[70px] hover:bg-white items-center justify-center bg-gradient-to-l from-pink-700 to-blue-700 text-amber-500">
          {icon}
        </div>
        <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
          {title}
        </h3>
      </div>
      <p className="pr-[10px] text-base font-medium leading-relaxed hover:text-white text-body-color">
        {paragraph}
      </p>
    </motion.div>
  );
};

export default SingleFeature;
