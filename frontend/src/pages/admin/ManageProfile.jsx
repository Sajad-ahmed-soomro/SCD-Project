import React, { useState, useEffect } from 'react';
import { FaUserEdit, FaSave, FaCamera } from 'react-icons/fa'; // Icons for actions

import profileImage from "../../../src/assets/profile.jpg"; // Import the profile image from the assets folder


const AdminProfile = () => {
    const [admin, setAdmin] = useState({
        name: '',
        email: '',
        photo: '', // Adding a photo field
        status: 'Active',
        password: '', // Add password field
    });
    const [isEditing, setIsEditing] = useState(false);
    const [newPhoto, setNewPhoto] = useState(null); // Track new photo
    const [photoUrl, setPhotoUrl] = useState(''); // Track photo URL input

    useEffect(() => {
        const fetchAdminProfile = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admin/profile');
                if (response.ok) {
                    const data = await response.json();
                    setAdmin({
                        ...data,
                        photo: data.photo || "", // Ensure there's a photo URL if it exists
                    });
                } else {
                    console.error('Failed to fetch profile:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching admin profile:', error);
            }
        };
        fetchAdminProfile();
    }, []); // Run once

    const handleInputChange = (e) => {
        setAdmin({
            ...admin,
            [e.target.name]: e.target.value
        });
    };

    const handleSaveChanges = async () => {
        try {
            const formData = new FormData();
            formData.append('name', admin.name);
            formData.append('email', admin.email);
            formData.append('status', admin.status);
            formData.append('password', admin.password); // Append the password if changed
            if (newPhoto) {
                formData.append('photo', newPhoto); // Append the photo file
            } else if (photoUrl) {
                formData.append('photoUrl', photoUrl); // Append the photo URL if provided
            }

            const response = await fetch('http://localhost:5000/api/admin/update', {
                method: 'PUT',
                body: formData, // Send FormData instead of JSON
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    alert('Profile updated successfully!');
                    setAdmin(data.admin); // Update admin details from the response
                    setIsEditing(false);
                } else {
                    alert('Failed to update profile. Please try again.');
                }
            } else {
                console.error('Server error: ', response.statusText);
                alert('Server error occurred. Please try again later.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewPhoto(file); // Store the new photo
            const reader = new FileReader();
            reader.onloadend = () => {
                setAdmin((prevState) => ({ ...prevState, photo: reader.result })); // Update the profile picture preview
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileInputClick = () => {
        if (isEditing) {
            document.getElementById('photoInput').click(); // Trigger file input click when editing
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-center mb-6">Manage Profile</h2>

            <div className="flex justify-center mb-6 relative">
                {/* Admin Avatar */}
                <div className="relative">
                    <img
                        src={profileImage || admin.photo} // Use the URL path from the assets folder
                        alt="Admin Avatar"
                        className="w-32 h-32 rounded-full border-4 border-blue-600 object-cover"
                    />
                    {/* Camera Icon */}
                    <div
                        className={`absolute bottom-0 right-0 p-2 rounded-full ${isEditing ? 'bg-blue-600 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'
                            }`}
                        onClick={handleFileInputClick} // Only clickable when editing
                    >
                        <FaCamera className="text-white" />
                    </div>
                </div>

                {/* Hidden file input */}
                <input
                    type="file"
                    id="photoInput"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={!isEditing} // Disable input when not editing
                />
            </div>

            <div className="space-y-6">
                {/* Name */}
                <div className="flex flex-col space-y-2">
                    <label className="text-xl font-medium text-gray-700">Name:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="name"
                            value={admin.name}
                            onChange={handleInputChange}
                            className="border border-gray-300 p-2 rounded-md w-full"
                        />
                    ) : (
                        <span className="text-gray-700">{admin.name}</span>
                    )}
                </div>

                {/* Email */}
                <div className="flex flex-col space-y-2">
                    <label className="text-xl font-medium text-gray-700">Email:</label>
                    {isEditing ? (
                        <input
                            type="email"
                            name="email"
                            value={admin.email}
                            onChange={handleInputChange}
                            className="border border-gray-300 p-2 rounded-md w-full"
                        />
                    ) : (
                        <span className="text-gray-700">{admin.email}</span>
                    )}
                </div>

                {/* Status */}
                <div className="flex flex-col space-y-2">
                    <label className="text-xl font-medium text-gray-700">Status:</label>
                    {isEditing ? (
                        <select
                            name="status"
                            value={admin.status}
                            onChange={handleInputChange}
                            className="border border-gray-300 p-2 rounded-md w-full"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    ) : (
                        <span className="text-gray-700">{admin.status}</span>
                    )}
                </div>

                {/* Password */}
                {isEditing && (
                    <div className="flex flex-col space-y-2">
                        <label className="text-xl font-medium text-gray-700">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={admin.password}
                            onChange={handleInputChange}
                            className="border border-gray-300 p-2 rounded-md w-full"
                            placeholder="Enter new password"
                        />
                    </div>
                )}

                {/* Photo URL */}
                {isEditing && (
                    <div className="flex flex-col space-y-2">
                        <label className="text-xl font-medium text-gray-700">Profile Photo URL:</label>
                        <input
                            type="text"
                            name="photoUrl"
                            value={photoUrl}
                            onChange={(e) => setPhotoUrl(e.target.value)}
                            className="border border-gray-300 p-2 rounded-md w-full"
                            placeholder="Enter photo URL"
                        />
                    </div>
                )}
            </div>

            {/* Edit and Save Buttons */}
            <div className="mt-8 flex justify-center gap-6">
                {isEditing ? (
                    <>
                        <button
                            onClick={handleSaveChanges}
                            className="flex items-center bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
                        >
                            <FaSave className="mr-2" /> Save Changes
                        </button>
                        <button
                            onClick={handleCancelEdit}
                            className="flex items-center bg-gray-300 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600"
                    >
                        <FaUserEdit className="mr-2" /> Edit Profile
                    </button>
                )}
            </div>
        </div>
    );
};

export default AdminProfile;
