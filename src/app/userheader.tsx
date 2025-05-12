"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggler from "@/components/Header/ThemeToggler";
import { FiUser, FiBook, FiHome, FiLogOut } from 'react-icons/fi';

interface HeaderProps {
  username?: string;
  grade?: string;
}

const UserHeader = ({ username, grade }: HeaderProps) => {
  const [sticky, setSticky] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY >= 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      sticky ? 'bg-white/80 backdrop-blur-md shadow-md dark:bg-gray-900/80' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/logo/logo1.png"
              alt="Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="text-xl font-bold text-gray-800 dark:text-white"><span className="text-amber-500">SamSriah</span> School</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/"
              className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
                pathname === '/' 
                  ? 'text-amber-500' 
                  : 'text-gray-600 hover:text-amber-500 dark:text-gray-300 dark:hover:text-amber-500'
              }`}
            >
              <FiHome className="w-5 h-5" />
              <span>Home</span>
            </Link>
            <Link 
              href={`/lessons/${grade}`}
              className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
                pathname.startsWith('/lessons/[grade]') 
                  ? 'text-amber-500' 
                  : 'text-gray-600 hover:text-amber-500 dark:text-gray-300 dark:hover:text-amber-500'
              }`}
            >
              <FiBook className="w-5 h-5" />
              <span>Lessons</span>
            </Link>
            <Link 
              href={`/exercises/${grade}`}
              className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
                pathname.startsWith('/exercises/[grade]') 
                  ? 'text-amber-500' 
                  : 'text-gray-600 hover:text-amber-500 dark:text-gray-300 dark:hover:text-amber-500'
              }`}
            >
              <FiBook className="w-5 h-5" />
              <span>Exercises</span>
            </Link>
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            <ThemeToggler />
            
            <div className="hidden md:flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-3 py-2 rounded-full bg-gray-100 dark:bg-gray-800">
                <FiUser className="w-5 h-5 text-amber-500" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800 dark:text-white">{username}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Grade {grade}</span>
                </div>
              </div>
              
              <Link 
                href="/api/auth/signout"
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <FiLogOut className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserHeader; 