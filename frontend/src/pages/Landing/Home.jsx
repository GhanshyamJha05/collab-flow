import Navbar from "../Landing/Navbar.jsx";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-50 text-gray-800">
            <Navbar />

            {/* HERO SECTION */}
            <section className="pt-28 md:pt-32 pb-20 md:pb-24 px-4 md:px-6 text-center bg-gradient-to-br from-indigo-600 via-blue-600 to-sky-500 text-white relative overflow-hidden">

                {/* Glow Effects */}
                <div className="absolute -top-40 -left-40 w-[420px] h-[420px] bg-indigo-400 opacity-25 blur-[120px] rounded-full"></div>
                <div className="absolute -bottom-40 -right-40 w-[420px] h-[420px] bg-sky-300 opacity-20 blur-[120px] rounded-full"></div>

                <h1 className="text-3xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
                    Collaborate Smarter <br /> Work Better Together
                </h1>

                <p className="max-w-2xl mx-auto text-base md:text-lg opacity-90 leading-relaxed">
                    Manage tasks, communicate with your team, and keep everything organized —
                    all in one powerful workspace.
                </p>

                <div className="mt-8 flex justify-center gap-4 flex-wrap">
                    <button
                        onClick={() => navigate("/login")}
                        className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:shadow-xl hover:-translate-y-1 active:scale-95 transition duration-300 cursor-pointer relative"
                    >
                        Get Started
                    </button>
                </div>
            </section>

            {/* ABOUT SECTION */}
            <section className="py-16 md:py-20 px-4 md:px-6 max-w-6xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                    What is Collab Flow?
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-base md:text-lg">
                    Collab Flow is a modern team collaboration platform that helps teams
                    stay organized, communicate clearly, and manage tasks efficiently —
                    without confusion or delays.
                </p>
            </section>

            {/* PROBLEMS SECTION */}
            <section className="bg-gradient-to-b from-blue-50 to-gray-50 py-16 md:py-20 px-4 md:px-6">
                <div className="max-w-6xl mx-auto">

                    {/* Section Heading */}
                    <div className="text-center mb-12 md:mb-14">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                            Problems We Solve
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Common collaboration issues that slow teams down
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                        {[
                            "Lack of Team Communication",
                            "Task Mismanagement",
                            "Poor Collaboration",
                            "File & Resource Scattering",
                            "No Progress Tracking",
                            "Time Wastage in Coordination"
                        ].map((title, i) => (
                            <div
                                key={i}
                                className="bg-white p-6 md:p-7 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300 border border-gray-100 cursor-pointer"
                            >
                                <h3 className="font-semibold text-lg mb-2 text-indigo-600">
                                    {title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    CollabFlow provides a centralized and structured system to solve this efficiently.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURE STRIP */}
            <section className="py-16 md:py-20 px-4 md:px-6 max-w-6xl mx-auto">

                {/* Section Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Powerful Features
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Everything you need to collaborate efficiently
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 text-center">
                    {[
                        "Real-time Collaboration",
                        "Smart Task Management",
                        "Central Workspace"
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="p-6 md:p-7 rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 bg-white shadow-sm cursor-pointer"
                        >
                            <h3 className="font-semibold text-indigo-600 mb-2 text-lg">
                                {item}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Boost productivity with structured collaboration and efficient workflows.
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-20 md:py-24 text-center bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-500 text-white relative overflow-hidden">

                <div className="absolute inset-0 bg-white opacity-5 blur-2xl"></div>

                <h2 className="text-2xl md:text-3xl font-bold mb-4 relative">
                    Start Collaborating Today
                </h2>

                <p className="mb-6 md:mb-8 opacity-90 relative text-base md:text-lg">
                    Join teams who are already improving their workflow.
                </p>

                <button
                    onClick={() => navigate("/login")}
                    className="px-8 md:px-10 py-3 bg-white text-blue-600 rounded-full font-semibold shadow-md hover:shadow-xl hover:-translate-y-1 active:scale-95 transition duration-300 cursor-pointer relative"
                >
                    Start Free
                </button>
            </section>

            {/* FOOTER */}
            <footer className="bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-500 text-white text-center py-6 text-sm relative overflow-hidden">

                {/* subtle glow */}
                <div className="absolute inset-0 bg-white opacity-5 blur-2xl"></div>

                <p className="relative opacity-90">
                    © 2026 Collab Flow. All rights reserved.
                </p>

            </footer>
        </div>
    );
};

export default Home;