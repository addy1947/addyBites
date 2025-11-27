import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import First from './pages/First'
import Second from './pages/Second'
import About from './pages/About'
import Login from './components/Login'
import SignIn from './components/SignIn'
import Logout from './components/Logout'
import Profile from './pages/Profile'
import Checkout from './pages/Checkout'
import NewAddress from './pages/NewAddress'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'

const App = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <LandingPage />,
        },
        {
            path: '/menu',
            element: <First />,
        },
        {
            path: '/about',
            element: <About />,
        },
        {
            path: 'details/:_id',
            element: <Second />
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/signin',
            element: <SignIn />
        },
        {
            path: '/logout',
            element: (
                <ProtectedRoute>
                    <Logout />
                </ProtectedRoute>
            )
        },
        {
            path: '/user/:_id',
            element: (
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            )
        },
        {
            path: '/user/:_id/checkout',
            element: (
                <ProtectedRoute>
                    <Checkout />
                </ProtectedRoute>
            )
        },
        {
            path: '/user/:_id/saveaddress',
            element: (
                <ProtectedRoute>
                    <NewAddress />
                </ProtectedRoute>
            )
        }
    ])

    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    )
}

export default App