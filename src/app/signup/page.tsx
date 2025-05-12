import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up Page | Free Next.js Template for Startup and SaaS",
  description: "This is Sign Up Page for Startup Nextjs Template",
  // other metadata
};

const SignupPage = () => {
  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-md shadow-amber-500 mx-auto max-w-[500px] rounded-lg bg-white px-4 py-6 backdrop-blur-sm dark:bg-black/80 sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Create your account
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                  It’s totally free and super easy
                </p>
                
                <form>
                  <div className="mb-8">
                    {/* <label
                      htmlFor="name"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      {" "}
                      Username{" "}
                    </label> */}
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter your Username"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-full border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-amber-500 dark:border-transparent dark:bg-[#2C303B] dark:focus:border-amber-500 dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-8">
                    {/* <label
                      htmlFor="grade"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      {" "}
                      Grade{" "}
                    </label> */}
                    <input
                      type="text"
                      name="grade"
                      placeholder="Enter your Grade"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-full border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-amber-500 dark:border-transparent dark:bg-[#2C303B] dark:focus:border-amber-500 dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-8">
                    {/* <label
                      htmlFor="password"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      {" "}
                      Your Password{" "}
                    </label> */}
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your Password"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-full border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-amber-500 dark:border-transparent dark:bg-[#2C303B] dark:focus:border-amber-500 dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-8">
                    {/* <label
                      htmlFor="Cpassword"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      {" "}
                      Confirm Your Password{" "}
                    </label> */}
                    <input
                      type="password"
                      name="Cpassword"
                      placeholder="Confirm your Password"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-full border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-amber-500 dark:border-transparent dark:bg-[#2C303B] dark:focus:border-amber-500 dark:focus:shadow-none"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <button className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center border-2 border-amber-500 rounded-full bg-amber-500 px-9 py-4 text-base font-medium text-white duration-300 hover:bg-transparent">
                      Sign up
                    </button>
                  </div>
                </form>
                <p className="text-center text-base font-medium text-body-color">
                  Already using 3SApp?{" "}
                  <Link href="/signin" className="text-green-500 hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.4"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                className="fill-amber-500"
              />
              <path
                opacity=".4"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                className="fill-amber-500"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default SignupPage;
