import React from 'react';
import {
    MdCheckCircle,
    MdLocalShipping,
    MdAccessTime,
    MdLocationOn
} from 'react-icons/md';

const Order = ({ a }) => {
    const getStatusDisplay = (status) => {
        switch (status) {
            case 'Delivered':
                return {
                    icon: <MdCheckCircle className="text-green-600" />,
                    badge: 'bg-green-100 text-green-700'
                };
            case 'Out for Delivery':
                return {
                    icon: <MdLocalShipping className="text-green-500" />,
                    badge: 'bg-green-50 text-green-600'
                };
            case 'Pending':
                return {
                    icon: <MdAccessTime className="text-green-400" />,
                    badge: 'bg-green-50 text-green-500'
                };
            default:
                return { icon: null, badge: 'bg-gray-200 text-gray-700' };
        }
    };

    // Check if a and a.order exist before rendering
    if (!a || !a.order || !Array.isArray(a.order)) {
        return (
            <div className="p-6 space-y-6 bg-green-50 min-h-screen">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-100 w-full max-w-3xl mx-auto">
                    <h2 className="text-xl font-semibold text-green-900 mb-4">Order Status</h2>
                    <p className="text-green-700">No orders found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6 bg-green-50 min-h-screen">
            {a.order.map((item, index) => {
                const timeDiffInMinutes = Math.floor((Date.now() - item.time) / 60000);

                let status = '';
                if (timeDiffInMinutes < 5) {
                    status = 'Pending';
                } else if (timeDiffInMinutes < 30) {
                    status = 'Out for Delivery';
                } else {
                    status = 'Delivered';
                }

                const { icon, badge } = getStatusDisplay(status);

                return (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-2xl shadow-lg border border-green-100 w-full max-w-3xl mx-auto transition hover:shadow-xl"
                    >
                        {/* Status + Address */}
                        <div className="flex justify-between items-start mb-4">
                            <div className="text-green-900">
                                <h2 className="text-xl font-semibold">Order Status</h2>
                                <p className="text-sm mt-1 text-green-700">Delivery Address:</p>
                                <div className="flex items-start gap-2 text-green-800 text-sm mt-1 leading-5">
                                    <MdLocationOn className="mt-0.5 text-xl" />
                                    <span>
                                        {item.address && item.address.name ? (
                                            <>
                                                {item.address.name}, {item.address.buildingNumber}, {item.address.city},<br />
                                                {item.address.district}, {item.address.state} - {item.address.pincode}
                                            </>
                                        ) : (
                                            "Address not available"
                                        )}
                                    </span>
                                </div>
                            </div>
                            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${badge}`}>
                                {icon}
                                <span>{status}</span>
                            </div>
                        </div>

                        {/* Items */}
                        <h3 className="text-md font-semibold text-green-900 mb-3 border-b border-green-200 pb-1">Ordered Items</h3>
                        <div className="space-y-3">
                            {item.orderedproduct && Array.isArray(item.orderedproduct) ? (
                                item.orderedproduct.map((productItem, i) => (
                                    <div
                                        key={i}
                                        className="bg-green-50 rounded-xl p-3 flex justify-between items-center border border-green-100"
                                    >
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={productItem.productId?.image || '/placeholder-image.jpg'}
                                                alt={productItem.productId?.name || 'Product'}
                                                className="w-16 h-16 rounded-md object-cover border border-green-200"
                                            />
                                            <div>
                                                <div className="text-green-900 font-medium text-base">
                                                    {productItem.productId?.name || 'Product Name Not Available'}
                                                </div>
                                                <div className="text-sm text-green-800">
                                                    ₹{productItem.productId?.price || 0}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="text-green-700 font-semibold text-lg">x{productItem.qty || 0}</div>
                                            <div className="text-green-900 font-bold text-lg">
                                                ₹{(productItem.qty || 0) * (productItem.productId?.price || 0)}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-green-700 text-center py-4">No products found for this order.</div>
                            )}
                        </div>

                        {/* Total */}
                        <div className="flex justify-end mt-6">
                            <div className="text-xl font-bold text-green-900">
                                Total Paid: ₹{item.paidAmount || 0}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Order;
