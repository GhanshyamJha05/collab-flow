import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from '../../components/layouts/AuthLayout.jsx';
import Input from '../../components/inputs/Input.jsx';
import { validateEmail } from '../../utils/helper.js';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    //* handle login form submit
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        if (!password) {
            setError("Please enter the password");
            return;
        }

        setError("");
    }

    return (
        <AuthLayout>
            <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center px-6 sm:px-10'>

                <h3 className='text-2xl font-bold text-gray-900 tracking-tight'>
                    Welcome Back 👋
                </h3>

                <p className='text-sm text-gray-500 mt-2 mb-8'>
                    Please enter your details to log in
                </p>

                <form onSubmit={handleLogin} className='space-y-5'>

                    <Input
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        label="Email Address"
                        placeholder="Enter your email address"
                        type="email"
                    />

                    <Input
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                    />

                    {error && (
                        <p className='flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg animate-fade-in'>
                            {error}
                        </p>
                    )}

                    <button
                        type='submit'
                        className='btn-primary'
                    >
                        Login
                    </button>

                    <p className='text-sm text-gray-600 text-center mt-4'>
                        Don't have an account?{" "}
                        <Link
                            className='font-semibold text-indigo-600 hover:text-indigo-800 underline transition-colors duration-200'
                            to="/signup"
                        >
                            Sign Up
                        </Link>
                    </p>

                </form>
            </div>
        </AuthLayout >
    )
}

export default Login