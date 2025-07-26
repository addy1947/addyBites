import React from 'react';


import { FiTrash2, FiEdit2, FiMapPin } from "react-icons/fi";
import { Link } from 'react-router';

const Address = (props) => {
    const _id = props.a;
    const address = props.b.addresses;
    return (
        <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Your Addresses</h2>
                <button
                    
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition duration-300"
                >
                    <Link to={`/user/${_id}/saveaddress`}>Add New Address</Link>
                    
                </button>
            </div>

        

            

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {address && address.map((item, index) => (
                    <div
                        key={index}
                        className="rounded-xl p-5 shadow-lg bg-white border border-gray-200 hover:shadow-xl transition"
                    >
                        <p className="text-lg mb-2"><span className="font-semibold text-gray-700">Name:</span> {item.name}</p>
                        <p className="mb-1"><span className="font-semibold text-gray-700">Building Number:</span> {item.buildingNumber}</p>
                        <p className="mb-1"><span className="font-semibold text-gray-700">Landmark:</span> {item.landmark}</p>
                        <p className="mb-1"><span className="font-semibold text-gray-700">City:</span> {item.city}</p>
                        <p className="mb-1"><span className="font-semibold text-gray-700">District:</span> {item.district}</p>
                        <p className="mb-1"><span className="font-semibold text-gray-700">State:</span> {item.state}</p>
                        <p className="mb-1"><span className="font-semibold text-gray-700">Pincode:</span> {item.pincode}</p>
                    </div>
                ))}
            </div>
        </div>
    );

};

export default Address;
