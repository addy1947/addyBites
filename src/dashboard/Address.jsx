import React from 'react';
import { FiTrash2, FiEdit2, FiMapPin, FiPlus } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Address = (props) => {
    const _id = props.a;
    const address = props.b.addresses;

    return (
        <div className="w-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
                        <FiMapPin className="text-orange-500" />
                        Your Addresses
                    </h2>
                    <p className="text-gray-400 mt-1 text-sm">Manage your delivery locations</p>
                </div>
                <Link to={`/user/${_id}/saveaddress`}>
                    <button className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 py-3 rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.02] transition-all duration-300 font-medium">
                        <FiPlus className="text-lg" />
                        Add New Address
                    </button>
                </Link>
            </div>

            {/* Address Cards */}
            {!address || address.length === 0 ? (
                <div className="text-center py-12 bg-gray-800/30 rounded-3xl border-2 border-dashed border-gray-700">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
                        <FiMapPin className="w-8 h-8 text-gray-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">No addresses found</h3>
                    <p className="text-gray-400 mb-6">Add a delivery address to get started.</p>
                    <Link to={`/user/${_id}/saveaddress`}>
                        <button className="text-orange-500 hover:text-orange-400 font-medium">
                            + Add Address
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {address.map((item, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            key={index}
                            className="group relative p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-orange-500/50 hover:bg-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10"
                        >
                            {/* Action buttons */}
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <button className="p-2 rounded-lg bg-gray-700 hover:bg-orange-500 hover:text-white text-gray-400 transition-colors" aria-label="Edit">
                                    <FiEdit2 size={16} />
                                </button>
                                <button className="p-2 rounded-lg bg-gray-700 hover:bg-red-500 hover:text-white text-gray-400 transition-colors" aria-label="Delete">
                                    <FiTrash2 size={16} />
                                </button>
                            </div>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2.5 bg-orange-500/10 rounded-lg text-orange-500">
                                    <FiMapPin size={20} />
                                </div>
                                <h3 className="text-lg font-bold text-white truncate">{item.name}</h3>
                            </div>

                            <div className="space-y-1.5 pl-1">
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {item.buildingNumber}, {item.landmark}
                                </p>
                                <p className="text-gray-400 text-sm">
                                    {item.city}, {item.district}
                                </p>
                                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-700/50">
                                    <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-700 text-gray-300">
                                        PIN: {item.pincode}
                                    </span>
                                    <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-700 text-gray-300">
                                        {item.state}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Address;
