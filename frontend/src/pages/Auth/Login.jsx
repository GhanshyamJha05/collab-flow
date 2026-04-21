import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AuthLayout from '../../components/layouts/AuthLayout.jsx';
import Input from '../../components/inputs/Input.jsx';
import { validateEmail } from '../../utils/helper.js';
import axiosInstance from '../../utils/axiosInstance.js';
import { API_PATHS } from '../../utils/apiPaths.js';
import { UserContext } from '../../context/userContext.jsx';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { updateUser } = useContext(UserContext);
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
        setLoading(true);

        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password
            });

            const { token, role } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                updateUser(response.data);

                if (role === "admin") {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/user/dashboard");
                }
            }

        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else if (error.message) {
                setError(error.message);
            } else {
                setError("Network issue. Please try again.");
            }
        } finally {
            setLoading(false); 
        }
    }

    return (
        <AuthLayout>
            <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center px-6 sm:px-10 relative'>

                {/* 🔙 BACK BUTTON */}
                <div className="mb-6">
                    <button
                        onClick={() => navigate(-1) || navigate("/")}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 font-medium shadow-sm hover:bg-blue-100 hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer group"
                    >
                        <ArrowLeft
                            size={18}
                            className="group-hover:-translate-x-1 transition-transform duration-300"
                        />
                        <span className="text-sm">Back</span>
                    </button>
                </div>

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
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
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
        </AuthLayout>
    )
}

export default Login;