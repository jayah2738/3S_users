'use client'
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiBell, FiMenu, FiSun, FiMoon, FiSettings, FiLogOut, FiUser } from "react-icons/fi";

const TopBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const notifications = [
    { id: 1, text: "New message received", unread: true },
    { id: 2, text: "System update available", unread: true },
    { id: 3, text: "Meeting reminder", unread: false }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  // const toggleDarkMode = () => {
  //   setIsDarkMode(!isDarkMode);
  //   document.getElementById('tpbar').classList.toggle("bg-white");
  //   document.getElementById('tpbar').classList.toggle("shadow-white");
  // };

  const toggleDarkMode = () => setDarkMode(!darkMode);


  return (
    <div id="tpbar" 
    className={` bg-card bg-white shadow-md  w-full h-16 ${
      darkMode ? "text-gray-300 bg-dark" : "text-gray-700 "
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src="/imagesAdmin/user/logo1.png "
              alt="Dashboard Logo"
              className="h-8 w-auto"
              // onError={(e) => {
              //   e.target.src = "https://images.unsplash.com/photo-1664575602276-acd073f104c1";
              // }}
            />
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-green-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border-2 rounded-full leading-5 bg-transparent placeholder-accent focus:outline-none focus:border-amber-500 focus:ring-ring focus:border-ring sm:text-sm"
                placeholder="Search dashboard..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="p-2 rounded-full hover:bg-muted">
                <FiBell className="h-6 w-6 text-gray-500" />
                {unreadCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-0 right-0 h-5 w-5 rounded-full bg-red-500 bg-destructive text-white text-xs flex items-center justify-center"
                  >
                    {unreadCount}
                  </motion.span>
                )}
              </button>
            </motion.div>

            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-muted text-gray-500"
              
            >
              {darkMode ? (
                <FiSun className="h-6 w-6 text-accent" />
              ) : (
                <FiMoon className="h-6 w-6 text-accent" />
              )}
            </motion.button>

            {/* User Profile Dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3"
              >
                <motion.img
                  src="/imagesAdmin/user/user-01.jpg"
                  alt="User avatar"
                  className="h-8 w-8 rounded-full"
                  // onError={(e) => {
                  //   e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde";
                  // }}
                />
              </motion.button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-card ring-1 ring-black ring-opacity-5"
                  >
                    <div className="py-1" role="menu">
                      <button className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted" role="menuitem">
                        <FiUser className="mr-3" /> Profile
                      </button>
                      <button className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted" role="menuitem">
                        <FiSettings className="mr-3" /> Settings
                      </button>
                      <button className="flex items-center w-full px-4 py-2 text-sm text-destructive hover:bg-muted" role="menuitem">
                        <FiLogOut className="mr-3" /> Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md hover:bg-muted"
              >
                <FiMenu className="h-6 w-6 text-accent" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div className="px-3 py-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="h-5 w-5 text-accent" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-input rounded-md leading-5 bg-background placeholder-accent focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring sm:text-sm"
                    placeholder="Search dashboard..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TopBar;