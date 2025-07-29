import React from 'react';
import { MdLocationOn, MdEdit } from 'react-icons/md';

const Account = (props) => {
    const user = props.a;

    if (!user) {
        return <div className="flex items-center justify-center min-h-screen bg-gray-50">Loading...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 p-4 sm:p-6 lg:p-8 font-sans antialiased">
            <div className="bg-white rounded-3xl shadow-2xl p-5 sm:p-8 lg:p-10 text-center max-w-md w-full transform transition-all duration-500 ease-in-out hover:scale-[1.02] hover:shadow-3xl border border-gray-200">
                {/* Profile Image */}
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6 sm:mb-8 rounded-full overflow-hidden border-4 border-indigo-400 shadow-xl transition-transform duration-300 hover:rotate-3">
                    <img
                        src={user.profilePicture || 'https://placehold.co/180x180/A0AEC0/FFFFFF?text='+user.name[0]}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://placehold.co/180x180/A0AEC0/FFFFFF?text=AM';
                        }}
                    />
                </div>

                {/* User Name and Username */}
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 leading-tight">
                    {user.name}
                </h2>
                <p className="text-indigo-700 text-lg sm:text-xl font-semibold mb-4">
                    @{user.username}
                </p>

                {/* Email */}
                <p className="text-gray-700 text-sm sm:text-base mb-3 break-all">
                    <a className="text-blue-600 hover:underline">
                        {user.email}
                    </a>
                </p>

                {/* Location */}
                {user.location && (
                    <p className="text-gray-600 text-sm sm:text-base mb-3 flex items-center justify-center gap-1">
                        <MdLocationOn className="text-gray-500 text-lg" />
                        {user.location}
                    </p>
                )}

                {/* Signup Date */}
                <p className="text-gray-500 text-xs sm:text-sm mb-6">
                    Member since <span className="font-medium text-gray-600">
                        {user.signupDate ? new Date(user.signupDate).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'long', day: 'numeric'
                        }) : 'N/A'}
                    </span>
                </p>

                {/* Edit Button */}
                <button className="
                    bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700
                    text-white font-bold py-2.5 px-6 sm:px-10 rounded-full
                    transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg
                    focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-opacity-75
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
