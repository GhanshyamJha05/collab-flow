import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout.jsx'
import { validateEmail } from '../../utils/helper.js';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector.jsx';
import Input from '../../components/inputs/Input.jsx';
import { Link } from 'react-router-dom';

const SignUp = () => {

    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [adminInviteToken, setAdminInviteToken] = useState('');

    const [error, setError] = useState(null);

    //* handle sign up form submit
    const handleSignUp = async (e) => {
        e.preventDefault();

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

        //* sign up API call
        try {

        } catch (error) {

        }
    }

    return (
        <AuthLayout>
            <div className='w-full max-w-lg mx-auto flex flex-col justify-center mt-8 lg:ml-10 md:mt-12'>

                <h3 className='text-2xl font-bold text-gray-900 tracking-tight'>
                    Create an Account ✨
                </h3>

                <p className='text-sm text-gray-500 mt-2 mb-8'>
                    Join us today by entering your details below.
                </p>

                <form onSubmit={handleSignUp} className='space-y-6'>

                    <div className='flex justify-center'>
                        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
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
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
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

export default SignUp