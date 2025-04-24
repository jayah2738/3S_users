"use client";
import PicAside from "./picaside";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <section id="contact" className="relative overflow-hidden py-16 md:py-20 lg:py-28">
      {/* Background SVG */}
      <div className="absolute right-0 top-0 z-[-1] opacity-30 lg:opacity-100">
        <svg
          width="450"
          height="556"
          viewBox="0 0 450 556"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="277"
            cy="63"
            r="225"
            className="fill-amber-500 opacity-90"
          />
          <circle
            cx="17.9997"
            cy="182"
            r="18"
            className="fill-yellow opacity-20"
          />
          <circle
            cx="76.9997"
            cy="288"
            r="34"
            className="fill-yellow opacity-20"
          />
          <circle
            cx="325.486"
            cy="302.87"
            r="180"
            transform="rotate(-37.6852 325.486 302.87)"
            className="fill-yellow opacity-30"
          />
          <circle
            opacity="0.8"
            cx="184.521"
            cy="315.521"
            r="132.862"
            transform="rotate(114.874 184.521 315.521)"
            className="stroke-amber-500 opacity-70"
          />
          <circle
            opacity="0.8"
            cx="356"
            cy="290"
            r="179.5"
            transform="rotate(-30 356 290)"
            className="stroke-amber-500 opacity-70"
          />
          <circle
            opacity="0.8"
            cx="191.659"
            cy="302.659"
            r="133.362"
            transform="rotate(133.319 191.659 302.659)"
            className="fill-yellow opacity-30"
          />
        </svg>
      </div>

      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="lg:w-md w-full px-4 xl:w-1/2">
            <motion.div
              variants={fadeIn("right", 0.7)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="mb-12 rounded-xl bg-white/20 p-8 backdrop-blur-xl shadow-three dark:bg-gray-dark/20 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s"
            >
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl"
              >
                Do you have any questions?
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-12 text-base font-medium text-body-color"
              >
                Fill the following form and we will get back to you ASAP via email.
              </motion.p>
              <form onSubmit={handleSubmit}>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="mb-8"
                    >
                      <label
                        htmlFor="name"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your name"
                        className="w-full rounded-xl border border-gray-300 bg-white/50 px-6 py-3 text-base text-body-color outline-none backdrop-blur-sm transition-all duration-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-gray-600 dark:bg-gray-dark/50 dark:text-body-color-dark"
                      />
                    </motion.div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="mb-8"
                    >
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter your email"
                        className="w-full rounded-xl border border-gray-300 bg-white/50 px-6 py-3 text-base text-body-color outline-none backdrop-blur-sm transition-all duration-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-gray-600 dark:bg-gray-dark/50 dark:text-body-color-dark"
                      />
                    </motion.div>
                  </div>
                  <div className="w-full px-4">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="mb-8"
                    >
                      <label
                        htmlFor="message"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={5}
                        placeholder="Enter your Message"
                        className="w-full resize-none rounded-xl border border-gray-300 bg-white/50 px-6 py-3 text-base text-body-color outline-none backdrop-blur-sm transition-all duration-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-gray-600 dark:bg-gray-dark/50 dark:text-body-color-dark"
                      ></textarea>
                    </motion.div>
                  </div>
                  <div className="w-full px-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full rounded-xl bg-amber-500 px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-amber-600 dark:shadow-submit-dark"
                    >
                      Submit Question
                    </motion.button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
          <motion.div 
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="w-full px-4 lg:w-5/12 xl:w-1/2"
          >
            <PicAside />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
