import React, { useState, useEffect } from 'react';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);

    // Fetch users from the server
    useEffect(() => {
        fetch('http://localhost:5000/api/manageUser/users')
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error('Error fetching users:', error));
    }, []);

    // Toggle the user status between 'Active' and 'Inactive'
    const toggleUserStatus = (id, currentStatus) => {
        // Determine new status
        const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';

        // Send a PATCH request to the server to update the user's status
        fetch(`http://localhost:5000/api/manageUser/users/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json', // Ensure proper content type
            },
            body: JSON.stringify({ status: newStatus }), // Pass the new status to the server
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.user) {
                    // Update the local state to reflect the status change
                    setUsers((prevUsers) =>
                        prevUsers.map((user) =>
                            user._id === id ? { ...user, status: data.user.status } : user
                        )
                    );
                    alert(data.message); // Display success message
                } else {
                    alert('Error updating user status'); // Display error message
                }
            })
            .catch((error) => console.error('Error toggling user status:', error));
    };

    // Remove a user from the system
    const removeUser = (id) => {
        fetch(`http://localhost:5000/api/manageUser/users/${id}`, { method: 'DELETE' })
            .then((response) => response.json())
            .then((data) => {
                setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
                alert(data.message);  // Display success message
            })
            .catch((error) => console.error('Error removing user:', error));
    };

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Manage Users</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-separate border-spacing-0">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="px-6 py-4 text-left">Name</th>
                            <th className="px-6 py-4 text-left">Email</th>
                            <th className="px-6 py-4 text-left">Status</th>
                            <th className="px-6 py-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {users.map((user) => (
                            <tr
                                key={user._id}
                                className="hover:bg-gray-100 transition-colors duration-200"
                            >
                                <td className="px-6 py-4">{user.name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${user.status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-gray-300 text-gray-700'
                                            }`}
                                    >
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => toggleUserStatus(user._id, user.status)}
                                            className="bg-yellow-500 text-white py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
                                        >
                                            {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                                        </button>
                                        <button
                                            onClick={() => removeUser(user._id)}
                                            className="bg-red-500 text-white py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
