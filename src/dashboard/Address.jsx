import React from 'react';
import { FiTrash2, FiEdit2, FiMapPin } from "react-icons/fi";
import { Link } from 'react-router';

const Address = (props) => {
    const _id = props.a;
    const address = props.b.addresses;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 flex items-center gap-2">
                    <FiMapPin className="text-indigo-600 text-2xl" />
                    Your Addresses
                </h2>
                <Link to={`/user/${_id}/saveaddress`}>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md text-sm sm:text-base transition">
                        Add New Address
                    </button>
                </Link>
            </div>

            {/* Address Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {address && address.map((item, index) => (
                    <div
                        key={index}
                        className="relative p-5 bg-white rounded-xl shadow border border-gray-200 hover:shadow-lg transition-all"
                    >
                        {/* Action buttons */}
                        <div className="absolute top-3 right-3 flex gap-2">
                            <button className="p-2 rounded-full hover:bg-gray-100 transition" aria-label="Edit">
                                <FiEdit2 className="text-gray-600 hover:text-blue-600" />
                            </button>
                            <button className="p-2 rounded-full hover:bg-gray-100 transition" aria-label="Delete">
                                <FiTrash2 className="text-gray-600 hover:text-red-600" />
                            </button>
                        </div>

                        {/* Address Info */}
                        <p className="text-lg font-semibold text-gray-700 mb-3">{item.name}</p>
                        <p className="text-sm text-gray-600 mb-1"><span className="font-medium">Building:</span> {item.buildingNumber}</p>
                        <p className="text-sm text-gray-600 mb-1"><span className="font-medium">Landmark:</span> {item.landmark}</p>
                        <p className="text-sm text-gray-600 mb-1"><span className="font-medium">City:</span> {item.city}</p>
                        <p className="text-sm text-gray-600 mb-1"><span className="font-medium">District:</span> {item.district}</p>
                        <p className="text-sm text-gray-600 mb-1"><span className="font-medium">State:</span> {item.state}</p>
                        <p className="text-sm text-gray-600"><span className="font-medium">Pincode:</span> {item.pincode}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Address;
