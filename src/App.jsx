import React from 'react'
import First from './pages/First'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Second from './pages/Second'
import Login from './components/Login'
import SignIn from './components/SignIn'
import Logout from './components/Logout'
import { AuthProvider } from './context/AuthContext'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import Checkout from './pages/Checkout'
import NewAddress from './pages/NewAddress'


const App = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <First />,
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