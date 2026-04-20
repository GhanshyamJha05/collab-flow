import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout.jsx'
import { validateEmail } from '../../utils/helper.js';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector.jsx';
import Input from '../../components/inputs/Input.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";
import axiosInstance from '../../utils/axiosInstance.js';
import { API_PATHS } from '../../utils/apiPaths.js';
import { UserContext } from '../../context/userContext.jsx';
import uploadImage from '../../utils/uploadImage.js';

const SignUp = () => {

    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [adminInviteToken, setAdminInviteToken] = useState('');
    const [error, setError] = useState(null);

    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    //* handle sign up form submit
    const handleSignUp = async (e) => {
        e.preventDefault();

        let profileImageUrl = '';

        if (!fullName) {
            setError("Please enter a full name");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        if (!password) {
            setError("Please enter the password");
            return;
        }

        setError("");

        try {
            if (profilePic) {
                const imgUploadRes = await uploadImage(profilePic);
                profileImageUrl = imgUploadRes.imageUrl || "";
            }

            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                name: fullName,
                email,
                password,
                profileImageUrl,
                adminInviteToken
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
            } else {
                setError("Something went wrong. Please try again later.");
            }
        }
    }

    return (
        <AuthLayout>
            {/* ✅ relative + pt added for spacing */}
            <div className='w-full max-w-lg mx-auto flex flex-col justify-center mt-8 lg:ml-10 md:mt-12 relative pt-4'>

                {/* 🔙 BACK BUTTON */}
                <div className="mb-3">
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
                    Create an Account ✨
                </h3>

                <p className='text-sm text-gray-500 mt-2 mb-8'>
                    Join us today by entering your details below.
                </p>

                <form onSubmit={handleSignUp} className='space-y-6'>

                    <div className='flex justify-center'>
                        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} name={fullName} />
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

                        <Input
                            value={fullName}
                            onChange={({ target }) => setFullName(target.value)}
                            label="Full Name"
                            placeholder="Enter your full name"
                            type='text'
                        />

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

                        <Input
                            value={adminInviteToken}
                            onChange={({ target }) => setAdminInviteToken(target.value)}
                            label="Admin Invite Token"
                            placeholder="Enter your 6-Digit token"
                            type="number"
                        />
                    </div>

                    {error && (
                        <p className='flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg animate-fade-in'>
                            {error}
                        </p>
                    )}

                    <button
                        type='submit'
                        className='btn-primary'
                    >
                        Sign Up
                    </button>

                    <p className='text-sm text-gray-600 text-center'>
                        Already have an account?{" "}
                        <Link
                            className='font-semibold text-blue-600 hover:text-blue-800 underline transition-colors duration-200'
                            to="/login"
                        >
                            Login
                        </Link>
                    </p>

                </form>
            </div>
        </AuthLayout>
    )
}

export default SignUp;