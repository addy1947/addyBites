import React from 'react';
import {
    MdCheckCircle,
    MdLocalShipping,
    MdAccessTime,
    MdLocationOn
} from 'react-icons/md';

const Order = ({ a }) => {
    if (!a?.order?.length) {
        return (
            <div className="p-6 bg-green-50 min-h-screen">
                <div className="bg-white p-6 rounded-xl shadow border max-w-2xl mx-auto">
                    <h2 className="text-lg font-semibold text-green-900 mb-2">Order Status</h2>
                    <p className="text-green-700">No orders found.</p>
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
                return { icon: <MdAccessTime className="text-green-400" />, style: 'bg-green-50 text-green-500' };
            case 'Out for Delivery':
                return { icon: <MdLocalShipping className="text-green-500" />, style: 'bg-green-50 text-green-600' };
            case 'Delivered':
                return { icon: <MdCheckCircle className="text-green-600" />, style: 'bg-green-100 text-green-700' };
            default:
                return { icon: null, style: 'bg-gray-200 text-gray-700' };
        }
    };

    return (
        <div className="p-6 bg-green-50 min-h-screen space-y-6">
            {a.order.map((item, index) => {
                const status = getStatus(item.time);
                const { icon, style } = getBadge(status);

                return (
                    <div key={index} className="bg-white p-6 rounded-xl shadow border max-w-2xl mx-auto space-y-4">
                        {/* Status + Address */}
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-lg font-semibold text-green-900">Order Status</h2>
                                <div className="flex items-start gap-2 text-green-800 text-sm mt-1">
                                    <MdLocationOn className="mt-0.5 text-xl" />
                                    <span>
                                        {item.address?.name
                                            ? `${item.address.name}, ${item.address.buildingNumber}, ${item.address.city}, ${item.address.district}, ${item.address.state} - ${item.address.pincode}`
                                            : 'Address not available'}
                                    </span>
                                </div>
                            </div>
                            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${style}`}>
                                {icon}
                                <span>{status}</span>
                            </div>
                        </div>

                        {/* Items */}
                        <div className="space-y-3">
                            {item.orderedproduct?.length ? (
                                item.orderedproduct.map((p, i) => (
                                    <div key={i} className="flex justify-between items-center p-3 bg-green-50 rounded-lg border">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={p.productId?.image || '/placeholder.jpg'}
                                                alt={p.productId?.name || 'Product'}
                                                className="w-14 h-14 object-cover rounded border"
                                            />
                                            <div>
                                                <div className="text-green-900 font-medium">
                                                    {p.productId?.name || 'Product Name'}
                                                </div>
                                                <div className="text-green-700 text-sm">₹{p.productId?.price || 0}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-green-700 text-sm">x{p.qty || 0}</div>
                                            <div className="text-green-900 font-semibold">
                                                ₹{(p.qty || 0) * (p.productId?.price || 0)}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-green-700 text-center">No products in this order.</div>
                            )}
                        </div>

                        {/* Total */}
                        <div className="text-right text-lg font-bold text-green-900">
                            Total Paid: ₹{item.paidAmount || 0}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Order;
