import React from 'react';
import { MdLocationOn, MdEdit } from 'react-icons/md';

const Account = (props) => {
    const user = props.a;

    if (!user) {
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
                    <p className="text-white font-semibold text-lg">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans antialiased w-full">
            <div className="bg-gray-800 rounded-3xl shadow-2xl p-5 sm:p-8 lg:p-10 text-center max-w-md w-full transform transition-all duration-500 ease-in-out hover:scale-[1.02] hover:shadow-3xl border border-gray-700">
                {/* Profile Image */}
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6 sm:mb-8 rounded-full overflow-hidden border-4 border-orange-500 shadow-xl transition-transform duration-300 hover:rotate-3">
                    <img
                        src={user.profilePicture || 'https://placehold.co/180x180/1F2937/FFFFFF?text=AM'}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://placehold.co/180x180/1F2937/FFFFFF?text=AM';
                        }}
                    />
                </div>

                {/* User Name and Username */}
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 leading-tight">
                    {user.name}
                </h2>
                <p className="text-orange-400 text-lg sm:text-xl font-semibold mb-4">
                    @{user.username}
                </p>

                {/* Email */}
                <p className="text-gray-300 text-sm sm:text-base mb-3 break-all">
                    <a className="text-orange-500 hover:underline">
                        {user.email}
                    </a>
                </p>

                {/* Location */}
                {user.location && (
                    <p className="text-gray-400 text-sm sm:text-base mb-3 flex items-center justify-center gap-1">
                        <MdLocationOn className="text-gray-500 text-lg" />
                        {user.location}
                    </p>
                )}

                {/* Signup Date */}
                <p className="text-gray-500 text-xs sm:text-sm mb-6">
                    Member since <span className="font-medium text-gray-400">
                        {user.signupDate ? new Date(user.signupDate).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'long', day: 'numeric'
                        }) : 'N/A'}
                    </span>
                </p>

                {/* Edit Button */}
                <button className="
                    bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700
                    text-white font-bold py-2.5 px-6 sm:px-10 rounded-full
                    transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg
                    focus:outline-none focus:ring-4 focus:ring-orange-500/50
                    text-sm sm:text-base flex items-center justify-center mx-auto
                ">
                    <MdEdit className="w-5 h-5 mr-2" />
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default Account;
