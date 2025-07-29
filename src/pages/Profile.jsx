import React, { useState, useEffect } from 'react';
import Head from '../components/Head';
import Account from '../dashboard/Account';
import Address from '../dashboard/Address';
import Order from '../dashboard/Order';
import { FiUser, FiBox, FiMapPin, FiMenu } from 'react-icons/fi';
import axios from 'axios';
import { useParams } from 'react-router';
import { VITE_PUBLIC_API_URL } from '../config';

const Profile = () => {
    const [nav, setNav] = useState("accounts");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { _id } = useParams();
    const [detail, setDetail] = useState({});

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const res = await axios.get(`${VITE_PUBLIC_API_URL}/user/${_id}`, { withCredentials: true });
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
        <>
            <div className='sticky top-0 z-50 bg-white shadow-md'>
                <Head />
            </div>

            {/* Mobile top bar with menu */}
            <div className="md:hidden py-4 px-4 flex items-center justify-between shadow-sm">
                <button
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    <FiMenu />
                </button>
                <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
            </div>

            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div className="flex flex-col md:flex-row min-h-screen relative">
                {/* Sidebar */}
                <div
                    className={`fixed z-40 md:static md:translate-x-0 top-0 left-0 w-[80%] max-w-xs md:w-[300px] bg-white md:shadow-none shadow-lg border-r border-gray-100 h-full md:h-[calc(100vh-80px)] overflow-y-auto transition-transform duration-300 ease-in-out
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
                >
                    <div className="px-6 py-6">
                        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-transparent bg-clip-text">
                            Dashboard
                        </h2>
                        <p className="text-gray-500 text-sm mb-6">Manage your account</p>

                        {navItems.map((item) => (
                            <div
                                key={item.key}
                                onClick={() => {
                                    setNav(item.key);
                                    setSidebarOpen(false);
                                }}
                                className={`flex items-center gap-4 px-4 py-3 mb-3 rounded-xl cursor-pointer transition-all duration-200 border border-transparent group
                                ${nav === item.key
                                        ? `${getColorClasses(item.color, true)} font-semibold shadow-sm`
                                        : `text-gray-600 ${getColorClasses(item.color, false)} hover:shadow-sm`
                                    }`}
                            >
                                <div className={`p-1 rounded-lg transition-colors ${nav === item.key ? 'bg-white/50' : 'group-hover:bg-white/50'}`}>
                                    {item.icon}
                                </div>
                                <span className="font-medium text-sm">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main content */}
                <div className="flex-1 p-4 md:p-6 mt-4 md:mt-0">
                    <div className="bg-white/90 backdrop-blur-sm p-4 md:p-8 rounded-2xl shadow-lg border border-white/30 min-h-[80vh] transition duration-300">
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
        </>
    );
};

export default Profile;
