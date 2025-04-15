'use client'
import React, { useState, useMemo } from "react";
import Sidebar from "./SideBar";
import TopBar from "./TopBar";
import { FiSearch, FiMenu, FiUsers, FiBook, FiVideo, FiFileText, FiSettings, FiLogOut, FiGrid, FiPlusCircle, FiEdit3, FiTrash2 } from "react-icons/fi";
import { debounce } from "lodash";
import courseMaterials from './Admin'


const AdminPages = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSection, setSelectedSection] = useState("all");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [fileType, setFileType] = useState("all");

  const debouncedSearch = useMemo(() => 
    debounce((query: string) => setSearchQuery(query), 300), 
    []
  );

  const filteredItems = useMemo(() => {
    let items = [...courseMaterials];

    if (searchQuery) {
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.subject.toLowerCase().includes(searchQuery.toLowerCase())
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
  }, [searchQuery, selectedSection,selectedGrade, selectedSubject, fileType]);

  const dashboardStats = {
    totalStudents: 1250,
    totalTeachers: 45,
    totalClasses: 32,
    totalCourses: 156
  };

  const renderDashboardContent = () => {
    switch(activeTab) {
      case "dashboard":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Students</p>
                  <h3 className="text-2xl font-bold text-gray-800">{dashboardStats.totalStudents}</h3>
                </div>
                <FiUsers className="text-3xl text-blue-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Teachers</p>
                  <h3 className="text-2xl font-bold text-gray-800">{dashboardStats.totalTeachers}</h3>
                </div>
                <FiUsers className="text-3xl text-green-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Classes</p>
                  <h3 className="text-2xl font-bold text-gray-800">{dashboardStats.totalClasses}</h3>
                </div>
                <FiGrid className="text-3xl text-purple-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Courses</p>
                  <h3 className="text-2xl font-bold text-gray-800">{dashboardStats.totalCourses}</h3>
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
                className="px-4 py-2 border rounded-lg"
                onChange={(e) => setSelectedSection(e.target.value)}
              >
                <option value="all">All Sections</option>
                <option value="Preschool">Preschool</option>
                <option value="primary">Primary</option>
                <option value="middle">Middle</option>
                <option value="high">High</option>
              </select>
              <select 
                className="px-4 py-2 border rounded-lg"
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
                className="px-4 py-2 border rounded-lg"
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
                className="px-4 py-2 border rounded-lg"
                onChange={(e) => setFileType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="video">Videos</option>
                <option value="pdf">PDFs</option>
              </select>
              <button className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 flex items-center gap-2">
                <FiPlusCircle /> Upload New Material
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item,index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-4" id={item.id.toString()} >
                    <div className="flex items-center gap-2 mb-2">
                      {item.type === "video" ? <FiVideo className="text-amber-500" /> : <FiFileText className="text-red-500" />}
                      <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{"Section"} - {item.section}</p>
                    <p className="text-sm text-gray-600">{item.grade} - {item.subject}</p>
                    <p className="text-sm text-gray-500">Upload Date: {item.uploadDate}</p>
                    <p className="text-sm text-gray-500">File Size: {item.fileSize}</p>
                    <div className="mt-4 flex gap-2">
                      <button className="flex-1 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-2">
                        <FiEdit3 /> Edit
                      </button>
                      <button className="flex-1 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center gap-2">
                        <FiTrash2 /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <div className="text-center py-8">Content coming soon...</div>;
    }
  };

  return (
    <div className="flex bg-white">
      
    <Sidebar/>
    <TopBar/>
    </div>
  )
}
export default AdminPages;