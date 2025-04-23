"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  FiSearch,
  FiMenu,
  FiUsers,
  FiBook,
  FiGrid,
  FiMessageSquare,
  FiTrash2,
  FiEdit2,
  FiPlus
} from "react-icons/fi";
import { debounce } from "lodash";
import { courseMaterialsData } from "./Admin";
import VideoUploadForm from "./VideoUploader";
import PdfUploadForm from "./PdfUploader";
import { useSession } from 'next-auth/react';

interface File {
  _id: string;
  title: string;
  type: string;
  grade: string;
  path: string;
  createdAt: string;
}

interface Announcement {
  _id: string;
  title: string;
  content: string;
  targetGrade: string;
  type: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("files");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSection, setSelectedSection] = useState("all");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [fileType, setFileType] = useState("all");
  const [files, setFiles] = useState<File[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [announcementData, setAnnouncementData] = useState({
    title: '',
    content: '',
    targetGrade: '',
    type: 'general',
  });

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

  useEffect(() => {
    fetchFiles();
    fetchAnnouncements();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await fetch('/api/files');
      const data = await res.json();
      setFiles(data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch('/api/announcements');
      const data = await res.json();
      setAnnouncements(data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const handleDeleteFile = async (id: string) => {
    if (confirm('Are you sure you want to delete this file?')) {
      try {
        await fetch(`/api/files?id=${id}`, { method: 'DELETE' });
        fetchFiles();
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    if (confirm('Are you sure you want to delete this announcement?')) {
      try {
        await fetch(`/api/announcements?id=${id}`, { method: 'DELETE' });
        fetchAnnouncements();
      } catch (error) {
        console.error('Error deleting announcement:', error);
      }
    }
  };

  const handleSubmitAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(announcementData),
      });
      setShowAnnouncementForm(false);
      setAnnouncementData({
        title: '',
        content: '',
        targetGrade: '',
        type: 'general',
      });
      fetchAnnouncements();
    } catch (error) {
      console.error('Error creating announcement:', error);
    }
  };

  const renderDashboardContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 bg-white">
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
      case "files":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <VideoUploadForm onUploadSuccess={fetchFiles} />
              <PdfUploadForm onUploadSuccess={fetchFiles} />
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Uploaded Files</h2>
              <div className="space-y-4">
                {files.map((file) => (
                  <div
                    key={file._id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium">{file.title}</h3>
                      <p className="text-sm text-gray-500">
                        {file.type.toUpperCase()} - Grade {file.grade}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDeleteFile(file._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "announcements":
        return (
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Announcements</h2>
                <button
                  onClick={() => setShowAnnouncementForm(true)}
                  className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  <FiPlus />
                  <span>New Announcement</span>
                </button>
              </div>

              {showAnnouncementForm && (
                <form onSubmit={handleSubmitAnnouncement} className="mb-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      type="text"
                      value={announcementData.title}
                      onChange={(e) =>
                        setAnnouncementData({
                          ...announcementData,
                          title: e.target.value,
                        })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Content
                    </label>
                    <textarea
                      value={announcementData.content}
                      onChange={(e) =>
                        setAnnouncementData({
                          ...announcementData,
                          content: e.target.value,
                        })
                      }
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Target Grade
                    </label>
                    <select
                      value={announcementData.targetGrade}
                      onChange={(e) =>
                        setAnnouncementData({
                          ...announcementData,
                          targetGrade: e.target.value,
                        })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Grade</option>
                      <option value="all">All Grades</option>
                      <option value="grade1">Grade 1</option>
                      <option value="grade2">Grade 2</option>
                      <option value="grade3">Grade 3</option>
                      <option value="grade4">Grade 4</option>
                      <option value="grade5">Grade 5</option>
                      <option value="grade6">Grade 6</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Type
                    </label>
                    <select
                      value={announcementData.type}
                      onChange={(e) =>
                        setAnnouncementData({
                          ...announcementData,
                          type: e.target.value,
                        })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    >
                      <option value="general">General</option>
                      <option value="academic">Academic</option>
                      <option value="event">Event</option>
                    </select>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowAnnouncementForm(false)}
                      className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Create Announcement
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div
                    key={announcement._id}
                    className="border rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{announcement.title}</h3>
                        <p className="text-sm text-gray-500">
                          {announcement.type} - {announcement.targetGrade}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteAnnouncement(announcement._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                    <p className="mt-2 text-gray-700">{announcement.content}</p>
                    <p className="mt-2 text-sm text-gray-500">
                      Posted on{' '}
                      {new Date(announcement.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "students":
        return (
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            
          </div>
        );
      case "teachers":
        return (
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 ">
            
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
            onClick={() => setActiveTab("files")}
            className={`flex w-full items-center p-4 ${activeTab === "files" ? "bg-blue-50 text-amber-500" : "text-gray-600"} hover:bg-blue-50 hover:text-green-600`}
          >
            <FiBook className="text-xl" />
            {isSidebarOpen && <span className="ml-4">Files</span>}
          </button>
          <button
            onClick={() => setActiveTab("announcements")}
            className={`flex w-full items-center p-4 ${activeTab === "announcements" ? "bg-blue-50 text-amber-500" : "text-gray-600"} hover:bg-blue-50 hover:text-green-600`}
          >
            <FiMessageSquare className="text-xl" />
            {isSidebarOpen && <span className="ml-4">Announcements</span>}
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
            <FiMessageSquare  className="text-xl" />
            {isSidebarOpen && <span className="ml-4">SendInfo</span>}
          </button>
          {/* <button className="flex w-full items-center p-4 text-red-600 hover:bg-red-50">
            <FiLogOut className="text-xl" />
            {isSidebarOpen && <span className="ml-4">Logout</span>}
          </button> */}
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
