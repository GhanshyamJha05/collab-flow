import React, { useEffect, useState } from "react";
import { Plus, Calendar, Clock } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import CreatePollModal from "../../components/Polls/CreatePollModal.jsx";
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";

// ✅ Utility: Format date properly in Indian readable format
const formatExpiry = (dateValue) => {
    if (!dateValue) return "No expiry set";

    const dateObj = new Date(dateValue);

    // Check if date is valid
    if (isNaN(dateObj.getTime())) return "Invalid date";

    const date = dateObj.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    const time = dateObj.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    }).toUpperCase();

    return `${date} at ${time}`;
};

// ✅ Utility: Check if poll is expired
const isExpired = (dateValue) => {
    if (!dateValue) return false;
    return new Date(dateValue) < new Date();
};

const CreatePolls = () => {
    const [polls, setPolls] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);

    // ✅ Fetch polls
    const fetchPolls = async () => {
        try {
            setLoading(true);

            const res = await axiosInstance.get(API_PATHS.POLLS.GET_ALL_POLLS);

            const data = res?.data?.polls;

            if (Array.isArray(data)) {
                // Normalize all polls on fetch
                const normalized = data.map((poll) => ({
                    ...poll,
                    options: Array.isArray(poll?.options)
                        ? poll.options.map((opt) =>
                            typeof opt === "string" ? { text: opt } : opt
                        )
                        : [],
                }));
                setPolls(normalized);
            } else {
                console.warn("Unexpected API response:", res.data);
                setPolls([]);
            }
        } catch (err) {
            console.error("Fetch Polls Error:", err);
            setPolls([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPolls();
    }, []);

    return (
        <DashboardLayout activeMenu="Create Polls">
            <div className="relative min-h-screen p-6 bg-gray-50">

                <h1 className="text-2xl font-bold mb-6 text-gray-800">
                    Manage Polls
                </h1>

                {/* Poll List */}
                {loading ? (
                    <p className="text-gray-500">Loading polls...</p>
                ) : !Array.isArray(polls) || polls.length === 0 ? (
                    <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
                        <p className="text-lg">No polls created yet</p>
                        <p className="text-sm mt-1">
                            Click "Create Poll" to get started
                        </p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                        {polls.map((poll) => {
                            // ✅ Backend model field name is "expiry"
                            const expiryDate = poll?.expiry || null;
                            const expired = isExpired(expiryDate);

                            return (
                                <div
                                    key={poll._id}
                                    className="bg-white p-5 rounded-xl shadow border cursor-pointer border-gray-100 hover:shadow-md transition"
                                >
                                    {/* Question */}
                                    <h2 className="font-semibold text-lg text-gray-800 mb-3">
                                        {poll?.question || "No Question"}
                                    </h2>

                                    {/* Options */}
                                    <ul className="text-sm text-gray-600 space-y-1 mb-4">
                                        {poll.options.length > 0 ? (
                                            poll.options.map((opt, i) => (
                                                <li
                                                    key={i}
                                                    className="flex items-center gap-2"
                                                >
                                                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-medium">
                                                        {i + 1}
                                                    </span>
                                                    {opt?.text || "No option"}
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-gray-400">
                                                No options available
                                            </li>
                                        )}
                                    </ul>

                                    {/* ✅ Expiry — Properly Formatted */}
                                    <div
                                        className={`flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg w-fit
                                            ${expired
                                                ? "bg-red-50 text-red-500"
                                                : "bg-green-50 text-green-600"
                                            }`}
                                    >
                                        {expired ? (
                                            <Clock size={13} />
                                        ) : (
                                            <Calendar size={13} />
                                        )}
                                        <span>
                                            {expired ? "Expired: " : "Expires: "}
                                            {formatExpiry(expiryDate)}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Floating Button */}
                <button
                    onClick={() => setOpenModal(true)}
                    className="fixed bottom-6 right-6 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all duration-200 ease-in-out cursor-pointer hover:bg-blue-700 hover:scale-105 active:scale-95 active:shadow-md"
                >
                    <Plus size={18} />
                    Create Poll
                </button>

                {/* Modal */}
                {openModal && (
                    <CreatePollModal
                        onClose={() => setOpenModal(false)}
                        onSuccess={(newPoll) => {
                            if (!newPoll) return;

                            const normalizedPoll = {
                                ...newPoll,
                                options: Array.isArray(newPoll.options)
                                    ? newPoll.options.map((opt) =>
                                        typeof opt === "string"
                                            ? { text: opt }
                                            : opt
                                    )
                                    : [],
                            };

                            setPolls((prev) => [normalizedPoll, ...prev]);
                        }}
                    />
                )}
            </div>
        </DashboardLayout>
    );
};

export default CreatePolls;