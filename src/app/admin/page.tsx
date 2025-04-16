"use client";
import React, { useState, useMemo } from "react";
import {
  FiSearch,
  FiMenu,
  FiUsers,
  FiBook,
  FiVideo,
  FiFileText,
  FiSettings,
  FiLogOut,
  FiGrid,
  FiPlusCircle,
  FiEdit3,
  FiTrash2,
} from "react-icons/fi";
import { debounce } from "lodash";
import { courseMaterialsData } from "./Admin";
import { StudentsGradeStatsData } from "./Admin";
import { TeacherStatsData } from "./Admin";
import VideoUploadAndGallery from "@/components/VideosUploader/VideoUploader";



const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSection, setSelectedSection] = useState("all");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [fileType, setFileType] = useState("all");

  const debouncedSearch = useMemo(
    () => debounce((query: string) => setSearchQuery(query), 300),
    [],
  );

  const filteredItems = useMemo(() => {
    let items = [...courseMaterialsData];

    if (searchQuery) {
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.subject.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedSection !== "all") {
      items = items.filter((item) => item.section === selectedSection);
    }

    if (selectedGrade !== "all") {
      items = items.filter((item) => item.grade === selectedGrade);
    }

    if (selectedSubject !== "all") {
      items = items.filter((item) => item.subject === selectedSubject);
    }

    if (fileType !== "all") {
      items = items.filter((item) => item.type === fileType);
    }

    return items;
  }, [searchQuery, selectedSection, selectedGrade, selectedSubject, fileType]);

  const dashboardStats = {
    totalStudents: 1250,
    totalTeachers: 45,
    totalClasses: 32,
    totalCourses: 156,
  };

  const renderDashboardContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Students</p>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {dashboardStats.totalStudents}
                  </h3>
                </div>
                <FiUsers className="text-3xl text-blue-500" />
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Teachers</p>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {dashboardStats.totalTeachers}
                  </h3>
                </div>
                <FiUsers className="text-3xl text-green-500" />
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Classes</p>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {dashboardStats.totalClasses}
                  </h3>
                </div>
                <FiGrid className="text-3xl text-purple-500" />
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Courses</p>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {dashboardStats.totalCourses}
                  </h3>
                </div>
                <FiBook className="text-3xl text-orange-500" />
              </div>
            </div>
          </div>
        );
      case "materials":
        return (
          <div>
            <div className="mb-6 flex flex-wrap gap-4">
              <select
                className="rounded-lg border px-4 py-2"
                onChange={(e) => setSelectedSection(e.target.value)}
              >
                <option value="all">All Sections</option>
                <option value="Preschool">Preschool</option>
                <option value="primary">Primary</option>
                <option value="middle">Middle</option>
                <option value="high">High</option>
              </select>
              <select
                className="rounded-lg border px-4 py-2"
                onChange={(e) => setSelectedGrade(e.target.value)}
              >
                <option value="all">All Grades</option>
                <option value="TPS">TPS</option>
                <option value="PS">PS</option>
                <option value="MS">MS</option>
                <option value="GS">GS</option>
                <option value="Grade 1">Grade 1</option>
                <option value="Grade 2">Grade 2</option>
                <option value="Grade 3">Grade 3</option>
                <option value="Grade 4">Grade 4</option>
                <option value="Grade 5">Grade 5</option>
                <option value="Grade 6">Grade 6</option>
                <option value="Grade 7">Grade 7</option>
                <option value="Grade 8">Grade 8</option>
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 11 L">Grade 11 L</option>
                <option value="Grade 11 OSE">Grade 11 OSE</option>
                <option value="Grade 11 S">Grade 11 S</option>
                <option value="Grade 12 L">Grade 12 L</option>
                <option value="Grade 12 OSE">Grade 12 OSE</option>
                <option value="Grade 12 S">Grade 12 S</option>
              </select>
              <select
                className="rounded-lg border px-4 py-2"
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="all">All Subjects</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry ">Chemistry</option>
                <option value="Malagasy">Malagasy</option>
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="History">History</option>
                <option value="Geography">Geography</option>
                <option value="Science">Science</option>
                <option value="EAC">EAC</option>
                <option value="SES">SES</option>
                <option value="Informatics">Informatics</option>
                <option value="Sports">Sports</option>
              </select>
              <select
                className="rounded-lg border px-4 py-2"
                onChange={(e) => setFileType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="video">Videos</option>
                <option value="pdf">PDFs</option>
              </select>
              <button className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-white hover:bg-amber-600">
                <FiPlusCircle /> Upload New Material
              </button>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredItems.map((item, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg bg-white shadow-md hover:shadow-orange-500"
                >
                  <div className="p-4" id={item.id.toString()}>
                    <div className="mb-2 flex items-center gap-2">
                      {item.type === "video" ? (
                        <FiVideo className="text-amber-500" />
                      ) : (
                        <FiFileText className="text-red-500" />
                      )}
                      <h3 className="text-lg font-bold text-gray-800">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      {"Section"} - {item.section}
                    </p>
                    <p className="text-sm text-gray-600">
                      {item.grade} - {item.subject}
                    </p>
                    <p className="text-sm text-gray-500">
                      Upload Date: {item.uploadDate}
                    </p>
                    <p className="text-sm text-gray-500">
                      File Size: {item.fileSize}
                    </p>
                    <div className="mt-4 flex gap-2">
                      <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600">
                        <FiEdit3 /> Edit
                      </button>
                      <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600">
                        <FiTrash2 /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <VideoUploadAndGallery/>
          </div>
        );
      case"students":
        return (
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {StudentsGradeStatsData.map((stat, index) => (
              <div
                key={index}
                id={stat.id.toString()}
                className="rounded-lg bg-white p-6 shadow-lg hover:shadow-orange-500"
              >
                <div className="">
                  <div className="place-items-center">
                    <p className="text-xl font-bold text-gray-500">
                      Grade:{" "}
                      <span className="text-green-500"> {stat.grade}</span>
                    </p>
                    <h3 className="text-xl  text-gray-800">
                      <span className="text-gray-500">Boys:</span> {""}{" "}
                      {stat.boy}
                    </h3>
                    <h3 className="text-xl  text-gray-800">
                      <span className="text-gray-500">Girls:</span> {""}{" "}
                      {stat.girl}
                    </h3>
                    <h3 className="text-xl  text-gray-800">
                      <span className="text-red-500">Totals:</span>
                      {""} {stat.boy + stat.girl}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case "teachers":
        return (
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 ">
            {TeacherStatsData.map((teach, index) => (
              <div
                key={index}
                id={teach.id.toString()}
                className="rounded-lg w-auto bg-white p-6 shadow-lg hover:shadow-orange-500 overflow-hidden"
              >
                <div className="">
                  <div className="">
                    <p className="text-xl text-center font-bold text-gray-500">
                      Name:{" "}
                      <span className="text-green-500"> {teach.nom}</span>
                    </p>
                    <h3 className="text-xl  text-gray-800">
                      <span className="text-gray-500"></span> {""}{" "}
                      {teach.subject}
                    </h3>
                    <h3 className="text-xl  text-gray-800">
                      <span className="text-gray-500">Grades:</span> {""}{" "}
                      {teach.grade}
                    </h3>
                    <h3 className="text-xl  text-gray-800">
                      <span className="text-red-500">Section:</span>
                      {""} {teach.teacherSection}
                    </h3>
                    <h3 className="text-xl  text-gray-800">
                      <span className="text-red-500">Option:</span>
                      {""} {teach.option}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      default: return <div className="text-center">coming soon......</div>
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div
        className={`fixed z-20 h-full bg-white shadow-lg transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"}`}
      >
        <div className="flex items-center justify-between p-4">
          <h1
            className={`text-xl font-bold text-gray-800 ${!isSidebarOpen && "hidden"}`}
          >
            School Admin
          </h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="rounded-lg bg-gray-700 p-2 hover:bg-green-400"
          >
            <FiMenu className="text-xl" />
          </button>
        </div>
        <nav className="mt-8">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex w-full items-center p-4 ${activeTab === "dashboard" ? "bg-blue-50 text-amber-500" : "text-gray-600"} hover:bg-blue-50 hover:text-green-600`}
          >
            <FiGrid className="text-xl" />
            {isSidebarOpen && <span className="ml-4">Dashboard</span>}
          </button>
          <button
            onClick={() => setActiveTab("materials")}
            className={`flex w-full items-center p-4 ${activeTab === "materials" ? "bg-blue-50 text-amber-500" : "text-gray-600"} hover:bg-blue-50 hover:text-green-600`}
          >
            <FiBook className="text-xl" />
            {isSidebarOpen && <span className="ml-4">Learning Materials</span>}
          </button>
          <button
            onClick={() => setActiveTab("students")}
            className={`flex w-full items-center p-4 ${activeTab === "students" ? "bg-blue-50 text-amber-500" : "text-gray-600"} hover:bg-blue-50 hover:text-green-600`}
          >
            <FiUsers className="text-xl" />
            {isSidebarOpen && <span className="ml-4">Students</span>}
          </button>
          <button
            onClick={() => setActiveTab("teachers")}
            className={`flex w-full items-center p-4 ${activeTab === "teachers" ? "bg-blue-50 text-amber-500" : "text-gray-600"} hover:bg-blue-50 hover:text-green-600`}
          >
            <FiUsers className="text-xl" />
            {isSidebarOpen && <span className="ml-4">Teachers</span>}
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex w-full items-center p-4 ${activeTab === "settings" ? "bg-blue-50 text-amber-500" : "text-gray-600"} hover:bg-blue-50 hover:text-green-600`}
          >
            <FiSettings className="text-xl" />
            {isSidebarOpen && <span className="ml-4">Settings</span>}
          </button>
          <button className="flex w-full items-center p-4 text-red-600 hover:bg-red-50">
            <FiLogOut className="text-xl" />
            {isSidebarOpen && <span className="ml-4">Logout</span>}
          </button>
        </nav>
      </div>

      <div
        className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"}`}
      >
        <header className="sticky top-0 z-10 bg-white shadow-md">
          <div className="container mx-auto flex items-center justify-between px-4 py-4">
            <div className="relative max-w-xl flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full rounded-lg border border-gray-600 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-500"
                onChange={(e) => debouncedSearch(e.target.value)}
              />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {renderDashboardContent()}
        </main>
      </div>
    </div>
  );
};
export default AdminDashboard;
