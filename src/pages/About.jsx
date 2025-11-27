import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUsers, FaBullseye, FaHistory } from 'react-icons/fa';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans">
            {/* Navbar (Simple version for About page) */}
            <nav className="absolute top-0 left-0 w-full z-20 flex justify-between items-center px-8 py-6 bg-gradient-to-b from-black/80 to-transparent">
                <Link to="/">
                    <h1 className="text-3xl font-bold text-orange-500 tracking-wider">AddyBites</h1>
                </Link>
                <div className="space-x-6 hidden md:block">
                    <Link to="/" className="hover:text-orange-400 transition font-medium">Home</Link>
                    <Link to="/menu" className="hover:text-orange-400 transition font-medium">Menu</Link>
                    <Link to="/about" className="text-orange-500 font-medium">About</Link>
                </div>
                <div className="space-x-4">
                    <Link to="/login" className="px-5 py-2 rounded-full border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition font-medium">Login</Link>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-900/80 to-gray-900"></div>
                    <img
                        src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1920&q=80"
                        alt="Restaurant Interior"
                        className="w-full h-full object-cover opacity-40"
                    />
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
                    >
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">AddyBites</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-gray-300 max-w-2xl mx-auto"
                    >
                        Crafting culinary experiences that bring people together, one bite at a time.
                    </motion.p>
                </div>
            </div>

            {/* Content Sections */}
            <div className="max-w-7xl mx-auto px-6 py-20 space-y-32">

                {/* Our Story */}
                <Section
                    icon={<FaHistory className="text-4xl text-orange-500" />}
                    title="Our Story"
                    content="Founded in 2024, AddyBites started with a simple vision: to make gourmet food accessible to everyone. What began as a small kitchen experiment has grown into a beloved community hub for food lovers. We believe that great food shouldn't just taste good—it should tell a story."
                    image="https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=800&q=80"
                    reverse={false}
                />

                {/* Our Mission */}
                <Section
                    icon={<FaBullseye className="text-4xl text-orange-500" />}
                    title="Our Mission"
                    content="Our mission is to revolutionize the way you experience food delivery. We are committed to sustainability, supporting local farmers, and ensuring that every meal that leaves our kitchen meets the highest standards of quality and freshness."
                    image="https://images.unsplash.com/photo-1466978913421-dad938667132?auto=format&fit=crop&w=800&q=80"
                    reverse={true}
                />

                {/* Team Section */}
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <FaUsers className="text-5xl text-orange-500 mx-auto mb-6" />
                        <h2 className="text-4xl font-bold mb-4">Meet the Team</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">The passionate individuals behind your favorite meals.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <TeamCard
                            name="Aditya"
                            role="Founder & Head Chef"
                            image="https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=400&q=80"
                        />
                        <TeamCard
                            name="Sarah Johnson"
                            role="Sous Chef"
                            image="https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&w=400&q=80"
                        />
                        <TeamCard
                            name="Mike Chen"
                            role="Operations Manager"
                            image="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
                        />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-black/50 py-12 border-t border-gray-800 text-center">
                <p className="text-gray-500">© 2024 AddyBites. All rights reserved.</p>
            </footer>
        </div>
    );
};

const Section = ({ icon, title, content, image, reverse }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}
    >
        <div className="flex-1 space-y-6">
            <div className="flex items-center gap-4">
                {icon}
                <h2 className="text-4xl font-bold text-white">{title}</h2>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed">{content}</p>
        </div>
        <div className="flex-1 w-full">
            <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl opacity-20 group-hover:opacity-40 blur-lg transition duration-500"></div>
                <img
                    src={image}
                    alt={title}
                    className="relative w-full h-80 object-cover rounded-2xl shadow-2xl transform group-hover:scale-[1.02] transition duration-500"
                />
            </div>
        </div>
    </motion.div>
);

const TeamCard = ({ name, role, image }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ y: -10 }}
        className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-3xl border border-gray-700 hover:border-orange-500/50 transition duration-300 group"
    >
        <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-full blur opacity-50 group-hover:opacity-80 transition"></div>
            <img
                src={image}
                alt={name}
                className="relative w-full h-full object-cover rounded-full border-2 border-gray-700 group-hover:border-orange-500 transition"
            />
        </div>
        <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
        <p className="text-orange-400 font-medium">{role}</p>
    </motion.div>
);

export default About;
