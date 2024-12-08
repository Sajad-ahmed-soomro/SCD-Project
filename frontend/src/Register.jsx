import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Ensure routing is set up
import {weblogo} from "./webProject_Logo.png";

const Register = () => {
  const [formData, setFormData] = useState({
    userType: "user",
    name: "",
    email: "",
    password: "",
    contactNumber: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint =
      formData.userType === "sponsor"
        ? "http://localhost:5000/api/users/register/sponsor"
        : "http://localhost:5000/api/users/register";

    const dataToSend =
      formData.userType === "sponsor"
        ? {
          name: formData.name,
          email: formData.email,
          contactNumber: formData.contactNumber,
        }
        : {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        };

    try {
      const response = await axios.post(endpoint, dataToSend);
      alert(response.data.message);
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );
    }
  };

  return (
    <div style={{ width: "100vh", height: "100vh" }}>
      {/* Animated Background */}
      <div
        style={{ height: "100vh" }}
        className="absolute inset-0 bg-gradient-to-r from-[#17a2b8] via-[#fff] to-[#a649a6] animate-gradient blur-2xl -z-10"
      ></div>

      {/* Logo on Left */}
      <div className="fixed top-0 left-0">
        <img src={weblogo} alt="Logo" className="object-cover" />
      </div>

      {/* Centered Registration Form */}
      <div>
        <div
          style={{ marginLeft: "70%", width: "70%", marginTop: "4%" }}
          className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg "
        >
          <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>
          <p className="text-gray-500 text-center mb-6">
            Create Your Account for SAS Events!
          </p>
          <p className="text-gray-500 text-center mb-6">
            Fill in the form below to get started.
          </p>

          <form onSubmit={handleSubmit}>
            {/* User Type Selection */}
            <div className="mb-4">
              <label className="block text-gray-700">User Type</label>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="user">Normal User</option>
                <option value="sponsor">Sponsor</option>
              </select>
            </div>

            {/* Name Input */}
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password Input for Normal Users */}
            {formData.userType === "user" && (
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {/* Contact Number Input for Sponsors */}
            {formData.userType === "sponsor" && (
              <div className="mb-4">
                <label className="block text-gray-700">Contact Number</label>
                <input
                  type="text"
                  name="contactNumber"
                  placeholder="Enter your contact number"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#3498db] text-white py-2 px-4 rounded-md hover:bg-[#3498db99] hover:-translate-y-1 hover:shadow-lg transition-transform duration-300 focus:outline-none"
            >
              Register
            </button>
          </form>

          <p className="text-gray-500 text-center mt-4">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
