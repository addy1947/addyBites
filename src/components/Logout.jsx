import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Head from './Head';
import { motion } from 'framer-motion';

const Logout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        const result = await logout();
        setIsLoggingOut(false);

        if (result.success) {
            // alert('Successfully logged out!'); // Optional: removed for smoother flow
            navigate('/login');
        } else {
            alert('Logout failed: ' + result.error);
        }
    };

    const handleCancel = () => {
        navigate('/menu');
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col">
            <div className="sticky top-0 z-50">
                <Head />
            </div>

            <div className="flex-grow flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 p-8 rounded-3xl shadow-2xl w-full max-w-md text-center"
                >
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent mb-2">Logout</h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto rounded-full opacity-80"></div>
                    </div>

                    <div className="mb-10">
                        <p className="text-gray-200 text-lg mb-3 font-medium">
                            Are you sure you want to leave?
                        </p>
                        <p className="text-gray-400 text-sm">
                            We'll miss you! You'll need to sign in again to order your favorites.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={handleCancel}
                            className="flex-1 py-3 px-4 rounded-xl bg-gray-700 text-gray-300 font-semibold transition-all duration-300 hover:bg-gray-600 hover:text-white"
                            disabled={isLoggingOut}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02]"
                            disabled={isLoggingOut}
                        >
                            {isLoggingOut ? 'Logging out...' : 'Logout'}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Logout;