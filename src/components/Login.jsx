import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import Head from './Head';


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
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
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
            alert(result.data.message);
            navigate('/');
        } else {
            alert("Login failed: " + result.error);
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
                    className="min-h-screen flex items-center justify-center py-8 sm:py-10"
                    style={{
                        backgroundImage: "url('/image/bg.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 pt-6 sm:pt-10">
                        <div className="flex justify-center">
                            <div className="bg-[#4b3621] text-white rounded-xl p-6 sm:p-8 shadow-lg w-full max-w-md">
                                {/* Back Arrow */}
                                <button
                                    onClick={() => window.history.back()}
                                    className="absolute top-6 left-6 bg-white text-[#4b3621] shadow-md rounded-full p-3 hover:bg-gray-100 transition duration-200"
                                    title="Go Back"
                                >
                                    ←
                                </button>

                                {/* Title with underline */}
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-bold text-white mb-2">Login</h2>
                                    <div className="w-16 h-1 bg-white mx-auto rounded-full"></div>
                                </div>

                                {/* Toggle Buttons */}
                                <div className="flex gap-2 mb-8">
                                    <button
                                        className="flex-1 py-3 px-4 rounded-lg bg-white text-[#4b3621] font-semibold transition-all duration-300 transform hover:scale-105 shadow-md"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => navigate('/signin')}
                                        className="flex-1 py-3 px-4 rounded-lg bg-gray-300 text-gray-700 font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-gray-400"
                                    >
                                        Sign Up
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Email Input */}
                                    <div className="space-y-2">
                                        <div className="relative">
                                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                <FaEnvelope size={16} />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Email id"
                                                value={email}
                                                onChange={handleEmailChange}
                                                className={`w-full pl-10 pr-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:bg-white transition-all duration-200 text-[#4b3621] ${submitted && emailError ? 'border-red-500 focus:ring-red-400' : 'border-transparent'
                                                    }`}
                                            />
                                        </div>
                                        {submitted && emailError && (
                                            <p className="text-red-300 text-sm">{emailError}</p>
                                        )}
                                    </div>

                                    {/* Password Input */}
                                    <div className="space-y-2">
                                        <div className="relative">
                                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                <FaLock size={16} />
                                            </div>
                                            <input
                                                type="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={handlePasswordChange}
                                                className={`w-full pl-10 pr-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:bg-white transition-all duration-200 text-[#4b3621] ${submitted && passwordError ? 'border-red-500 focus:ring-red-400' : 'border-transparent'
                                                    }`}
                                            />
                                        </div>
                                        {submitted && passwordError && (
                                            <p className="text-red-300 text-sm">{passwordError}</p>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-white text-[#4b3621] py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-gray-100 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? 'Logging in...' : 'Login'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
