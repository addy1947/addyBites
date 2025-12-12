import React from 'react';
import {
    MdCheckCircle,
    MdLocalShipping,
    MdAccessTime,
    MdLocationOn,
    MdReceipt
} from 'react-icons/md';
import { motion } from 'framer-motion';

const Order = ({ a }) => {
    if (!a?.order?.length) {
        return (
            <div className="w-full h-full flex items-center justify-center p-8">
                <div className="text-center bg-gray-800/50 backdrop-blur-sm p-12 rounded-3xl border border-dashed border-gray-700 max-w-lg w-full">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-800 rounded-full mb-6">
                        <MdReceipt className="w-10 h-10 text-gray-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">No Past Orders</h2>
                    <p className="text-gray-400">Looks like you haven't ordered anything yet.</p>
                </div>
            </div>
        );
    }

    const getStatus = (orderTime) => {
        const mins = Math.floor((Date.now() - orderTime) / 60000);
        if (mins < 5) return 'Pending';
        if (mins < 30) return 'Out for Delivery';
        return 'Delivered';
    };

    const getBadge = (status) => {
        switch (status) {
            case 'Pending':
                return {
                    icon: <MdAccessTime />,
                    style: 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                };
            case 'Out for Delivery':
                return {
                    icon: <MdLocalShipping />,
                    style: 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                };
            case 'Delivered':
                return {
                    icon: <MdCheckCircle />,
                    style: 'bg-green-500/10 text-green-500 border border-green-500/20'
                };
            default:
                return {
                    icon: null,
                    style: 'bg-gray-700 text-gray-400'
                };
        }
    };

    return (
        <div className="w-full space-y-6">
            <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
                    <MdReceipt className="text-orange-500" />
                    My Orders
                </h2>
                <p className="text-gray-400 mt-1 text-sm">Track your past and current orders</p>
            </div>

            {a.order.map((item, index) => {
                const status = getStatus(item.time);
                const { icon, style } = getBadge(status);

                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={index}
                        className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-orange-500/30 transition-all duration-300 shadow-xl"
                    >
                        {/* Status + Address */}
                        <div className="flex flex-col md:flex-row justify-between gap-6 md:items-start mb-6 border-b border-gray-700/50 pb-6">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-orange-500 font-mono text-sm">#{String(item._id).slice(-6).toUpperCase()}</span>
                                    <span className="text-gray-500 text-sm">•</span>
                                    <span className="text-gray-400 text-sm">{new Date(item.time).toLocaleDateString()} at {new Date(item.time).toLocaleTimeString()}</span>
                                </div>
                                <div className="flex items-start gap-2 text-gray-300 text-sm mt-1 bg-gray-900/50 p-3 rounded-lg border border-gray-700/50">
                                    <MdLocationOn className="mt-0.5 text-lg text-orange-500 flex-shrink-0" />
                                    <span className="leading-relaxed">
                                        {item.address?.name
                                            ? `${item.address.name}, ${item.address.buildingNumber}, ${item.address.landmark ? item.address.landmark + ', ' : ''}${item.address.city}, ${item.address.pincode}`
                                            : 'Address not available'}
                                    </span>
                                </div>
                            </div>
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold self-start whitespace-nowrap shadow-sm ${style}`}>
                                {icon}
                                <span>{status}</span>
                            </div>
                        </div>

                        {/* Items */}
                        <div className="space-y-4">
                            {item.orderedproduct?.length ? (
                                item.orderedproduct.map((p, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-gray-700 transition group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-700 group-hover:border-orange-500/30 transition">
                                                <img
                                                    src={p.productId?.image || '/placeholder.jpg'}
                                                    alt={p.productId?.name || 'Product'}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <div className="text-white font-bold text-base mb-1">
                                                    {p.productId?.name || 'Product Name'}
                                                </div>
                                                <div className="text-gray-400 text-sm flex items-center gap-2">
                                                    <span className="text-orange-400">₹{p.productId?.price || 0}</span>
                                                    <span className="text-gray-600">x</span>
                                                    <span>{p.qty || 0}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-white font-bold text-lg">
                                                ₹{(p.qty || 0) * (p.productId?.price || 0)}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-500 text-center text-sm py-4 italic">No products detail available.</div>
                            )}
                        </div>

                        {/* Total */}
                        <div className="mt-6 pt-4 border-t border-gray-700/50 flex justify-between items-center">
                            <span className="text-gray-400 font-medium">Total Paid Amount</span>
                            <span className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                                ₹{item.paidAmount || 0}
                            </span>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default Order;
