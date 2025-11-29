import React, { useState, useEffect } from 'react';
import Head from '../components/Head';
import Account from '../dashboard/Account';
import Address from '../dashboard/Address';
import Order from '../dashboard/Order';
import { FiUser, FiBox, FiMapPin, FiMenu } from 'react-icons/fi';
import axios from 'axios';
import { useParams } from 'react-router';

const RENDER_WEBSITE_LINK = import.meta.env.VITE_RENDER_WEBSITE_LINK;

const Profile = () => {
    const [nav, setNav] = useState("accounts");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { _id } = useParams();
    const [detail, setDetail] = useState({});

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const res = await axios.get(`${RENDER_WEBSITE_LINK}/user/${_id}`, { withCredentials: true });
                setDetail(res.data);
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error('Error fetching all products:', error);
                }
            }
        };
        fetchAllProducts();
    }, [_id]);

    const navItems = [
        { key: "accounts", label: "My Account", icon: <FiUser />, color: "blue" },
        { key: "order", label: "My Order", icon: <FiBox />, color: "green" },
        { key: "address", label: "Address", icon: <FiMapPin />, color: "purple" },
    ];

    const getColorClasses = (color, isActive) => {
        const colors = {
            blue: isActive ? "bg-blue-100 text-blue-700 border-blue-200" : "hover:bg-blue-50 hover:text-blue-700",
            green: isActive ? "bg-green-100 text-green-700 border-green-200" : "hover:bg-green-50 hover:text-green-700",
            purple: isActive ? "bg-purple-100 text-purple-700 border-purple-200" : "hover:bg-purple-50 hover:text-purple-700",
        };
        return colors[color];
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
            <Head />

            {/* Mobile top bar with menu */}
            <div className="md:hidden py-4 px-4 flex items-center justify-between shadow-sm bg-gray-800 border-b border-gray-700">
                <button
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-white"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    <FiMenu />
                </button>
                <h2 className="text-lg font-semibold text-white">Dashboard</h2>
            </div>

            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)] relative max-w-7xl mx-auto">
                {/* Sidebar */}
                <div
                    className={`fixed z-40 md:sticky md:top-24 left-0 w-[80%] max-w-xs md:w-[280px] bg-gray-800/80 backdrop-blur-xl md:bg-transparent md:border-r border-gray-800 h-full md:h-[calc(100vh-120px)] overflow-y-auto transition-transform duration-300 ease-in-out
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
                >
                    <div className="px-4 py-2 md:pr-6">
                        <div className="mb-6 px-4">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-600 text-transparent bg-clip-text hidden md:block">
                                Dashboard
                            </h2>
                            <p className="text-gray-400 text-sm mt-1 hidden md:block">Welcome back, {detail?.name || 'User'}</p>
                        </div>

                        <div className="space-y-3">
                            {navItems.map((item) => (
                                <div
                                    key={item.key}
                                    onClick={() => {
                                        setNav(item.key);
                                        setSidebarOpen(false);
                                    }}
                                    className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl cursor-pointer transition-all duration-300 border border-transparent group
                                    ${nav === item.key
                                            ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-500 border-orange-500/30 shadow-lg shadow-orange-500/10'
                                            : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                                        }`}
                                >
                                    <div className={`p-2 rounded-xl transition-colors ${nav === item.key ? 'bg-orange-500 text-white' : 'bg-gray-800 group-hover:bg-gray-700 text-gray-400 group-hover:text-white'}`}>
                                        {item.icon}
                                    </div>
                                    <span className="font-medium text-base">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="flex-1 p-4 md:p-6">
                    <div className="bg-gray-800/30 backdrop-blur-md rounded-[2rem] border border-gray-700/50 min-h-[600px] transition duration-300 overflow-hidden shadow-2xl p-6 md:p-8">
                        {nav === "accounts" ? (
                            <Account a={detail} />
                        ) : nav === "order" ? (
                            <Order a={detail} />
                        ) : nav === "address" ? (
                            <Address a={_id} b={detail} />
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
