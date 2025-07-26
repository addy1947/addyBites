import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

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
            const res = await axios.post(`http://localhost:5000/user/${_id}/address/save`, data, {
                withCredentials: true
            });
            setMessage("✅ Address saved successfully!");
            onSave && onSave(res.data); // Optional callback
            navigate(-1);
        } catch (error) {
            setMessage(error.response?.data?.message || "❌ Failed to save address.");
        }

        // Reset form
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
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md max-w-md mx-auto">
            <h2 className="text-lg font-bold mb-2 text-center">Add Address</h2>

            {message && (
                <div className={`mb-3 p-2 rounded text-sm ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
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
                <div className="mb-2" key={name}>
                    <label className="block mb-1">{label}</label>
                    <input
                        type="text"
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        className="w-full border px-2 py-1 rounded"
                        required={required}
                    />
                </div>
            ))}

            <div className="flex gap-2 mt-3">
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
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
                    className="bg-gray-300 text-black px-4 py-2 rounded"
                >
                    Clear
                </button>
            </div>
        </form>
    );
};

export default AddressForm;
