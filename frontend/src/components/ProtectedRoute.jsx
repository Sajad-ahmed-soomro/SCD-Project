import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Protected Route for Admin
const ProtectedRoute = ({ isAuthenticated, redirectTo }) => {
    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
