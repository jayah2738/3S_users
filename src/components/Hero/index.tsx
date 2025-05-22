'use client'
// import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [error, setError] = useState("");

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    if (!adminName.trim()) {
      setError("Please enter your name");
      return;
    }
    if (adminCode !== "2043") {
      setError("Invalid admin code");
      return;
    }

    try {
      // Generate a simple token (in a real app, this would come from your backend)
      const adminToken = btoa(`${adminName}:${adminCode}`);
      
      // Store admin data in localStorage
      localStorage.setItem('adminName', adminName);
      localStorage.setItem('adminToken', adminToken);
      localStorage.setItem('isAdmin', 'true');
      
      // Close modal and redirect to admin dashboard
      router.push("/admin/dashboard");
      setShowAdminModal(false);
    } catch (error) {
      setError("An error occurred during authentication");
    }
  };

  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden bg-white pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[800px] text-center">
                <motion.div
                   initial={{ opacity: 0,x:-500 }}
                   animate={{ opacity: 1,x:0 }}
                   transition={{
                    type: "spring",
                    bounce: 0.4,
                    duration: 1,
                    delay: .5
                }}
                  className="mb-5"
                >
                  <h1 className="relative text-3xl font-extrabold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                    Welcome to the courses of{" "}
                    <span className="relative inline-block">
                      <span className="relative z-10 bg-gradient-to-r from-amber-500 to-yellow-400 bg-clip-text text-transparent">
                        SAMSRIAH SCHOOL
                      </span>
                      <span className="absolute left-0 -bottom-0.5 h-[6px] w-full bg-gradient-to-r from-amber-500/40 to-yellow-400/40 blur-sm"></span>
                      <span className="absolute left-0 -bottom-0.5 h-[3px] w-full bg-gradient-to-r from-amber-500 to-yellow-400"></span>
                    </span>
                  </h1>
                </motion.div>
                <motion.p 
                initial={{ opacity: 0,x:-500 }}
                animate={{ opacity: 1,x:0 }}
                transition={{
                  type: "spring",
                  bounce: 0.4,
                  duration: 1,
                  delay: .7
              }}
                className="mb-12 text-base !leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-xl"
                
                >
                  You can get our courses for free. We are here to help you
                  learn and grow in your career. But you must be a member of our
                  community. Join us today and start your journey to success.
                </motion.p>
                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <motion.a
                   initial={{ opacity: 0,x:-500 }}
                   animate={{ opacity: 1,x:0 }}
                   transition={{
                     type: "spring",
                     bounce: 0.4,
                     duration: 1,
                     delay: .8
                 }}
                    href="/auth/signin"
                    className="rounded-full border-2 border-amber-500 bg-amber-500 px-8 py-4 text-base font-semibold text-white hover:border-2 hover:border-amber-500 hover:bg-white hover:text-amber-500 dark:bg-transparent dark:text-white dark:hover:border-2 dark:hover:border-amber-500 dark:hover:bg-amber-500"
                  >
                    🔥 Get courses
                  </motion.a>
                  <motion.a
                   initial={{ opacity: 0,x:-500 }}
                   animate={{ opacity: 1,x:0 }}
                   transition={{
                     type: "spring",
                     bounce: 0.4,
                     duration: .5,
                     delay: .8
                 }}
                    href="/signin"
                    className="inline-block border rounded-full bg-black px-8 py-4 font-semibold text-white duration-300 ease-in-out hover:text-black hover:border-black hover:bg-white dark:border-2 dark:border-white dark:bg-white dark:text-amber-500 dark:hover:bg-transparent dark:hover:text-amber-500"
                  >
                    SignIn as Admin
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </div>
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
            <defs>
              <linearGradient
                id="paint0_linear_25:217"
                x1="-54.5003"
                y1="-178"
                x2="222"
                y2="288"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <radialGradient
                id="paint1_radial_25:217"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(17.9997 182) rotate(90) scale(18)"
              >
                <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
              </radialGradient>
              <radialGradient
                id="paint2_radial_25:217"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(76.9997 288) rotate(90) scale(34)"
              >
                <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
              </radialGradient>
              <linearGradient
                id="paint3_linear_25:217"
                x1="226.775"
                y1="-66.1548"
                x2="292.157"
                y2="351.421"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_25:217"
                x1="184.521"
                y1="182.159"
                x2="184.521"
                y2="448.882"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_25:217"
                x1="356"
                y1="110"
                x2="356"
                y2="470"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint6_linear_25:217"
                x1="118.524"
                y1="29.2497"
                x2="166.965"
                y2="338.63"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 z-[-1] opacity-30 lg:opacity-100">
          <svg
            width="364"
            height="201"
            viewBox="0 0 364 201"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.88928 72.3303C33.6599 66.4798 101.397 64.9086 150.178 105.427C211.155 156.076 229.59 162.093 264.333 166.607C299.076 171.12 337.718 183.657 362.889 212.24"
              className="stroke-amber-500"
            />
            <path
              d="M-22.1107 72.3303C5.65989 66.4798 73.3965 64.9086 122.178 105.427C183.155 156.076 201.59 162.093 236.333 166.607C271.076 171.12 309.718 183.657 334.889 212.24"
              className="stroke-amber-500"
            />
            <path
              d="M-53.1107 72.3303C-25.3401 66.4798 42.3965 64.9086 91.1783 105.427C152.155 156.076 170.59 162.093 205.333 166.607C240.076 171.12 278.718 183.657 303.889 212.24"
              className="stroke-amber-500"
            />
            <path
              d="M-98.1618 65.0889C-68.1416 60.0601 4.73364 60.4882 56.0734 102.431C120.248 154.86 139.905 161.419 177.137 166.956C214.37 172.493 255.575 186.165 281.856 215.481"
              className="stroke-amber-500"
            />
            <circle
              opacity="0.8"
              cx="214.505"
              cy="60.5054"
              r="49.7205"
              transform="rotate(-13.421 214.505 60.5054)"
              className="stroke-amber-500"
            />
            <circle cx="220" cy="63" r="43" className="fill-rose-500" />
            <defs>
              <linearGradient
                id="paint0_linear_25:218"
                x1="184.389"
                y1="69.2405"
                x2="184.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_25:218"
                x1="156.389"
                y1="69.2405"
                x2="156.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_25:218"
                x1="125.389"
                y1="69.2405"
                x2="125.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_25:218"
                x1="93.8507"
                y1="67.2674"
                x2="89.9278"
                y2="210.214"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_25:218"
                x1="214.505"
                y1="10.2849"
                x2="212.684"
                y2="99.5816"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <radialGradient
                id="paint5_radial_25:218"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(220 63) rotate(90) scale(43)"
              >
                <stop offset="0.145833" stopColor="white" stopOpacity="0" />
                <stop offset="1" stopColor="white" stopOpacity="0.08" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* Admin Authentication Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-dark">
            <div className="mb-6 flex justify-between">
              <h3 className="text-2xl font-bold text-black dark:text-white">Admin Authentication</h3>
              <button
                onClick={() => setShowAdminModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {error && (
              <div className="mb-4 text-center text-red-500">
                {error}
              </div>
            )}
            <form onSubmit={handleAdminSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full rounded-full border border-gray-300 bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-amber-500 dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-amber-500 dark:focus:shadow-none"
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  placeholder="Enter admin code"
                  className="w-full rounded-full border border-gray-300 bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-amber-500 dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-amber-500 dark:focus:shadow-none"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-amber-500 px-6 py-3 text-base font-medium text-white shadow-submit duration-300 hover:bg-amber-600 dark:shadow-submit-dark"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
