import React, { useState } from 'react';

// Main App component for the Customer Support Page
const Support = () => {
    // State to manage the active FAQ item for expansion
    const [activeFaq, setActiveFaq] = useState(null);
    // State to store the current search query
    const [searchQuery, setSearchQuery] = useState('');

    // Function to toggle the active FAQ item
    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    // Sample FAQ data
    const faqs = [
        {
            question: "How do I reset my password?",
            answer: "You can reset your password by navigating to the 'Login' page and clicking on the 'Forgot Password' link. Follow the instructions sent to your registered email address."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay for your convenience."
        },
        {
            question: "How can I track my order?",
            answer: "Once your order has shipped, you will receive a confirmation email with a tracking number and a link to track your package's journey."
        },
        {
            question: "What is your return policy?",
            answer: "Our return policy allows returns within 30 days of purchase, provided the item is in its original condition and packaging. Please visit our 'Returns' section for more details."
        },
        {
            question: "How do I contact customer support?",
            answer: "You can reach our customer support team via email at support@example.com or by phone at +1 (800) 123-4567 during business hours."
        }
    ];

    // Filter FAQs based on search query
    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 font-sans antialiased text-gray-800">
            {/* Header Section */}
            <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-4 sm:px-6 lg:px-8 shadow-lg">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
                        How Can We Help You Today?
                    </h1>
                    <p className="text-lg sm:text-xl opacity-90 mb-8">
                        Find answers to common questions or get in touch with our support team.
                    </p>
                    {/* Search Bar */}
                    <div className="relative max-w-lg mx-auto">
                        <input
                            type="text"
                            placeholder="Search for answers..."
                            className="w-full py-3 pl-12 pr-4 rounded-full bg-white text-gray-800 placeholder-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={searchQuery} // Bind input value to searchQuery state
                            onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on change
                        />
                        {/* Search Icon (using inline SVG for simplicity as lucide-react needs external import) */}
                        <svg
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                            width="20"
                            height="20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* FAQ Section */}
                <section className="mb-12 bg-white rounded-xl shadow-lg p-6 sm:p-8">
                    <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {/* Map over filteredFaqs instead of original faqs */}
                        {filteredFaqs.length > 0 ? (
                            filteredFaqs.map((faq, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                    <button
                                        className="w-full flex justify-between items-center p-4 text-left font-semibold text-lg text-gray-900 bg-gray-50 hover:bg-gray-100 transition duration-200 ease-in-out focus:outline-none"
                                        onClick={() => toggleFaq(index)}
                                        aria-expanded={activeFaq === index}
                                    >
                                        {faq.question}
                                        {/* Plus/Minus Icon */}
                                        <svg
                                            className={`w-6 h-6 transform transition-transform duration-300 ${activeFaq === index ? 'rotate-45' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path>
                                        </svg>
                                    </button>
                                    {/* Answer Content */}
                                    {activeFaq === index && (
                                        <div className="p-4 bg-white text-gray-700 border-t border-gray-200">
                                            <p>{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-600">No matching FAQs found. Please try a different search term.</p>
                        )}
                    </div>
                </section>

                {/* Contact Us Section */}
                <section className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center">
                    <h2 className="text-3xl font-bold text-blue-700 mb-6">
                        Still Need Help?
                    </h2>
                    <p className="text-lg text-gray-700 mb-8">
                        Our dedicated support team is here to assist you.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                        <a
                            href="mailto:support@example.com"
                            className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            {/* Email Icon */}
                            <svg
                                className="w-6 h-6 mr-2"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            Email Us
                        </a>
                        <a
                            href="tel:+18001234567"
                            className="flex items-center bg-green-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            {/* Phone Icon */}
                            <svg
                                className="w-6 h-6 mr-2"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                            Call Us: +1 (800) 123-4567
                        </a>
                    </div>
                </section>
            </main>

            {/* Footer Section */}
            <footer className="bg-gray-800 text-white py-8 px-4 sm:px-6 lg:px-8 mt-12">
                <div className="max-w-4xl mx-auto text-center text-gray-400">
                    &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Support;
