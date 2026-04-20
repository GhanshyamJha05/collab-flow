import Navbar from "../Landing/Navbar.jsx";
import { useNavigate } from "react-router-dom";

const About = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white text-gray-800">
            <Navbar />

            {/* HERO */}
            <section className="pt-28 pb-20 px-4 text-center bg-linear-to-br from-blue-600 via-blue-500 to-blue-400 text-white relative overflow-hidden">

                {/* Glow */}
                <div className="absolute -top-30 -left-30 w-[320px] h-80 bg-blue-300 opacity-30 blur-3xl rounded-full"></div>
                <div className="absolute -bottom-30 -right-30 w-[320px] h-80 bg-white opacity-20 blur-3xl rounded-full"></div>

                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    About Collab Flow
                </h1>

                <p className="max-w-2xl mx-auto opacity-90">
                    Building a smarter way for teams to collaborate, manage work,
                    and stay organized — without confusion.
                </p>
            </section>

            {/* STORY */}
            <section className="py-20 px-4 max-w-5xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-600 leading-relaxed">
                    CollabFlow started as a simple idea to solve everyday team problems —
                    scattered communication, missed tasks, and lack of coordination.
                    We built a platform where everything stays structured, simple, and efficient.
                </p>
            </section>

            {/* MISSION & VISION */}
            <section className="py-20 px-4 bg-blue-50">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

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
                            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300 border border-blue-100 cursor-pointer"
                        >
                            <h3 className="text-2xl font-semibold text-blue-600 mb-3">
                                {item.title}
                            </h3>
                            <p className="text-gray-600">{item.desc}</p>
                        </div>
                    ))}

                </div>
            </section>

            {/* VALUES */}
            <section className="py-20 px-4 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Our Values
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {["Simplicity", "Collaboration", "Efficiency"].map((val, i) => (
                        <div
                            key={i}
                            className="bg-blue-50 p-8 rounded-xl text-center shadow hover:shadow-xl hover:-translate-y-2 transition cursor-pointer"
                        >
                            <h3 className="text-blue-600 font-semibold mb-2 text-lg">
                                {val}
                            </h3>
                            <p className="text-gray-600 text-sm">
                                We focus on delivering better user experience and productivity.
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 text-center bg-linear-to-r from-blue-600 to-blue-500 text-white relative">

                <div className="absolute inset-0 bg-white opacity-5 blur-2xl"></div>

                <h2 className="text-3xl font-bold mb-4 relative">
                    Join CollabFlow Today
                </h2>

                <p className="mb-6 opacity-90 relative">
                    Be part of a better way to collaborate.
                </p>

                <button
                    onClick={() => navigate("/login")}
                    className="px-8 py-3 bg-white text-blue-600 rounded-full font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition cursor-pointer relative"
                >
                    Get Started
                </button>
            </section>

            {/* FOOTER */}
            <footer className="bg-blue-700 text-white text-center py-6">
                © 2026 CollabFlow. All rights reserved.
            </footer>
        </div>
    );
};

export default About;