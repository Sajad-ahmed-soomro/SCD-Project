import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// Import your components/pages
import Home from './components/HomePage';
import AdminHome from './pages/admin/AdminHome';
import Signup from './Signup';
import AdminProfile from "./pages/admin/ManageProfile";
import ManageEventManagers from './pages/admin/ManageEventManagers';
import ManageUsers from './pages/admin/ManageUsers';
import EventPage from './pages/admin/EventPage';
import Reports from "./pages/admin/Reports";
import Login from './Login';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

const App = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated"); // Example: Check if user is authenticated

  return (
    <Router>
      <main>
        <Routes>
          {/* Redirect to home page if authenticated */}
          <Route path="/login" element={isAuthenticated ? <Navigate to="/adminhome" /> : <Login />} />

          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} redirectTo="/login" />}>
            {/* Protected routes that require authentication */}
            <Route path="/adminhome" element={<AdminHome />} />
            <Route path="/manage-managers" element={<ManageEventManagers />} />
            <Route path="/manage-users" element={<ManageUsers />} />
            <Route path="/manage-events-status" element={<EventPage />} />
            <Route path="/manage-profile" element={<AdminProfile />} />
            <Route path="/reports" element={<Reports />} />
          </Route>

          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
