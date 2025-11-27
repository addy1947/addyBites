import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEnvelope, FaLock, FaArrowLeft } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import Head from './Head';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { login } = useAuth()

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!email) {
            setEmailError("Email is required")
            return false
        }
        if (!emailRegex.test(email)) {
            setEmailError("Please include an '@' in the email address.")
            return false
        }
        setEmailError("")
        return true
    }

    const validatePassword = (password) => {
        if (!password) {
            setPasswordError("Password is required")
            return false
        }
        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters long")
            return false
        }
        setPasswordError("")
        return true
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        if (submitted) validateEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        if (submitted) validatePassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        const isEmailValid = validateEmail(email)
        const isPasswordValid = validatePassword(password)
        if (!isEmailValid || !isPasswordValid) {
            return
        }

        setIsLoading(true);
        const result = await login(email, password);
        setIsLoading(false);

        if (result.success) {
            navigate('/');
        } else {
            alert("Login failed: " + result.error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 font-sans text-gray-100 flex flex-col">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
                <Head />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center relative overflow-hidden p-4 sm:p-6">
                {/* Background Effects */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/20 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 w-full max-w-md"
                >
                    <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl shadow-2xl overflow-hidden">
                        {/* Decorative Top Bar */}
                        <div className="h-2 bg-gradient-to-r from-orange-500 to-red-600" />

                        <div className="p-8 sm:p-10">
                            {/* Header Section */}
                            <div className="text-center mb-8">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                                    className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-orange-500/30"
                                >
                                    <FaLock className="text-white text-2xl" />
                                </motion.div>
                                <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                                <p className="text-gray-400">Sign in to continue your tasty journey</p>
                            </div>

                            {/* Toggle Switch */}
                            <div className="flex bg-gray-900/50 p-1 rounded-xl mb-8 border border-gray-700/50">
                                <button
                                    className="flex-1 py-2.5 text-sm font-semibold rounded-lg bg-gray-800 text-white shadow-sm transition-all"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => navigate('/signin')}
                                    className="flex-1 py-2.5 text-sm font-semibold rounded-lg text-gray-400 hover:text-white transition-all"
                                >
                                    Sign Up
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Email Field */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-500 transition-colors">
                                            <FaEnvelope />
                                        </div>
                                        <input
                                            type="text"
                                            value={email}
                                            onChange={handleEmailChange}
                                            placeholder="name@example.com"
                                            className={`w-full bg-gray-900/50 border ${submitted && emailError ? 'border-red-500/50 focus:border-red-500' : 'border-gray-700 focus:border-orange-500'} rounded-xl py-3.5 pl-11 pr-4 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-all`}
                                        />
                                    </div>
                                    {submitted && emailError && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-400 text-xs ml-1"
                                        >
                                            {emailError}
                                        </motion.p>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center ml-1">
                                        <label className="text-sm font-medium text-gray-300">Password</label>
                                        <a href="#" className="text-xs text-orange-400 hover:text-orange-300 transition-colors">Forgot password?</a>
                                    </div>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-500 transition-colors">
                                            <FaLock />
                                        </div>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={handlePasswordChange}
                                            placeholder="••••••••"
                                            className={`w-full bg-gray-900/50 border ${submitted && passwordError ? 'border-red-500/50 focus:border-red-500' : 'border-gray-700 focus:border-orange-500'} rounded-xl py-3.5 pl-11 pr-4 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-all`}
                                        />
                                    </div>
                                    {submitted && passwordError && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-400 text-xs ml-1"
                                        >
                                            {passwordError}
                                        </motion.p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>Signing In...</span>
                                        </>
                                    ) : (
                                        "Sign In"
                                    )}
                                </motion.button>
                            </form>
                        </div>

                        {/* Footer */}
                        <div className="bg-gray-900/50 p-4 text-center border-t border-gray-700/50">
                            <p className="text-sm text-gray-400">
                                Don't have an account?{' '}
                                <button onClick={() => navigate('/signin')} className="text-orange-400 font-semibold hover:text-orange-300 transition-colors">
                                    Create one
                                </button>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Login
