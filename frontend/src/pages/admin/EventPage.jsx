import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [discount, setDiscount] = useState('');  // State for discount input

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('http://localhost:5000/api/event-status/events');
                if (response.ok) {
                    const data = await response.json();
                    setEvents(data.events);
                } else {
                    setError('Failed to fetch events.');
                }
            } catch (err) {
                setError('Error fetching events. Please try again later.');
                console.error('Error fetching events:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const capitalizeWords = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        }).format(new Date(date));
    };

    const handleApproveEvent = async (eventId) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/event-status/events/${eventId}/approve`, {
                method: 'PUT',
            });
            if (response.ok) {
                alert('Event approved!');
                setEvents(events.filter(event => event._id !== eventId));
            } else {
                alert('Failed to approve event.');
            }
        } catch (err) {
            alert('Error approving event. Please try again later.');
            console.error('Error approving event:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleRejectEvent = async (eventId) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/event-status/events/${eventId}/reject`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('Event rejected and removed!');
                setEvents(events.filter(event => event._id !== eventId));
            } else {
                alert('Failed to reject event.');
            }
        } catch (err) {
            alert('Error rejecting event. Please try again later.');
            console.error('Error rejecting event:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDiscountChange = (e) => {
        setDiscount(e.target.value);
    };

    const handleSaveDiscount = async (eventId) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/event-status/events/${eventId}/discount`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ discount: parseInt(discount) }),
            });
            if (response.ok) {
                alert('Discount updated!');
                setEvents(events.map(event => event._id === eventId ? { ...event, discount: parseInt(discount) } : event));
            } else {
                alert('Failed to update discount.');
            }
        } catch (err) {
            alert('Error updating discount. Please try again later.');
            console.error('Error updating discount:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-center mb-6">Manage Pending Events</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {loading && <p className="text-center">Loading...</p>}
            {!loading && !error && (
                <div className="space-y-4">
                    {events.length > 0 ? (
                        events.map((event) => (
                            <div key={event._id} className="flex justify-between items-center p-4 border-b">
                                <div>
                                    <h4 className="text-xl font-medium">{capitalizeWords(event.title)}</h4>
                                    <p className="text-gray-600">{capitalizeWords(event.category)} - {formatDate(event.date)}</p>
                                    <p className="text-gray-600">Discount: {event.discount}%</p>
                                    <input
                                        type="number"
                                        value={discount}
                                        onChange={handleDiscountChange}
                                        placeholder="Enter discount %"
                                        className="mt-2 p-2 border rounded-md"
                                    />
                                    <button
                                        onClick={() => handleSaveDiscount(event._id)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
                                        disabled={loading}
                                    >
                                        Save Discount
                                    </button>
                                </div>
                                <div>
                                    <button
                                        onClick={() => handleApproveEvent(event._id)}
                                        className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                                        disabled={loading}
                                    >
                                        <FaCheckCircle className="mr-2" /> Approve
                                    </button>
                                    <button
                                        onClick={() => handleRejectEvent(event._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                                        disabled={loading}
                                    >
                                        <FaTimesCircle className="mr-2" /> Reject
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No pending events to display.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default EventsPage;
