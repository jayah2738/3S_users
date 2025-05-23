'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Logo from '../../../public/images/logo/3s.png'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function SignIn() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/admin/dashboard');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-pink-500 to-blue-500 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md space-y-8 rounded-2xl border-white p-8 ">
        <div className="text-center">
          <div className="mx-auto h-[80px] w-[80px]">
            <Image
              src={Logo}
              alt="School Logo"
              width={100}
              height={100}
              className="mx-auto rounded-full"
            />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white dark:text-white">
            Admin Portal
          </h2>
          <p className="mt-2 text-sm text-white dark:text-gray-400">
            Sign in to access the admin dashboard
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/50">
              <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="relative block w-full bg-transparent placeholder:text-white rounded-md border-b-2 focus:border-0 p-2 text-gray-900 ring-inset ring-amber-500 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-green-500 outline-none focus:rounded-full dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-400 sm:text-sm sm:leading-6"
                placeholder="Username"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block bg-transparent placeholder:text-white w-full border-b-2 rounded-md outline-none p-2 text-gray-900 focus:border-0 ring-inset ring-amber-500 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-green-500 focus:rounded-full dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-400 sm:text-sm sm:leading-6"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className='flex w-full place-items-center justify-center'>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-[70%] justify-center rounded-full bg-amber-500 px-3 py-3 text-sm font-semibold text-white hover:bg-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 