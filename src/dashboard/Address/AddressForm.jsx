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
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Clear error when user types
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!/^\d{6}$/.test(formData.pincode)) {
            newErrors.pincode = "Pincode must be exactly 6 digits.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
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
            className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 p-6 sm:p-8 rounded-3xl shadow-2xl w-full max-w-lg mx-auto mt-8"
        >
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">Add New Address</h2>

            {message && (
                <div className={`mb-6 p-4 rounded-xl text-sm font-medium flex items-center gap-2 ${message.includes('success') ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                    {message}
                </div>
            )}

            <div className="space-y-4">
                {[
                    { label: 'Full Name', name: 'name', placeholder: 'John Doe' },
                    { label: 'Building / Flat No.', name: 'buildingNumber', placeholder: 'Flat 101, Galaxy Apts' },
                    { label: 'Landmark', name: 'landmark', required: false, placeholder: 'Near City Mall' },
                    { label: 'City', name: 'city', placeholder: 'Mumbai' },
                    { label: 'District', name: 'district', placeholder: 'Mumbai Suburban' },
                    { label: 'State', name: 'state', placeholder: 'Maharashtra' },
                    { label: 'Pincode', name: 'pincode', placeholder: '400001', type: 'number' },
                ].map(({ label, name, required = true, placeholder, type = 'text' }) => (
                    <div key={name}>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">{label} {required && <span className="text-red-500">*</span>}</label>
                        <input
                            type={type}
                            name={name}
                            value={formData[name]}
                            onChange={handleChange}
                            placeholder={placeholder}
                            className={`w-full bg-gray-900/50 border ${errors[name] ? 'border-red-500/50 focus:border-red-500' : 'border-gray-700 focus:border-orange-500'} text-gray-100 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 placeholder-gray-600`}
                            required={required}
                        />
                        {errors[name] && <p className="text-red-400 text-xs mt-1 ml-1">{errors[name]}</p>}
                    </div>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={
                        !formData.name ||
                        !formData.buildingNumber ||
                        !formData.city ||
                        !formData.district ||
                        !formData.state ||
                        !formData.pincode
                    }
                >
                    Save Address
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
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-200 px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-600"
                >
                    Clear Form
                </button>
            </div>
        </form>
    );
};

export default AddressForm;
