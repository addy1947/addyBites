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
            <div className="sticky top-0 z-50 bg-white shadow-md">
                <Head />
            </div>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-800 to-purple-400 relative">

                {/* Back Arrow */}
                <button
                    onClick={() => window.history.back()}
                    className="absolute top-6 left-6 bg-white shadow-md rounded-full p-3 hover:bg-purple-100 transition duration-200"
                    title="Go Back"
                >
                    ←
                </button>

                <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                    {/* Title with underline */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-purple-800 mb-2">Login</h2>
                        <div className="w-16 h-1 bg-purple-800 mx-auto rounded-full"></div>
                    </div>

                    {/* Toggle Buttons */}
                    <div className="flex gap-2 mb-8">
                        <button
                            className="flex-1 py-3 px-4 rounded-md bg-purple-600 text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-md"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate('/signin')}
                            className="flex-1 py-3 px-4 rounded-md bg-gray-300 text-gray-700 font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-gray-400"
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
                                    className={`w-full pl-10 pr-4 py-3 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all duration-200 ${submitted && emailError ? 'border-red-500 focus:ring-red-400' : 'border-transparent'
                                        }`}
                                />
                            </div>
                            {submitted && emailError && (
                                <p className="text-red-600 text-sm">{emailError}</p>
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
                                    className={`w-full pl-10 pr-4 py-3 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all duration-200 ${submitted && passwordError ? 'border-red-500 focus:ring-red-400' : 'border-transparent'
                                        }`}
                                />
                            </div>
                            {submitted && passwordError && (
                                <p className="text-red-600 text-sm">{passwordError}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-purple-700 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
