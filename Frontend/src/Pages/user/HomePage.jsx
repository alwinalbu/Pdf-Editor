import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaFileAlt,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { commonRequest } from "../../utlis/commonRequest";

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await commonRequest("POST", "/logout", {}, { withCredentials: true });
      localStorage.removeItem("userInfo");
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Logout failed!",
        text: "Please try again later.",
        showConfirmButton: true,
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed!");
      setSelectedFile(null);
      return;
    }
    setSelectedFile(file);
  };


const handleFileUpload = async (e) => {
  e.preventDefault();
  if (!selectedFile) {
    toast.error("Please select a file to upload.");
    return;
  }

  const formData = new FormData();
  formData.append("file", selectedFile);

  // Log each key-value pair in the FormData object
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  try {
    const response = await commonRequest("POST", "/upload", formData, {
      "Content-Type": "multipart/form-data",
    });

    console.log(response,"response here");
    
   if (response.status === 201) {
     toast.success("File uploaded successfully!");
   } else {
     toast.error(response.data.message || "Failed to upload the file.");
   }
  } catch (error) {
    toast.error("Failed to upload the file.");
  }
};


  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-4 text-white bg-gray-800"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-gray-800 h-full p-4 text-white transition-transform duration-300 ease-in-out transform md:translate-x-0 fixed md:relative z-50`}
      >
        <div className="flex flex-col items-center">
          {/* <img
            src="/src/assets/logo-new.png"
            alt="Logo"
            className="h-10 mb-6"
          /> */}
          <nav className="flex flex-col w-full">
            <NavLink
              to="/home"
              className="flex items-center px-4 py-2 mb-2 text-gray-300 hover:bg-red-500 hover:text-white rounded"
            >
              <FaHome className="mr-3" /> Home
            </NavLink>
            <NavLink
              to="/about"
              className="flex items-center px-4 py-2 mb-2 text-gray-300 hover:bg-red-500 hover:text-white rounded"
            >
              <FaInfoCircle className="mr-3" /> About
            </NavLink>
            <NavLink
              to="/documents"
              className="flex items-center px-4 py-2 mb-2 text-gray-300 hover:bg-red-500 hover:text-white rounded"
            >
              <FaFileAlt className="mr-3" /> Documents
            </NavLink>
            <NavLink
              to="/profile"
              className="flex items-center px-4 py-2 mb-2 text-gray-300 hover:bg-red-500 hover:text-white rounded"
            >
              <FaUser className="mr-3" /> Profile
            </NavLink>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 mt-auto text-gray-300 hover:bg-red-500 hover:text-white rounded"
            >
              <FaSignOutAlt className="mr-3" /> Logout
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold mb-4">Upload Your PDF</h1>

        {/* PDF Upload Form */}
        <form
          onSubmit={handleFileUpload}
          className="flex flex-col items-center"
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="mb-4 p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
          >
            Upload PDF
          </button>
        </form>
      </main>
    </div>
  );
};

export default HomePage;
