import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Head from './Head';

const Logout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        const result = await logout();
        setIsLoggingOut(false);

        if (result.success) {
            alert('Successfully logged out!');
            navigate('/');
        } else {
            alert('Logout failed: ' + result.error);
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <>
            <div className="sticky top-0 z-50 bg-white shadow-md">
                <Head />
            </div>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-800 to-purple-400">
                <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-purple-800 mb-2">Logout</h2>
                        <div className="w-16 h-1 bg-purple-800 mx-auto rounded-full"></div>
                    </div>

                    <div className="text-center mb-8">
                        <p className="text-gray-700 text-lg mb-4">
                            Are you sure you want to logout?
                        </p>
                        <p className="text-gray-500 text-sm">
                            You will need to login again to access your account.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={handleCancel}
                            className="flex-1 py-3 px-4 rounded-lg bg-gray-300 text-gray-700 font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-gray-400"
                            disabled={isLoggingOut}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex-1 py-3 px-4 rounded-lg bg-red-600 text-white font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-red-700 shadow-md"
                            disabled={isLoggingOut}
                        >
                            {isLoggingOut ? 'Logging out...' : 'Yes, Logout'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Logout; 