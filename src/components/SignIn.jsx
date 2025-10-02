import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import Head from './Head';

const SignIn = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [nameError, setNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { register } = useAuth()

    const validateName = (name) => {
        if (!name) {
            setNameError("Name is required")
            return false
        }
        if (name.length < 2) {
            setNameError("Name must be at least 2 characters long")
            return false
        }
        setNameError("")
        return true
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!email) {
            setEmailError("Email is required")
            return false
        }
        if (!emailRegex.test(email)) {
            setEmailError("Please include an '@' in the email address. '" + email + "' is missing an '@'.")
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

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        const isNameValid = validateName(name)
        const isEmailValid = validateEmail(email)
        const isPasswordValid = validatePassword(password)
        if (!isNameValid || !isEmailValid || !isPasswordValid) {
            return
        }

        setIsLoading(true);
        const result = await register(name, email, password);
        setIsLoading(false);

        if (result.success) {
            alert(result.data.message);
            navigate('/');
        } else {
            alert("Registration failed: " + result.error);
        }
    };

    return (
        <>
            {/* Header - Sticky only for tablets/desktops */}
            <div className="bg-white shadow-md md:sticky md:top-0 md:z-50">
                <Head />
            </div>

            {/* Main scrollable section with smooth behavior */}
            <div className="mt-4 scroll-smooth">
                <div
                    className="min-h-screen flex items-center justify-center py-8 sm:py-10 relative overflow-hidden"
                    style={{
                        backgroundImage: "url('/image/bg.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    {/* Overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/20"></div>
                    
                    {/* Floating elements for modern look */}
                    <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg animate-pulse delay-500"></div>

                    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 pt-6 sm:pt-10 relative z-10">
                        <div className="flex justify-center">
                            <div className="bg-[#4b3621]/95 backdrop-blur-sm text-white rounded-2xl p-6 sm:p-8 shadow-2xl w-full max-w-md border border-white/10">
                                {/* Back Arrow */}
                                <button
                                    onClick={() => window.history.back()}
                                    className="absolute -top-4 -left-4 bg-white text-[#4b3621] shadow-lg rounded-full p-3 hover:bg-gray-100 transition-all duration-300 hover:scale-110"
                                    title="Go Back"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                {/* Hero Section */}
                                <div className="text-center mb-8">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                                        Join AddyBites!
                                    </h2>
                                    <p className="text-gray-200 text-sm mb-4">
                                        Create your account and discover amazing flavors
                                    </p>
                                    <div className="w-20 h-1 bg-gradient-to-r from-white to-gray-300 mx-auto rounded-full"></div>
                                </div>

                                {/* Toggle Buttons */}
                                <div className="flex gap-2 mb-8 bg-white/10 rounded-xl p-1">
                                    <button
                                        onClick={() => navigate('/login')}
                                        className="flex-1 py-3 px-4 rounded-lg bg-transparent text-white font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-white/10"
                                    >
                                        Login
                                    </button>
                                    <button
                                        className="flex-1 py-3 px-4 rounded-lg bg-white text-[#4b3621] font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                                    >
                                        Sign Up
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name Input */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-200 block">
                                            Full Name
                                        </label>
                                        <div className="relative group">
                                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#4b3621] transition-colors">
                                                <FaUser size={16} />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Enter your full name"
                                                value={name}
                                                onChange={handleNameChange}
                                                className={`w-full pl-10 pr-4 py-4 bg-white/90 backdrop-blur-sm border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white transition-all duration-300 text-[#4b3621] placeholder-gray-400 ${submitted && nameError ? 'border-red-400 focus:ring-red-300' : 'border-white/20 focus:border-white/50'
                                                    }`}
                                            />
                                        </div>
                                        {submitted && nameError && (
                                            <p className="text-red-300 text-sm flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                {nameError}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email Input */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-200 block">
                                            Email Address
                                        </label>
                                        <div className="relative group">
                                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#4b3621] transition-colors">
                                                <FaEnvelope size={16} />
                                            </div>
                                            <input
                                                type="email"
                                                placeholder="Enter your email"
                                                value={email}
                                                onChange={handleEmailChange}
                                                className={`w-full pl-10 pr-4 py-4 bg-white/90 backdrop-blur-sm border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white transition-all duration-300 text-[#4b3621] placeholder-gray-400 ${submitted && emailError ? 'border-red-400 focus:ring-red-300' : 'border-white/20 focus:border-white/50'
                                                    }`}
                                            />
                                        </div>
                                        {submitted && emailError && (
                                            <p className="text-red-300 text-sm flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                {emailError}
                                            </p>
                                        )}
                                    </div>

                                    {/* Password Input */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-200 block">
                                            Password
                                        </label>
                                        <div className="relative group">
                                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#4b3621] transition-colors">
                                                <FaLock size={16} />
                                            </div>
                                            <input
                                                type="password"
                                                placeholder="Create a strong password"
                                                value={password}
                                                onChange={handlePasswordChange}
                                                className={`w-full pl-10 pr-4 py-4 bg-white/90 backdrop-blur-sm border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white transition-all duration-300 text-[#4b3621] placeholder-gray-400 ${submitted && passwordError ? 'border-red-400 focus:ring-red-300' : 'border-white/20 focus:border-white/50'
                                                    }`}
                                            />
                                        </div>
                                        {submitted && passwordError && (
                                            <p className="text-red-300 text-sm flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                {passwordError}
                                            </p>
                                        )}
                                    </div>

                                    {/* Password Requirements */}
                                    <div className="bg-white/5 rounded-lg p-3">
                                        <p className="text-xs text-gray-300 mb-2">Password requirements:</p>
                                        <ul className="text-xs text-gray-400 space-y-1">
                                            <li className="flex items-center gap-2">
                                                <div className={`w-1.5 h-1.5 rounded-full ${password.length >= 6 ? 'bg-green-400' : 'bg-gray-500'}`}></div>
                                                At least 6 characters
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className={`w-1.5 h-1.5 rounded-full ${password.length > 0 ? 'bg-green-400' : 'bg-gray-500'}`}></div>
                                                Contains letters and numbers
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-gradient-to-r from-white to-gray-100 text-[#4b3621] py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Creating your account...
                                            </>
                                        ) : (
                                            <>
                                                Create Account
                                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </>
                                        )}
                                    </button>

                                    {/* Additional Info */}
                                    <div className="text-center pt-4">
                                        <p className="text-xs text-gray-300">
                                            By creating an account, you agree to our 
                                            <a href="#" className="text-white hover:underline ml-1">Terms of Service</a> 
                                            and 
                                            <a href="#" className="text-white hover:underline ml-1">Privacy Policy</a>
                                        </p>
                                    </div>

                                    {/* Benefits Section */}
                                    <div className="bg-white/5 rounded-lg p-4 mt-6">
                                        <h3 className="text-sm font-semibold text-white mb-3">What you'll get:</h3>
                                        <div className="space-y-2 text-xs text-gray-300">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                Access to exclusive menu items
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                Faster checkout process
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                Order history and favorites
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn
