"use client";
import Link from "next/link";
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [grade, setGrade] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn('credentials', {
        redirect: false,
        username: email,
        password,
        grade,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/courses');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login');
    }
  };

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[500px] rounded-lg bg-white px-6 py-10 shadow-md shadow-amber-500 backdrop-blur-sm dark:bg-black/80 sm:p-[60px]">
                <div className="mb-6 flex justify-start">
                  <Link
                    href="/"
                    className="flex items-center text-base font-medium text-body-color hover:text-amber-500 dark:text-body-color-dark dark:hover:text-amber-500"
                  >
                    <svg
                      className="mr-2 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Previous
                  </Link>
                </div>
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Sign in to your account
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                  Login to your account for a faster checkout.
                </p>

                {error && (
                  <div className="mb-4 text-center text-red-500">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-8">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your Email"
                      className="border-stroke w-full rounded-full border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-amber-500 dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-amber-500 dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-8">
                    <input
                      type="text"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      placeholder="Enter your Grade"
                      className="border-stroke w-full rounded-full border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-amber-500 dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-amber-500 dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-8">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your Password"
                      className="border-stroke w-full rounded-full border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-amber-500 dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-amber-500 dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-6">
                    <button type="submit" className="flex w-full items-center justify-center border-2 border-amber-500 rounded-full bg-amber-500 px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-transparent dark:shadow-submit-dark">
                      Sign in
                    </button>
                  </div>
                </form>
                <p className="text-center text-base font-medium text-body-color">
                  Don't have an account?{" "}
                  <Link href="/auth/signup" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage; 