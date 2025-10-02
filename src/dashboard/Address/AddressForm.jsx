import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const RENDER_WEBSITE_LINK = import.meta.env.VITE_RENDER_WEBSITE_LINK;

const AddressForm = ({ onSave }) => {
    const { _id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        buildingNumber: '',
        landmark: '',
        city: '',
        district: '',
        state: '',
        pincode: ''
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleSave(formData);
    };

    const handleSave = async (data) => {
        setMessage("");

        if (!_id) {
            setMessage("User ID not found. Cannot save address.");
            return;
        }

        try {
            const res = await axios.post(`${RENDER_WEBSITE_LINK}/user/${_id}/address/save`, data, {
                withCredentials: true
            });
            setMessage("✅ Address saved successfully!");
            onSave && onSave(res.data);
            navigate(-1);
        } catch (error) {
            setMessage(error.response?.data?.message || "❌ Failed to save address.");
        }

        setFormData({
            name: '',
            buildingNumber: '',
            landmark: '',
            city: '',
            district: '',
            state: '',
            pincode: ''
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-4 sm:p-6 rounded-xl shadow-md w-full max-w-md mx-auto mt-4 sm:mt-8"
        >
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center text-gray-800">Add Address</h2>

            {message && (
                <div className={`mb-3 p-3 rounded text-sm ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {message}
                </div>
            )}

            {[
                { label: 'Name', name: 'name' },
                { label: 'Building Number', name: 'buildingNumber' },
                { label: 'Landmark', name: 'landmark', required: false },
                { label: 'City', name: 'city' },
                { label: 'District', name: 'district' },
                { label: 'State', name: 'state' },
                { label: 'Pincode', name: 'pincode' },
            ].map(({ label, name, required = true }) => (
                <div className="mb-3" key={name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    <input
                        type="text"
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                        required={required}
                    />
                </div>
            ))}

            <div className="flex flex-col sm:flex-row gap-2 mt-4">
                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition"
                    disabled={
                        !formData.name ||
                        !formData.buildingNumber ||
                        !formData.city ||
                        !formData.district ||
                        !formData.state ||
                        !formData.pincode
                    }
                >
                    Save
                </button>
                <button
                    type="button"
                    onClick={() => setFormData({
                        name: '',
                        buildingNumber: '',
                        landmark: '',
                        city: '',
                        district: '',
                        state: '',
                        pincode: '',
                    })}
                    className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md text-sm transition"
                >
                    Clear
                </button>
            </div>
        </form>
    );
};

export default AddressForm;
