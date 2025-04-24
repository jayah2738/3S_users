'use client'
import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";
import { useMessages } from "@/context/MessageContext";

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const AboutSectionTwo = () => {
  const { studentMessages } = useMessages();

  return (
    <section id="about" className="pt-4 md:pt-2 lg:pt-2">
      <div className="container">
        <SectionTitle
          title="Dear Students, Stay informed here."
          paragraph=""
          mb="44px"
        />
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap">
            <motion.div
              variants={fadeIn("left", 0.5)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="relative w-full px-4 lg:w-1/2"
            >
              <div className="mb-12 max-w-[670px] lg:mb-0" data-wow-delay=".15s">
                {/* SVG Background for Messages Container - Only on mobile */}
                <div className="relative rounded-xl bg-white/20 p-6 backdrop-blur-sm md:bg-transparent">
                  <div className="absolute inset-0 -z-10 md:hidden">
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 450 556"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="xMidYMid slice"
                    >
                      <circle
                        cx="277"
                        cy="63"
                        r="225"
                        className="fill-green-500 opacity-90 dark:fill-green-400 dark:opacity-90"
                      />
                      <circle
                        cx="17.9997"
                        cy="182"
                        r="18"
                        className="fill-green-500 opacity-20 dark:fill-green-400 dark:opacity-20"
                      />
                      <circle
                        cx="76.9997"
                        cy="288"
                        r="34"
                        className="fill-green-500 opacity-20 dark:fill-green-400 dark:opacity-20"
                      />
                      <circle
                        cx="325.486"
                        cy="302.87"
                        r="180"
                        transform="rotate(-37.6852 325.486 302.87)"
                        className="fill-green-500 opacity-30 dark:fill-green-400 dark:opacity-30"
                      />
                      <path
                        d="M5.88928 72.3303C33.6599 66.4798 101.397 64.9086 150.178 105.427C211.155 156.076 229.59 162.093 264.333 166.607C299.076 171.12 337.718 183.657 362.889 212.24"
                        className="stroke-green-500 dark:stroke-green-400"
                        strokeWidth="2"
                      />
                      <path
                        d="M-22.1107 72.3303C5.65989 66.4798 73.3965 64.9086 122.178 105.427C183.155 156.076 201.59 162.093 236.333 166.607C271.076 171.12 309.718 183.657 334.889 212.24"
                        className="stroke-green-500 dark:stroke-green-400"
                        strokeWidth="2"
                      />
                      <path
                        d="M-53.1107 72.3303C-25.3401 66.4798 42.3965 64.9086 91.1783 105.427C152.155 156.076 170.59 162.093 205.333 166.607C240.076 171.12 278.718 183.657 303.889 212.24"
                        className="stroke-green-500 dark:stroke-green-400"
                        strokeWidth="2"
                      />
                      <circle
                        opacity="0.8"
                        cx="214.505"
                        cy="60.5054"
                        r="49.7205"
                        transform="rotate(-13.421 214.505 60.5054)"
                        className="stroke-green-500 dark:stroke-green-400"
                        strokeWidth="2"
                      />
                      <circle
                        cx="220"
                        cy="63"
                        r="43"
                        className="fill-green-500 dark:fill-green-400"
                      />
                    </svg>
                  </div>
                  <div className="space-y-6">
                    {studentMessages.map((message) => (
                      <div key={message.id} className="group relative transform transition-all duration-300 hover:scale-[1.01]">
                        <div className="relative rounded-xl bg-white/20 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] dark:bg-gray-dark/20">
                          <div className="absolute left-0 top-0 h-full w-1 bg-green-500"></div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 rounded-full bg-green-500/10 p-2">
                                <Image
                                  src="/images/logo/logo1.png"
                                  alt="logo"
                                  width={24}
                                  height={24}
                                  className="h-full w-full"
                                />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-green-500">{message.sender}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {new Date(message.timestamp).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 text-gray-700 dark:text-gray-300">
                            {message.content}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn("right", 0.5)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="hidden w-full px-4 lg:block lg:w-1/2"
            >
              <div className="relative mx-auto aspect-[25/24] max-w-[500px] lg:mr-0">
                <svg
                  width="450"
                  height="556"
                  viewBox="0 0 450 556"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto max-w-full drop-shadow-three dark:drop-shadow-none lg:mr-0"
                >
                  {/* Background Circles */}
                  <circle
                    cx="277"
                    cy="63"
                    r="225"
                    className="fill-green-500 opacity-90 dark:fill-green-400 dark:opacity-90"
                  />
                  <circle
                    cx="17.9997"
                    cy="182"
                    r="18"
                    className="fill-green-500 opacity-20 dark:fill-green-400 dark:opacity-20"
                  />
                  <circle
                    cx="76.9997"
                    cy="288"
                    r="34"
                    className="fill-green-500 opacity-20 dark:fill-green-400 dark:opacity-20"
                  />
                  <circle
                    cx="325.486"
                    cy="302.87"
                    r="180"
                    transform="rotate(-37.6852 325.486 302.87)"
                    className="fill-green-500 opacity-30 dark:fill-green-400 dark:opacity-30"
                  />

                  {/* Decorative Elements */}
                  <path
                    d="M5.88928 72.3303C33.6599 66.4798 101.397 64.9086 150.178 105.427C211.155 156.076 229.59 162.093 264.333 166.607C299.076 171.12 337.718 183.657 362.889 212.24"
                    className="stroke-green-500 dark:stroke-green-400"
                    strokeWidth="2"
                  />
                  <path
                    d="M-22.1107 72.3303C5.65989 66.4798 73.3965 64.9086 122.178 105.427C183.155 156.076 201.59 162.093 236.333 166.607C271.076 171.12 309.718 183.657 334.889 212.24"
                    className="stroke-green-500 dark:stroke-green-400"
                    strokeWidth="2"
                  />
                  <path
                    d="M-53.1107 72.3303C-25.3401 66.4798 42.3965 64.9086 91.1783 105.427C152.155 156.076 170.59 162.093 205.333 166.607C240.076 171.12 278.718 183.657 303.889 212.24"
                    className="stroke-green-500 dark:stroke-green-400"
                    strokeWidth="2"
                  />

                  {/* Central Elements */}
                  <circle
                    opacity="0.8"
                    cx="214.505"
                    cy="60.5054"
                    r="49.7205"
                    transform="rotate(-13.421 214.505 60.5054)"
                    className="stroke-green-500 dark:stroke-green-400"
                    strokeWidth="2"
                  />
                  <circle
                    cx="220"
                    cy="63"
                    r="43"
                    className="fill-green-500 dark:fill-green-400"
                  />

                  {/* Additional Decorative Elements */}
                  <path
                    d="M100 200 C 150 150, 250 150, 300 200"
                    className="stroke-green-500 dark:stroke-green-400"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M150 250 C 200 200, 250 200, 300 250"
                    className="stroke-green-500 dark:stroke-green-400"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M200 300 C 250 250, 300 250, 350 300"
                    className="stroke-green-500 dark:stroke-green-400"
                    strokeWidth="2"
                    fill="none"
                  />

                  {/* Gradient Definitions */}
                  <defs>
                    <linearGradient
                      id="gradient1"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" className="stop-color-green-500 dark:stop-color-green-400" />
                      <stop offset="100%" className="stop-color-green-600 dark:stop-color-green-500" />
                    </linearGradient>
                    <linearGradient
                      id="gradient2"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" className="stop-color-green-400 dark:stop-color-green-300" />
                      <stop offset="100%" className="stop-color-green-500 dark:stop-color-green-400" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
