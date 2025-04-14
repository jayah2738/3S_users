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
      className="wow fadeInUp"
    >
      <div className="mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-md bg-amber-500 bg-opacity-10 text-amber-500">
        {icon}
      </div>
      <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
        {title}
      </h3>
      <p className="pr-[10px] text-base font-medium leading-relaxed text-body-color">
        {paragraph}
      </p>
    </motion.div>
  );
};

export default SingleFeature;
