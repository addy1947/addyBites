import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div
                className="min-h-screen flex items-center justify-center"
                style={{
                    backgroundImage: "url('/image/bg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="bg-[#4b3621]/95 backdrop-blur-sm text-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-white/20 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <p className="text-white font-semibold text-lg">Checking authentication...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute; 