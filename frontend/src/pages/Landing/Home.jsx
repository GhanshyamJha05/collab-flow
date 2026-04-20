import Navbar from "../Landing/Navbar.jsx";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white text-gray-800">
            <Navbar />

            {/* HERO SECTION */}
            <section className="pt-28 pb-20 px-4 text-center bg-linear-to-br from-blue-600 via-blue-500 to-blue-400 text-white relative overflow-hidden">

                {/* Glow Effects */}
                <div className="absolute -top-30 -left-30 w-[320px] h-80 bg-blue-300 opacity-30 blur-3xl rounded-full"></div>
                <div className="absolute -bottom-30 -right-30 w-[320px] h-80 bg-white opacity-20 blur-3xl rounded-full"></div>

                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    Collaborate Smarter <br /> Work Better Together
                </h1>

                <p className="max-w-2xl mx-auto text-lg opacity-90">
                    Manage tasks, communicate with your team, and keep everything organized —
                    all in one powerful workspace.
                </p>

                <div className="mt-8 flex justify-center gap-4 flex-wrap">
                    <button
                        onClick={() => navigate("/login")}
                        className="px-7 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition cursor-pointer"
                    >
                        Get Started
                    </button>
                </div>
            </section>

            {/* ABOUT SECTION */}
            <section className="py-16 px-4 max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">What is CollabFlow?</h2>
                <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    CollabFlow is a modern team collaboration platform that helps teams
                    stay organized, communicate clearly, and manage tasks efficiently —
                    without confusion or delays.
                </p>
            </section>

            {/* PROBLEMS SECTION */}
            <section className="bg-blue-50 py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Problems We Solve
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
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
                                className="bg-white p-6 rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300 cursor-pointer border border-blue-50"
                            >
                                <h3 className="font-semibold text-lg mb-2 text-blue-600">
                                    {title}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    CollabFlow provides a centralized and structured system to solve this efficiently.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURE STRIP */}
            <section className="py-16 px-4 max-w-6xl mx-auto grid md:grid-cols-3 gap-6 text-center">
                {[
                    "Real-time Collaboration",
                    "Smart Task Management",
                    "Central Workspace"
                ].map((item, i) => (
                    <div
                        key={i}
                        className="p-6 rounded-xl border border-blue-100 hover:shadow-xl hover:-translate-y-1 transition cursor-pointer bg-white"
                    >
                        <h3 className="font-semibold text-blue-600 mb-2">{item}</h3>
                        <p className="text-gray-600 text-sm">
                            Boost productivity with structured collaboration and efficient workflows.
                        </p>
                    </div>
                ))}
            </section>

            {/* CTA SECTION */}
            <section className="py-20 text-center bg-linear-to-r from-blue-600 to-blue-500 text-white relative">

                {/* subtle glow */}
                <div className="absolute inset-0 bg-white opacity-5 blur-2xl"></div>

                <h2 className="text-3xl font-bold mb-4 relative">
                    Start Collaborating Today
                </h2>

                <p className="mb-6 opacity-90 relative">
                    Join teams who are already improving their workflow.
                </p>

                <button
                    onClick={() => navigate("/login")}
                    className="px-8 py-3 bg-white text-blue-600 rounded-full font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition cursor-pointer relative"
                >
                    Start Free
                </button>
            </section>

            {/* FOOTER */}
            <footer className="bg-blue-700 text-white text-center py-5">
                © 2026 CollabFlow. All rights reserved.
            </footer>
        </div>
    );
};

export default Home;