'use client'
import { useState } from "react";
import { motion } from "framer-motion";
import { FiHome, FiUsers, FiSettings, FiBarChart2, FiMail, FiBox, FiLogOut, FiChevronLeft, FiChevronRight, FiBell, FiBookOpen, FiMessageCircle, FiLayers, FiClipboard, FiSunrise } from "react-icons/fi";
import Image from "next/image";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);

  const menuItems = [
    { id: "dashboard", icon: FiHome, label: "Dashboard" },
    { id: "users", icon: FiUsers, label: "Users" },
    { id: "analytics", icon: FiBarChart2, label: "Analytics" },
    { id: "messages", icon: FiMessageCircle, label: "Messages", notifications: 3 },
    { id: "sections", icon: FiBox, label: "Sections" },
    { id: "parentsInfo", icon: FiBookOpen, label: "ParentsInfo" },
    { id: "studentsInfo", icon: FiLayers, label: "StudentsInfo" },
    { id: "teachersInfo", icon: FiClipboard, label: "TeachersInfo" },
    { id: "manageAccounts", icon: FiUsers, label: "ManageAccounts" },
    { id: "settings", icon: FiSettings, label: "Settings" }
  ];

  const toggleSidebar = () => setIsExpanded(!isExpanded);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <motion.div
      initial={{ width: isExpanded ? 240 : 80 }}
      animate={{ width: isExpanded ? 240 : 80 }}
      className={`min-h-screen relative ${darkMode ? "bg-gray-900" : "bg-white"} transition-all duration-300 shadow-xl`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <Image
            width={100}
            height={50}
              src="/imagesAdmin/user/logo1.png"
              alt="Logo"
              className="w-8 h-8 rounded-lg"
            />
            <span className={`font-bold text-xl ${darkMode ? "text-white" : "text-gray-800"}`}>
              SamSriah
            </span>
          </motion.div>
        )}
        <button
          onClick={toggleSidebar}
          className={`p-2 rounded-lg ${darkMode ? "bg-green-400 hover:bg-amber-500" : "hover:bg-amber-500 bg-green-500 xl:bg-gray-100"}`}
        >
          {isExpanded ? <FiChevronLeft size={24} /> : <FiChevronRight size={24} className="text-white  rounded-xl" />}
        </button>
      </div>

      <div className="p-4 overflow-y-scroll h-[600px] xl:h-[700px] ">
        <div className="flex items-center gap-4 mb-8">
          <Image
          width={100}
          height={50}
            src="/imagesAdmin/user/user-01.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          {isExpanded && (
            <div>
              <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
                Haja
              </h3>
              <p className="text-sm text-gray-500">Admin</p>
            </div>
          )}
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveItem(item.id)}
              className={`flex items-center w-full p-3 rounded-full transition-colors ${
                activeItem === item.id
                  ? "bg-amber-500 text-white"
                  : darkMode
                  ? "text-gray-300 hover:bg-gray-800"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon size={24} />
              {isExpanded && (
                <span className="ml-3">{item.label}</span>
              )}
              {item.notifications && isExpanded && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {item.notifications}
                </span>
              )}
            </motion.button>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={toggleDarkMode}
          className={`flex items-center w-full p-3 rounded-lg ${
            darkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <FiSunrise size={20} />
          {isExpanded && <span className="ml-3">Theme</span>}
        </button>
        <button
          className={`flex items-center w-full p-3 rounded-lg ${
            darkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <FiLogOut size={20} />
          {isExpanded && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;