import React from 'react';
import { MdLocationOn, MdEdit, MdEmail, MdCalendarToday } from 'react-icons/md';

const Account = (props) => {
    const user = props.a;

    if (!user) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
                    <p className="text-gray-400 font-medium">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full flex justify-center py-8">
            <div className="relative w-full max-w-md">
                {/* Decorative background blur */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-500/20 rounded-full blur-[100px] -z-10"></div>

                <div className="bg-gray-800/50 backdrop-blur-xl rounded-[2.5rem] p-8 border border-gray-700/50 shadow-2xl relative overflow-hidden group">
                    {/* Top gradient accent */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-red-500"></div>

                    {/* Edit Button */}
                    <button className="absolute top-6 right-6 p-2 rounded-full bg-gray-700/50 hover:bg-orange-500 text-gray-400 hover:text-white transition-all duration-300">
                        <MdEdit size={20} />
                    </button>

                    {/* Profile Image */}
                    <div className="relative w-32 h-32 mx-auto mb-6">
                        <div className="w-full h-full rounded-full p-1 bg-gradient-to-br from-orange-400 to-red-600 shadow-xl">
                            <div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-900 bg-gray-800">
                                <img
                                    src={user.profilePicture || `https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff`}
                                    alt="Profile"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = `https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff`;
                                    }}
                                />
                            </div>
                        </div>
                        {/* Status Indicator */}
                        <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 border-gray-900 rounded-full"></div>
                    </div>

                    {/* User Info */}
                    <div className="text-center space-y-2 mb-8">
                        <h2 className="text-3xl font-bold text-white tracking-tight">
                            {user.name}
                        </h2>
                        <p className="text-orange-400 font-medium text-lg">
                            {user.username}
                        </p>
                    </div>

                    {/* Details Grid */}
                    <div className="space-y-4 bg-gray-900/50 rounded-2xl p-5 border border-gray-700/30">
                        <div className="flex items-center gap-4 p-2">
                            <div className="p-2.5 bg-gray-800 rounded-xl text-orange-500">
                                <MdEmail size={20} />
                            </div>
                            <div className="text-left overflow-hidden">
                                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Email Address</p>
                                <p className="text-white truncate font-medium">{user.email}</p>
                            </div>
                        </div>

                        {user.location && (
                            <div className="flex items-center gap-4 p-2">
                                <div className="p-2.5 bg-gray-800 rounded-xl text-blue-500">
                                    <MdLocationOn size={20} />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Location</p>
                                    <p className="text-white font-medium">{user.location}</p>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-4 p-2">
                            <div className="p-2.5 bg-gray-800 rounded-xl text-purple-500">
                                <MdCalendarToday size={20} />
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Joined</p>
                                <p className="text-white font-medium">
                                    {user.signupDate ? new Date(user.signupDate).toLocaleDateString('en-US', {
                                        year: 'numeric', month: 'long', day: 'numeric'
                                    }) : 'Unknown'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
