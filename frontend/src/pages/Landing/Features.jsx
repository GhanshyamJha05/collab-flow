import Navbar from "../Landing/Navbar.jsx";
import AnimatedFlow from "./AnimatedFlow.jsx";
import { useNavigate } from "react-router-dom";

const Features = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-50 text-gray-800">
            <Navbar />

            {/* HERO */}
            <section className="pt-28 md:pt-32 pb-20 md:pb-24 px-4 md:px-6 text-center bg-gradient-to-br from-indigo-600 via-blue-600 to-sky-500 text-white relative overflow-hidden">

                {/* Glow */}
                <div className="absolute -top-40 -left-40 w-[420px] h-[420px] bg-indigo-400 opacity-25 blur-[120px] rounded-full"></div>
                <div className="absolute -bottom-40 -right-40 w-[420px] h-[420px] bg-sky-300 opacity-20 blur-[120px] rounded-full"></div>

                <h1 className="text-3xl md:text-6xl font-extrabold mb-6 tracking-tight">
                    Powerful Features of Collab Flow
                </h1>

                <p className="max-w-2xl mx-auto opacity-90 text-base md:text-lg leading-relaxed">
                    Everything you need to manage teamwork, track progress, and collaborate
                    effectively — all in one place.
                </p>

                <button
                    onClick={() => navigate("/login")}
                    className="mt-8 px-8 py-3 bg-white text-blue-600 rounded-full font-semibold shadow-md hover:shadow-xl hover:-translate-y-1 active:scale-95 transition duration-300 cursor-pointer relative"
                >
                    Get Started
                </button>
            </section>

            {/* FEATURES GRID */}
            <section className="py-16 md:py-20 px-4 md:px-6 max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Core Features
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Built to simplify teamwork and boost productivity
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
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
                            className="bg-white border border-gray-100 p-6 md:p-7 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300 cursor-pointer group"
                        >
                            <h3 className="text-indigo-600 font-semibold text-lg mb-2">
                                {title}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Designed to improve team efficiency and workflow management.
                            </p>

                            {/* subtle hover glow */}
                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 bg-indigo-400 blur-xl transition pointer-events-none"></div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FLOW */}
            <AnimatedFlow />

            {/* PRODUCT VISUAL */}
            <section className="py-20 md:py-24 px-4 md:px-6 text-center bg-gradient-to-br from-blue-50 to-gray-50 relative overflow-hidden">

                {/* Background Glow */}
                <div className="absolute -top-40 -left-40 w-[420px] h-[420px] bg-indigo-200 opacity-40 blur-[120px] rounded-full"></div>
                <div className="absolute -bottom-40 -right-40 w-[420px] h-[420px] bg-sky-200 opacity-30 blur-[120px] rounded-full"></div>

                <h2 className="text-3xl md:text-4xl font-bold mb-12 relative text-gray-900">
                    See Collab Flow in Action
                </h2>

                {/* 3D CONTAINER */}
                <div className="max-w-5xl mx-auto perspective cursor-pointer">

                    <div className="relative transform transition duration-500 hover:scale-105 hover:-translate-y-2">

                        {/* Glass Frame */}
                        <div className="bg-white/70 backdrop-blur-xl border border-gray-100 p-6 rounded-2xl shadow-xl">

                            {/* Inner Screen */}
                            <div className="bg-white rounded-xl p-8 relative overflow-hidden">

                                {/* Light Reflection */}
                                <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white/60 to-transparent pointer-events-none"></div>

                                <h3 className="text-indigo-600 font-semibold mb-8 text-xl">
                                    Team Workspace
                                </h3>

                                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">

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
                                            className="relative bg-blue-50 p-5 rounded-xl transition duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-xl group border border-gray-100"
                                        >
                                            {/* Soft Glow */}
                                            <div className="absolute inset-0 rounded-xl bg-indigo-300 opacity-0 group-hover:opacity-20 blur-md transition"></div>

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
            <section className="py-20 md:py-24 text-center bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-500 text-white relative overflow-hidden">

                <div className="absolute inset-0 bg-white opacity-5 blur-2xl"></div>

                <h2 className="text-2xl md:text-3xl font-bold mb-4 relative">
                    Start Using Collab Flow Today
                </h2>

                <p className="mb-6 md:mb-8 opacity-90 relative text-base md:text-lg">
                    Experience seamless collaboration and productivity.
                </p>

                <button
                    onClick={() => navigate("/login")}
                    className="px-8 md:px-10 py-3 bg-white text-blue-600 rounded-full font-semibold shadow-md hover:shadow-xl hover:-translate-y-1 active:scale-95 transition duration-300 cursor-pointer relative"
                >
                    Get Started
                </button>
            </section>

            {/* FOOTER */}
            <footer className="bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-500 text-white py-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-white opacity-5 blur-2xl"></div>
                <p className="relative opacity-90">
                    © 2026 Collab Flow. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default Features;