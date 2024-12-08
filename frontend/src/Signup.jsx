import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import signupIllustration from '../assets/signup-illustration.svg'; // Add an illustrative image

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const response = await axios.post('http://localhost:5000/api/admin/update', formData);
            setSuccess(response.data.message);
            setTimeout(() => {
                navigate('/login'); // Redirect to login page after successful signup
            }, 2000);
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.message || 'Something went wrong');
            alert(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500">
            <div className="w-full max-w-2xl bg-white p-8 shadow-lg rounded-lg flex flex-col items-center">
                {/* Header Image */}
                <img
                    src=""
                    alt="Sign Up"
                    className="w-40 h-40 mb-6"
                />

                {/* Title */}
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
                    Create Your Account
                </h2>
                <p className="text-gray-600 text-center mb-6">
                    Join us today and unlock all the features!
                </p>

                {/* Error and Success Messages */}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-center mb-4">{success}</p>}

                {/* Form */}
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-medium">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
                            placeholder="Create a secure password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:opacity-90 transition-opacity"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Redirect to Login */}
                <p className="text-gray-600 mt-6">
                    Already have an account?{' '}
                    <span
                        onClick={() => navigate('/login')}
                        className="text-indigo-600 cursor-pointer hover:underline font-medium"
                    >
                        Log In
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Signup;
