import Navbar from "../Landing/Navbar.jsx";
import AnimatedFlow from "./AnimatedFlow.jsx";
import { useNavigate } from "react-router-dom";

const Features = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white text-gray-800">
            <Navbar />

            {/* HERO */}
            <section className="pt-28 pb-20 px-4 text-center bg-linear-to-br from-blue-600 via-blue-500 to-blue-400 text-white relative overflow-hidden">

                {/* Glow */}
                <div className="absolute -top-25 -left-25 w-75 h-75 bg-blue-300 opacity-30 blur-3xl rounded-full"></div>
                <div className="absolute -bottom-25 -right-25 w-75 h-75 bg-white opacity-20 blur-3xl rounded-full"></div>

                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    Powerful Features of Collab Flow
                </h1>

                <p className="max-w-2xl mx-auto opacity-90">
                    Everything you need to manage teamwork, track progress, and collaborate
                    effectively — all in one place.
                </p>

                <button
                    onClick={() => navigate("/login")}
                    className="mt-8 px-7 py-3 bg-white text-blue-600 rounded-full font-semibold shadow-lg hover:scale-105 transition cursor-pointer"
                >
                    Get Started
                </button>
            </section>

            {/* FEATURES GRID */}
            <section className="py-20 px-4 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Core Features
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        "Real-Time Collaboration",
                        "Task Management",
                        "Central Workspace",
                        "Progress Tracking",
                        "Team Communication",
                        "Clean UI Experience"
                    ].map((title, i) => (
                        <div
                            key={i}
                            className="bg-white border border-blue-100 p-6 rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300 cursor-pointer"
                        >
                            <h3 className="text-blue-600 font-semibold text-lg mb-2">
                                {title}
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Designed to improve team efficiency and workflow management.
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FLOW */}
            <AnimatedFlow />

            {/* PRODUCT VISUAL */}
            <section className="py-24 px-4 text-center bg-linear-to-br from-blue-50 to-white relative overflow-hidden">

                {/* Background Glow */}
                <div className="absolute -top-30 -left-30 w-[320px] h-80 bg-blue-200 opacity-40 blur-3xl rounded-full"></div>
                <div className="absolute -bottom-30 -right-30 w-[320px] h-80 bg-blue-300 opacity-30 blur-3xl rounded-full"></div>

                <h2 className="text-4xl font-bold mb-12 relative text-gray-800">
                    See CollabFlow in Action
                </h2>

                {/* 3D CONTAINER */}
                <div className="max-w-5xl mx-auto perspective cursor-pointer">

                    <div className="relative transform transition duration-500 hover:scale-105 hover:-translate-y-2">

                        {/* Glass Frame (NO DARK) */}
                        <div className="bg-white/70 backdrop-blur-xl border border-blue-100 p-6 rounded-2xl shadow-xl">

                            {/* Inner Screen */}
                            <div className="bg-white rounded-xl p-8 relative overflow-hidden">

                                {/* Light Reflection */}
                                <div className="absolute top-0 left-0 w-full h-16 bg-linear-to-b from-white/60 to-transparent pointer-events-none"></div>

                                <h3 className="text-blue-600 font-semibold mb-8 text-xl">
                                    Team Workspace
                                </h3>

                                <div className="grid md:grid-cols-3 gap-6 text-left">

                                    {[
                                        {
                                            title: "Tasks",
                                            desc: "Organize and assign tasks clearly",
                                        },
                                        {
                                            title: "Messages",
                                            desc: "Communicate instantly with your team",
                                        },
                                        {
                                            title: "Progress",
                                            desc: "Track real-time work updates",
                                        }
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            className="relative bg-blue-50 p-5 rounded-xl transition duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-xl group border border-blue-100"
                                        >
                                            {/* Soft Glow */}
                                            <div className="absolute inset-0 rounded-xl bg-blue-200 opacity-0 group-hover:opacity-20 blur-md transition"></div>

                                            <p className="font-semibold text-lg relative text-gray-800">
                                                {item.title}
                                            </p>
                                            <p className="text-sm text-gray-600 mt-1 relative">
                                                {item.desc}
                                            </p>
                                        </div>
                                    ))}

                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 text-center bg-linear-to-r from-blue-600 to-blue-500 text-white relative">

                <div className="absolute inset-0 bg-white opacity-5 blur-2xl"></div>

                <h2 className="text-3xl font-bold mb-4 relative">
                    Start Using CollabFlow Today
                </h2>

                <p className="mb-6 opacity-90 relative">
                    Experience seamless collaboration and productivity.
                </p>

                <button
                    onClick={() => navigate("/login")}
                    className="px-8 py-3 bg-white text-blue-600 rounded-full font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition cursor-pointer relative"
                >
                    Get Started
                </button>
            </section>

            {/* FOOTER */}
            <footer className="bg-blue-700 text-white py-6 text-center">
                <p>© 2026 CollabFlow. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Features;