import Navbar from "../Landing/Navbar.jsx";
import { useNavigate } from "react-router-dom";

const About = () => {
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
                    About Collab Flow
                </h1>

                <p className="max-w-2xl mx-auto opacity-90 text-base md:text-lg leading-relaxed">
                    Building a smarter way for teams to collaborate, manage work,
                    and stay organized — without confusion.
                </p>
            </section>

            {/* STORY */}
            <section className="py-16 md:py-20 px-4 md:px-6 max-w-5xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                    Our Story
                </h2>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                    Collab Flow started as a simple idea to solve everyday team problems —
                    scattered communication, missed tasks, and lack of coordination.
                    We built a platform where everything stays structured, simple, and efficient.
                </p>
            </section>

            {/* MISSION & VISION */}
            <section className="py-16 md:py-20 px-4 md:px-6 bg-gradient-to-b from-blue-50 to-gray-50">
                <div className="max-w-6xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">

                    {[
                        {
                            title: "Our Mission",
                            desc: "To simplify teamwork by providing a structured workspace for communication, task management, and productivity."
                        },
                        {
                            title: "Our Vision",
                            desc: "To become a platform that teams trust daily for collaboration and efficient work management."
                        }
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="bg-white p-7 md:p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300 border border-gray-100 cursor-pointer"
                        >
                            <h3 className="text-xl md:text-2xl font-semibold text-indigo-600 mb-3">
                                {item.title}
                            </h3>
                            <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}

                </div>
            </section>

            {/* VALUES */}
            <section className="py-16 md:py-20 px-4 md:px-6 max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Our Values
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Principles that guide everything we build
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                    {["Simplicity", "Collaboration", "Efficiency"].map((val, i) => (
                        <div
                            key={i}
                            className="bg-white p-7 rounded-2xl text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300 cursor-pointer border border-gray-100"
                        >
                            <h3 className="text-indigo-600 font-semibold mb-2 text-lg">
                                {val}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                We focus on delivering better user experience and productivity.
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 md:py-24 text-center bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-500 text-white relative overflow-hidden">

                <div className="absolute inset-0 bg-white opacity-5 blur-2xl"></div>

                <h2 className="text-2xl md:text-3xl font-bold mb-4 relative">
                    Join Collab Flow Today
                </h2>

                <p className="mb-6 md:mb-8 opacity-90 relative text-base md:text-lg">
                    Be part of a better way to collaborate.
                </p>

                <button
                    onClick={() => navigate("/login")}
                    className="px-8 md:px-10 py-3 bg-white text-blue-600 rounded-full font-semibold shadow-md hover:shadow-xl hover:-translate-y-1 active:scale-95 transition duration-300 cursor-pointer relative"
                >
                    Get Started
                </button>
            </section>

            {/* FOOTER */}
            <footer className="bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-500 text-white text-center py-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-white opacity-5 blur-2xl"></div>
                <p className="relative opacity-90">
                    © 2026 Collab Flow. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default About;