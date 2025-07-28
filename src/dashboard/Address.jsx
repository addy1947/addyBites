import React from 'react';
import { FiTrash2, FiEdit2, FiMapPin } from "react-icons/fi";
import { Link } from 'react-router';

const Address = (props) => {
    const _id = props.a;
    const address = props.b.addresses;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h2 className="text-3xl font-extrabold text-gray-800 flex items-center gap-2">
                    <FiMapPin className="text-indigo-600" />
                    Your Addresses
                </h2>
                <Link to={`/user/${_id}/saveaddress`}>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition duration-300">
                        Add New Address
                    </button>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {address && address.map((item, index) => (
                    <div
                        key={index}
                        className="rounded-xl p-6 shadow-md bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 relative"
                    >
                        <div className="absolute top-3 right-3 flex gap-2">
                            <button className="p-2 text-gray-600 hover:text-blue-600 transition">
                                <FiEdit2 />
                            </button>
                            <button className="p-2 text-gray-600 hover:text-red-600 transition">
                                <FiTrash2 />
                            </button>
                        </div>
                        <p className="text-lg font-semibold text-gray-700 mb-3">{item.name}</p>
                        <p className="mb-1"><span className="font-medium text-gray-600">Building:</span> {item.buildingNumber}</p>
                        <p className="mb-1"><span className="font-medium text-gray-600">Landmark:</span> {item.landmark}</p>
                        <p className="mb-1"><span className="font-medium text-gray-600">City:</span> {item.city}</p>
                        <p className="mb-1"><span className="font-medium text-gray-600">District:</span> {item.district}</p>
                        <p className="mb-1"><span className="font-medium text-gray-600">State:</span> {item.state}</p>
                        <p className="mb-1"><span className="font-medium text-gray-600">Pincode:</span> {item.pincode}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Address;
