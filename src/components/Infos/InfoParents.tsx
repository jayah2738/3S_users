'use client'
import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const AboutSectionOne = () => {
  const List = ({ text }) => (
    <p className="mb-5 flex items-center text-lg font-medium text-body-color">
      <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-amber-500 bg-opacity-10 text-amber-500">
        {checkIcon}
      </span>
      {text}
    </p>
  );

  return (
    <section id="about" className="pt-4 md:pt-2 lg:pt-2">
      <div className="container">
        <SectionTitle
          title="Dear Parents, Stay informed here."
          paragraph=""
          mb="44px"
        />
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex md: flex-col lg:flex-row-reverse xl:flex-row-reverse xl:justify-between">
            <motion.div 
             variants={fadeIn("left", 0.5)}
             initial="hidden"
             whileInView={"show"}
             viewport={{ once: false, amount: 0.7 }}
            className="w-full px-4 lg:w-[50%] ">
              <div className="relative mx-auto aspect-[25/24] max-w-[500px] lg:mr-0">
                <Image
                  src="/images/about/info1.png"
                  alt="about-image"
                  fill
                  className="mx-auto max-w-full drop-shadow-three dark:hidden dark:drop-shadow-none lg:mr-0"
                />
                <Image
                  src="/images/about/info1.png"
                  alt="about-image"
                  fill
                  className="mx-auto hidden max-w-full drop-shadow-three dark:block dark:drop-shadow-none lg:mr-0"
                />
              </div>
            </motion.div>
            <motion.div 
             variants={fadeIn("right", 0.8)}
             initial="hidden"
             whileInView={"show"}
             viewport={{ once: false, amount: 0.7 }}
            className="max-h-[500px] w-full overflow-y-scroll border border-l-0 border-t-0 border-b-amber-500 px-4 pt-2 sm:border-r-0 lg:w-1/2 xl:border-r-amber-500">
              <div className="mb-2 max-w-[670px] lg:mb-0" data-wow-delay=".15s">
                <div className=" flex w-full flex-col">
                  <div className="mesCont flex w-full">
                    <div className="lg:ml-30 container mb-8 rounded-l-[40px] rounded-br-[40px] border border-t-rose-500 p-4 shadow-md shadow-black/80 dark:shadow-white lg:h-auto lg:w-[100%] xl:ml-40">
                      <div className="topic font-bold text-green-500">
                        About the school fee
                      </div>
                      <div className="date font-bold text-amber-500">
                        Wednesday April 5th 2025
                      </div>
                      <div className="time font-bold text-rose-500">
                        10:00 AM - 12:00 PM
                      </div>
                      <div className="messages ml-4">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Officia assumenda delectus sapiente dolore voluptate
                        corrupti ad a repellat commodi, mollitia dicta dolorum
                        harum vero eveniet voluptates accusantium quibusdam,
                        praesentium expedita!
                      </div>
                    </div>
                    <div className="container ml-2 h-[78px] max-w-[80px] rounded-full border bg-black p-2 ">
                      <Image
                        src="/images/logo/logo1.png"
                        alt="info-image"
                        width={60}
                        height={60}
                        className="mt-4 w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="mesCont flex w-full">
                    <div className="lg:ml-30 container mb-8 rounded-l-[40px] rounded-br-[40px] border border-t-rose-500 p-4 shadow-md shadow-black/80 dark:shadow-white lg:h-auto lg:w-[100%] xl:ml-40">
                      <div className="topic font-bold text-green-500">
                        About the school fee
                      </div>
                      <div className="date font-bold text-amber-500">
                        Wednesday April 5th 2025
                      </div>
                      <div className="time font-bold text-rose-500">
                        10:00 AM - 12:00 PM
                      </div>
                      <div className="messages ml-4">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Officia assumenda delectus sapiente dolore voluptate
                        corrupti ad a repellat commodi, mollitia dicta dolorum
                        harum vero eveniet voluptates accusantium quibusdam,
                        praesentium expedita!
                      </div>
                    </div>
                    <div className="container ml-2 h-[78px] max-w-[80px] rounded-full border bg-black p-2 ">
                      <Image
                        src="/images/logo/logo1.png"
                        alt="info-image"
                        width={60}
                        height={60}
                        className="mt-4 w-full"
                      />
                    </div>
                  </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionOne;
