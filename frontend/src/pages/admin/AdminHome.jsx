import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    FaTachometerAlt,
    FaCalendarAlt,
    FaUserCog,
    FaCogs,
    FaBars,
    FaUsers,
    FaUserTie,
    FaClipboardList,
    FaChartBar
} from 'react-icons/fa';

const AdminHome = () => {
    const [adminName, setAdminName] = useState('');
    const [events, setEvents] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5000/api/admin/profile')
            .then(response => response.json())
            .then(data => setAdminName(data.name))
            .catch(error => console.error('Error fetching admin data:', error));

        fetch('http://localhost:5000/api/event-status/getevents')
            .then(response => response.json())
            .then(data => setEvents(data.events))
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    const upcomingEvents = events
        .filter(event => new Date(event.date) > new Date())
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 shadow-lg flex justify-between items-center">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                {/* Mobile Menu Button */}
                <button
                    className="text-white text-3xl md:hidden"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    <FaBars />
                </button>
            </header>

            <div className="flex flex-1 bg-gradient-to-b from-gray-50 to-gray-100">
                {/* Sidebar */}
                <aside
                    className={`fixed top-0 left-0 w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white p-6 shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                        } transition-transform md:relative md:translate-x-0 z-20`}
                >
                    <button
                        className="md:hidden text-2xl text-white mb-6"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        ✕
                    </button>
                    <ul className="mt-4 space-y-4">
                        <li className="py-3 px-4 flex items-center hover:bg-gray-700 rounded-lg transition ease-in-out">
                            <FaUserTie className="mr-3 text-lg" />
                            <Link to="/manage-managers">Manage Managers</Link>
                        </li>
                        <li className="py-3 px-4 flex items-center hover:bg-gray-700 rounded-lg transition ease-in-out">
                            <FaUsers className="mr-3 text-lg" />
                            <Link to="/manage-users">Manage Users</Link>
                        </li>
                        <li className="py-3 px-4 flex items-center hover:bg-gray-700 rounded-lg transition ease-in-out">
                            <FaUserCog className="mr-3 text-lg" />
                            <Link to="/manage-profile">Manage Profile</Link>
                        </li>
                        <li className="py-3 px-4 flex items-center hover:bg-gray-700 rounded-lg transition ease-in-out">
                            <FaClipboardList className="mr-3 text-lg" />
                            <Link to="/manage-events-status">Manage Events</Link>
                        </li>
                        <li className="py-3 px-4 flex items-center hover:bg-gray-700 rounded-lg transition ease-in-out">
                            <FaChartBar className="mr-3 text-lg" />
                            <Link to="/reports">Reports</Link>
                        </li>
                    </ul>
                </aside>

                {/* Content Area */}
                <main className="flex-1 p-8 space-y-8 flex flex-col items-center justify-center">
                    {/* Welcome Section */}
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-semibold text-gray-800">
                            Welcome, <span className="text-blue-600">{adminName || 'Admin'}</span>
                        </h2>
                    </div>

                    {/* Dashboard Text */}
                    <div className="text-center">
                        <p className="text-lg text-gray-600 mb-8">
                            This is the Admin Dashboard. Here, you can manage events, users, and other system settings.
                        </p>
                    </div>

                    {/* Upcoming Events Section */}
                    <div className="w-full max-w-4xl">
                        <h3 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Upcoming Events</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            {upcomingEvents.length > 0 ? (
                                upcomingEvents.map((event, index) => (
                                    <div key={index} className="bg-white p-6 shadow-xl rounded-lg transform hover:scale-105 transition-all duration-300 ease-in-out">
                                        <p className="text-xl font-semibold text-gray-800">{event.title}</p>
                                        <p className="text-gray-500 mt-2">{event.category}</p>
                                        <p className="text-gray-600 mt-4">{new Date(event.date).toLocaleDateString()}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="bg-white p-6 shadow-xl rounded-lg">
                                    <p className="text-gray-700">No upcoming events found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminHome;
