import { motion } from "framer-motion";

const flowSteps = [
    {
        title: "Problem",
        color: "text-red-500",
        desc: "Team communication is scattered and tasks are unorganized."
    },
    {
        title: "CollabFlow",
        color: "text-blue-600",
        desc: "Centralized workspace with structured collaboration and task management."
    },
    {
        title: "Result",
        color: "text-green-500",
        desc: "Better productivity, clear communication, and efficient workflow."
    }
];

const container = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.5
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
    }
};

const arrow = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5 }
    }
};

const AnimatedFlow = () => {
    return (
        <section className="bg-blue-50 py-16 px-4">
            <div className="max-w-6xl mx-auto text-center">

                <h2 className="text-2xl font-bold mb-12">
                    How CollabFlow Solves Real Problems
                </h2>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    className="flex flex-col md:flex-row items-center justify-between gap-6"
                >
                    {flowSteps.map((step, index) => (
                        <>
                            {/* CARD */}
                            <motion.div
                                key={index}
                                variants={item}
                                className="bg-white p-6 rounded-xl shadow-lg w-full md:w-1/3 text-center"
                            >
                                <h3 className={`font-semibold text-lg mb-2 ${step.color}`}>
                                    {step.title}
                                </h3>
                                <p className="text-gray-600">{step.desc}</p>
                            </motion.div>

                            {/* ARROW */}
                            {index < flowSteps.length - 1 && (
                                <motion.div
                                    variants={arrow}
                                    className="text-blue-600 text-4xl rotate-90 md:rotate-0"
                                >
                                    ➜
                                </motion.div>
                            )}
                        </>
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default AnimatedFlow;