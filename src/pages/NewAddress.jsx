import React from 'react';
import Head from '../components/Head';
import AddressForm from '../dashboard/Address/AddressForm';

const NewAddress = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans">
            <Head />
            <div className="p-4">
                <AddressForm />
            </div>
        </div>
    );
};

export default NewAddress;