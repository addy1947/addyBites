import React from 'react';
import { MdLocationOn, MdLink, MdEdit } from 'react-icons/md';

const Account = (props) => {
    const user = props.a;

    if (!user) {
        return <div className="flex items-center justify-center min-h-screen bg-gray-50">Loading...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 p-4 sm:p-6 lg:p-8 font-sans antialiased">
            <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 text-center max-w-lg w-full transform transition-all duration-500 ease-in-out hover:scale-102 hover:shadow-3xl border border-gray-200">
                {/* Profile Image */}
                <div className="relative w-36 h-36 sm:w-48 sm:h-48 mx-auto mb-6 sm:mb-8 rounded-full overflow-hidden border-6 border-indigo-400 shadow-xl transform transition-transform duration-300 hover:rotate-3">
                    <img
                        src={user.profilePicture || 'https://placehold.co/180x180/A0AEC0/FFFFFF?text=AM'}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://placehold.co/180x180/A0AEC0/FFFFFF?text=AM';
                        }}
                    />
                </div>

                {/* User Name and Username */}
                <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2 leading-tight">
                    {user.name}
                </h2>
                <p className="text-indigo-700 text-xl sm:text-2xl font-semibold mb-6">
                    {user.username}
                </p>

                {/* User Email */}
                <p className="text-gray-700 text-lg sm:text-xl mb-4 flex items-center justify-center">
                    
                    <a className="text-blue-600 hover:underline">
                    {user.email}
                    </a>
                </p>

                {/* Optional: User Location - Uncomment if user.location exists */}
                {user.location && (
                    <p className="text-gray-600 text-base sm:text-lg mb-4 flex items-center justify-center">
                        <MdLocationOn className="w-5 h-5 mr-2 text-gray-500" />
                        {user.location}
                    </p>
                )}

                {/* Joined Info */}
                <p className="text-gray-500 text-sm sm:text-base mb-8">
                    Member since <span className="font-medium text-gray-600">{user.signupDate ? new Date(user.signupDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</span>
                </p>

                {/* Edit Profile Button */}
                <button className="
                    bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3 px-10 rounded-full
                    transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg
                    focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-opacity-75
                    text-lg sm:text-xl flex items-center justify-center mx-auto
                ">
                    <MdEdit className="w-6 h-6 mr-3" />
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default Account;