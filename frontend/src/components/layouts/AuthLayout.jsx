import React from 'react'

const AuthLayout = ({ children }) => {
    return (
        <div className='min-h-screen flex bg-gray-50'>

            {/* Left Panel - Form Section */}
            <div className='w-full md:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12'>

                {/* Logo */}
                <h2 className='text-2xl font-bold text-gray-900 tracking-tight mb-10 ml-8'>
                    Collab Flow
                </h2>

                {/* Form Content */}
                {children}

            </div>

            <div className='hidden md:flex w-1/2 bg-blue-600 flex-col items-center justify-center px-12 gap-8'>

                {/* Brand Name */}
                <div className='text-center'>
                    <h1 className='text-4xl font-extrabold text-white tracking-tight mb-2'>
                        Collab Flow
                    </h1>
                    <p className='text-blue-200 text-sm uppercase tracking-widest'>
                        Project Management Redefined
                    </p>
                </div>

                {/* Divider */}
                <div className='w-16 h-1 bg-blue-400 rounded-full' />

                {/* Main Tagline */}
                <div className='text-center'>
                    <h2 className='text-2xl font-bold text-white mb-3'>
                        Welcome Back 👋
                    </h2>
                    <p className='text-blue-100 text-center text-base max-w-sm'>
                        Collaborate, manage projects and connect with your team seamlessly.
                    </p>
                </div>

                {/* Feature Highlights */}
                <div className='flex flex-col gap-4 w-full max-w-sm'>

                    <div className='flex items-start gap-3 bg-blue-500/40 rounded-xl px-4 py-3'>
                        <span className='text-2xl'>📋</span>
                        <div>
                            <p className='text-white font-semibold text-sm'>Task Management</p>
                            <p className='text-blue-200 text-xs mt-0.5'>Create, assign and track tasks in real time</p>
                        </div>
                    </div>

                    <div className='flex items-start gap-3 bg-blue-500/40 rounded-xl px-4 py-3'>
                        <span className='text-2xl'>👥</span>
                        <div>
                            <p className='text-white font-semibold text-sm'>Team Collaboration</p>
                            <p className='text-blue-200 text-xs mt-0.5'>Work together with your team effortlessly</p>
                        </div>
                    </div>

                    <div className='flex items-start gap-3 bg-blue-500/40 rounded-xl px-4 py-3'>
                        <span className='text-2xl'>📊</span>
                        <div>
                            <p className='text-white font-semibold text-sm'>Progress Tracking</p>
                            <p className='text-blue-200 text-xs mt-0.5'>Visualize project progress with dashboards</p>
                        </div>
                    </div>

                    <div className='flex items-start gap-3 bg-blue-500/40 rounded-xl px-4 py-3'>
                        <span className='text-2xl'>🔔</span>
                        <div>
                            <p className='text-white font-semibold text-sm'>Smart Notifications</p>
                            <p className='text-blue-200 text-xs mt-0.5'>Stay updated with instant alerts and reminders</p>
                        </div>
                    </div>

                </div>

                {/* Footer Note */}
                <p className='text-blue-300 text-xs text-center max-w-xs'>
                    Trusted by teams worldwide to deliver projects on time 🚀
                </p>

            </div>

        </div>
    )
}

export default AuthLayout