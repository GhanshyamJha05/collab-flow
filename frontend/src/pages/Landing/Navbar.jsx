import { useContext, useState } from "react";
import { useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext.jsx";

const Navbar = () => {

    const dropdownRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Features", path: "/features" },
        { name: "About", path: "/about" }
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!dropdownRef.current) return;

            // only close if click is outside BOTH dropdown + button
            if (!dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            {/* NAVBAR WRAPPER */}
            <div className="fixed top-4 left-0 w-full z-50 flex justify-center px-3">

                <nav className="w-full max-w-6xl bg-white/80 backdrop-blur-xl border border-blue-100 shadow-md hover:shadow-blue-200 transition-all duration-300 rounded-2xl px-5 py-3 flex items-center justify-between">

                    {/* LEFT (UPDATED ONLY HERE) */}
                    <div className="flex items-center justify-between w-full md:w-auto gap-3">

                        <div className="flex items-center gap-3">
                            <button
                                className="md:hidden text-blue-600 hover:scale-110 transition"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                {isOpen ? <X size={26} /> : <Menu size={26} />}
                            </button>

                            <h1
                                onClick={() => navigate("/")}
                                className="text-lg md:text-xl font-bold text-blue-600 cursor-pointer tracking-wide hover:opacity-80 transition"
                            >
                                Collab Flow
                            </h1>
                        </div>

                        {/* MOBILE PROFILE ICON (UPDATED FOR DROPDOWN) */}
                        <div
                            className="md:hidden flex items-center relative"
                            ref={dropdownRef}
                            onClick={(e) => e.stopPropagation()} 
                        >
                            {user && (
                                <div
                                    className="cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation(); 
                                        setIsDropdownOpen((prev) => !prev);
                                    }}
                                >
                                    {user.profileImage ? (
                                        <img
                                            src={user.profileImage}
                                            alt="profile"
                                            className="w-8 h-8 rounded-full object-cover border"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold uppercase">
                                            {user.name?.charAt(0)}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* MOBILE DROPDOWN */}
                            {isDropdownOpen && (
                                <div
                                    className="absolute right-0 top-10 w-56 bg-white/95 backdrop-blur-xl border border-blue-100 shadow-2xl rounded-2xl overflow-hidden z-50"
                                    onClick={(e) => e.stopPropagation()}   // ✅ VERY IMPORTANT
                                >

                                    <DropdownItem
                                        label="Dashboard"
                                        onClick={() => {
                                            setIsDropdownOpen(false);
                                            setIsOpen(false);
                                            navigate(user.role === "admin"
                                                ? "/admin/dashboard"
                                                : "/user/dashboard"
                                            );
                                        }}
                                    />

                                    <DropdownItem
                                        label={user.role === "admin" ? "Manage Tasks" : "My Tasks"}
                                        onClick={() => {
                                            setIsDropdownOpen(false);
                                            setIsOpen(false);
                                            navigate(user.role === "admin"
                                                ? "/admin/tasks"
                                                : "/user/tasks"
                                            );
                                        }}
                                    />

                                    <div className="h-px bg-blue-100 my-1" />

                                    <DropdownItem
                                        label="Logout"
                                        danger
                                        onClick={() => {
                                            setIsDropdownOpen(false);
                                            setIsOpen(false);
                                            localStorage.removeItem("token");
                                            window.location.reload();
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                    </div>

                    {/* CENTER LINKS */}
                    <div className="hidden md:flex gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="relative group px-2 py-1 font-medium"
                            >
                                <span
                                    className={`transition duration-300 ${location.pathname === link.path
                                        ? "text-blue-600"
                                        : "text-gray-700 group-hover:text-blue-600"
                                        }`}
                                >
                                    {link.name}
                                </span>

                                <span
                                    className={`absolute left-0 -bottom-1 h-0.5 rounded-full bg-linear-to-r from-blue-600 to-blue-400 transition-all duration-300 ${location.pathname === link.path
                                        ? "w-full"
                                        : "w-0 group-hover:w-full"
                                        }`}
                                />
                            </Link>
                        ))}
                    </div>

                    {/* RIGHT SECTION (UNCHANGED) */}
                    <div className="hidden md:flex items-center gap-4">

                        {!user ? (
                            <>
                                <Link to="/login">
                                    <button className="px-5 py-1.5 border border-blue-500 text-blue-600 rounded-full transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-lg active:scale-95 cursor-pointer">
                                        Login
                                    </button>
                                </Link>

                                <Link to="/signup">
                                    <button className="px-5 py-1.5 bg-linear-to-r from-blue-600 via-blue-500 to-blue-400 text-white rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 relative overflow-hidden cursor-pointer">
                                        <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition blur-md"></span>
                                        <span className="relative z-10">Signup</span>
                                    </button>
                                </Link>
                            </>
                        ) : (
                            <div className="relative select-none" ref={dropdownRef}>

                                {/* PROFILE BUTTON */}
                                <div
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center gap-3 cursor-pointer group px-2 py-1 rounded-xl transition-all duration-300"
                                >
                                    {user.profileImage ? (
                                        <img
                                            src={user.profileImage}
                                            alt="profile"
                                            className="w-10 h-10 rounded-full object-cover border border-blue-200 group-hover:scale-105 transition"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold uppercase group-hover:scale-105 transition shadow-md">
                                            {user.name?.charAt(0)}
                                        </div>
                                    )}

                                    <span className="font-semibold text-gray-800 text-base group-hover:text-blue-600 transition tracking-wide">
                                        {user.name}
                                    </span>
                                </div>

                                {/* DROPDOWN */}
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-3 w-60 bg-white/95 backdrop-blur-xl border border-blue-100 shadow-2xl rounded-2xl overflow-hidden animate-fadeIn z-50">

                                        <DropdownItem
                                            label="Dashboard"
                                            onClick={() => {
                                                setIsDropdownOpen(false);
                                                navigate(user.role === "admin" ? "/admin/dashboard" : "/user/dashboard");
                                            }}
                                        />

                                        <DropdownItem
                                            label={user.role === "admin" ? "Manage Tasks" : "My Tasks"}
                                            onClick={() => {
                                                setIsDropdownOpen(false);
                                                navigate(user.role === "admin" ? "/admin/tasks" : "/user/tasks");
                                            }}
                                        />

                                        <div className="h-px bg-blue-100 my-1" />

                                        <DropdownItem
                                            label="Logout"
                                            danger
                                            onClick={() => {
                                                setIsDropdownOpen(false);
                                                localStorage.removeItem("token");
                                                window.location.reload();
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </nav>
            </div>

            {/* MOBILE DRAWER (UNCHANGED) */}
            <div
                className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-xl transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="p-5 flex flex-col h-full">

                    <button
                        onClick={() => setIsOpen(false)}
                        className="mb-6 text-blue-600 hover:scale-110 transition"
                    >
                        <X size={28} />
                    </button>

                    <div className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`px-3 py-2 rounded-lg text-lg font-medium transition ${location.pathname === link.path
                                    ? "bg-blue-100 text-blue-600"
                                    : "text-gray-700 hover:bg-blue-50"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="mt-auto pt-8 flex flex-col gap-3">

                        {!user ? (
                            <>
                                <Link to="/login" onClick={() => setIsOpen(false)}>
                                    <button className="w-full border border-blue-500 py-2 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition">
                                        Login
                                    </button>
                                </Link>

                                <Link to="/signup" onClick={() => setIsOpen(false)}>
                                    <button className="w-full bg-linear-to-r from-blue-600 to-blue-500 text-white py-2 rounded-full hover:scale-105 transition shadow">
                                        Signup
                                    </button>
                                </Link>
                            </>
                        ) : (
                            <div
                                onClick={() => {
                                    setIsOpen(false);
                                    navigate(
                                        user.role === "admin"
                                            ? "/admin/dashboard"
                                            : "/user/dashboard"
                                    );
                                }}
                                className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg cursor-pointer"
                            >
                                {user.profileImage ? (
                                    <img
                                        src={user.profileImage}
                                        alt="profile"
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                                        {user.name?.charAt(0)}
                                    </div>
                                )}

                                <span className="font-semibold text-gray-700">
                                    {user.name}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* OVERLAY */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default Navbar;

const DropdownItem = ({ label, onClick, danger }) => {
    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClick();
            }}
            className={`
                w-full text-left px-5 py-3 text-[15px] font-medium
                transition-all duration-200 cursor-pointer
                hover:pl-6 hover:scale-[1.02]
                ${danger
                    ? "text-red-500 hover:bg-red-50"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }
            `}
        >
            {label}
        </button>
    );
};