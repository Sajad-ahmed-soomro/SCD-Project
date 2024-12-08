import React, { useState, useEffect } from 'react';

const ManageEventManagers = () => {
  const [managers, setManagers] = useState([]); // Store list of managers
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'Active',
    password: '', // Add password to the form
  }); // Form state for add/edit
  const [isEditing, setIsEditing] = useState(false); // Track editing state
  const [editingId, setEditingId] = useState(null); // ID of manager being edited
  const [events, setEvents] = useState([]); // Store events for assignment
  const [managerEvent, setManagerEvent] = useState(null); // Store event assignment

  // Fetch all managers and events on component load
  useEffect(() => {
    fetchManagers();
    fetchEvents();
  }, []);

  // Fetch managers from backend
  const fetchManagers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/eventManagers/');
      const data = await response.json();
      setManagers(data);
    } catch (error) {
      console.error('Error fetching managers:', error);
    }
  };

  // Fetch events for assignment
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/events/');
      const data = await response.json();
      console.log(data); // Debugging: check fetched events
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Handle input change for form
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle event assignment for a manager
  const handleEventAssignment = async (managerId) => {
    if (!managerEvent) {
      alert('Please select an event to assign.');
      return;
    }

    try {
      console.log('Manager ID:', managerId);
      console.log('Event ID:', managerEvent);
      const response = await fetch(`http://localhost:5000/api/eventManagers/assignEvent/${managerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId: managerEvent }),
      });

      if (response.ok) {
        alert('Event assigned successfully');
        fetchManagers(); // Refresh manager list
      } else {
        const errorData = await response.json();
        alert(`Error assigning event: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error assigning event:', error);
      alert('Error assigning event');
    }
  };

  // Add or update manager
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        // Update manager
        const response = await fetch(`http://localhost:5000/api/eventManagers/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });

        if (response.ok) {
          alert('Manager updated successfully');
        } else {
          alert('Error updating manager');
        }
      } else {
        // Add new manager
        const response = await fetch('http://localhost:5000/api/eventManagers/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });

        if (response.ok) {
          alert('Manager added successfully');
        } else {
          alert('Error adding manager');
        }
      }

      // Refresh manager list and reset form
      fetchManagers();
      setForm({ name: '', email: '', phone: '', status: 'Active', password: '' });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving manager:', error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this manager?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/eventManagers/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Manager deleted successfully');
        fetchManagers(); // Refresh list
      } else {
        alert('Error deleting manager');
      }
    } catch (error) {
      console.error('Error deleting manager:', error);
    }
  };

  // Handle edit button click
  const handleEdit = (manager) => {
    setIsEditing(true);
    setEditingId(manager._id);
    setForm({
      name: manager.name,
      email: manager.email,
      phone: manager.phone,
      status: manager.status,
      password: '', // Don't show password in the form
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Manage Event Managers</h1>

      {/* Form for Add/Edit */}
      <form onSubmit={handleSubmit} className="mb-6 bg-gray-100 p-4 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            className="border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="border border-gray-300 p-2 rounded"
            required={!isEditing} // Require password only when adding a new manager
          />
          <select
            name="status"
            value={form.status}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isEditing ? 'Update Manager' : 'Add Manager'}
        </button>
      </form>

      {/* Table to List Managers */}
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Phone</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
            <th className="border border-gray-300 p-2">Assign Event</th>
          </tr>
        </thead>
        <tbody>
          {managers.map((manager) => (
            <tr key={manager._id}>
              <td className="border border-gray-300 p-2">{manager.name}</td>
              <td className="border border-gray-300 p-2">{manager.email}</td>
              <td className="border border-gray-300 p-2">{manager.phone}</td>
              <td className="border border-gray-300 p-2">{manager.status}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleEdit(manager)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(manager._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
              <td className="border border-gray-300 p-2">
                <select
                  onChange={(e) => setManagerEvent(e.target.value)}
                  className="border border-gray-300 p-2 rounded"
                >
                  <option value="">Select Event</option>
                  {events.map((event) => (
                    <option key={event._id} value={event._id}>
                      {event.title}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => handleEventAssignment(manager._id)}
                  className="bg-green-600 text-white px-3 py-1 rounded ml-2 hover:bg-green-700"
                >
                  Assign
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageEventManagers;
