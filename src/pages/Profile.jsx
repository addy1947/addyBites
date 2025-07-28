import React, { useState, useEffect } from 'react';
import Head from '../components/Head';
import Account from '../dashboard/Account';
import Address from '../dashboard/Address';
import Order from '../dashboard/Order';
import { FiUser, FiBox, FiMapPin, FiHelpCircle, FiMenu } from 'react-icons/fi';
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
                const res = await axios.get(`${VITE_PUBLIC_API_URL}/user/${_id}`, { withCredentials: true })

                setDetail(res.data)
            } catch (error) {
                if (axios.isCancel(error)) {
                    // Request was cancelled
                } else {
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
            <div >
                {/* Header */}
                <div className="">
                    <div className="py-4 px-6 flex items-center justify-between">

                        <button
                            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            <FiMenu />
                        </button>
                    </div>
                </div>

                {/* Overlay for mobile */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Layout */}
                <div className=" flex min-h-screen">
                    {/* Sidebar */}
                    <div
                        className={`sticky top-15 left-0 md:sticky bg-white/95 backdrop-blur-xl shadow-xl md:shadow-lg border-r border-gray-100 px-6 py-8 w-[300px] h-[calc(100vh-80px)] overflow-y-auto transition-all duration-300 ease-in-out transform
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
                    >
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-transparent bg-clip-text">
                                Dashboard
                            </h2>
                            <p className="text-gray-500 text-sm">Manage your account</p>
                        </div>

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
                                <div className={`p-1 rounded-lg transition-colors ${nav === item.key ? 'bg-white/50' : 'group-hover:bg-white/50'
                                    }`}>
                                    {item.icon}
                                </div>
                                <span className="font-medium">{item.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 p-6 md:ml-0">
                        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20 min-h-[80vh] transition-all duration-300 hover:shadow-2xl">
                            {nav === "accounts" ? (
                                <Account a={detail} />
                            ) : nav === "order" ? (
                                <Order a={detail} />
                            ) : nav === "address" ? (
                                <Address a={_id} b={detail} />
                            ) : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;