import React, { useEffect, useState } from "react";
import {
    BarChart3,
    CalendarClock,
    CheckCircle2,
    Clock,
    Loader2,
    RefreshCw,
    Vote,
    TrendingUp,
    AlertCircle,
} from "lucide-react";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";

// ─── Helpers ────────────────────────────────────────────────────────────────

const formatExpiry = (dateValue) => {
    if (!dateValue) return "No expiry set";
    const d = new Date(dateValue);
    if (isNaN(d.getTime())) return "Invalid date";
    return d.toLocaleString("en-IN", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};

const isExpired = (dateValue) => {
    if (!dateValue) return false;
    return new Date(dateValue) < new Date();
};

const getTotalVotes = (options) =>
    options.reduce((sum, opt) => sum + (opt?.votes?.length || 0), 0);

const getVotePercent = (optVotes, total) =>
    total === 0 ? 0 : Math.round((optVotes / total) * 100);

const optionColors = [
    { bg: "bg-blue-500", light: "bg-blue-50", text: "text-blue-600", border: "border-blue-300", bar: "bg-blue-500" },
    { bg: "bg-violet-500", light: "bg-violet-50", text: "text-violet-600", border: "border-violet-300", bar: "bg-violet-500" },
    { bg: "bg-emerald-500", light: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-300", bar: "bg-emerald-500" },
    { bg: "bg-amber-500", light: "bg-amber-50", text: "text-amber-600", border: "border-amber-300", bar: "bg-amber-500" },
    { bg: "bg-rose-500", light: "bg-rose-50", text: "text-rose-600", border: "border-rose-300", bar: "bg-rose-500" },
    { bg: "bg-cyan-500", light: "bg-cyan-50", text: "text-cyan-600", border: "border-cyan-300", bar: "bg-cyan-500" },
    { bg: "bg-orange-500", light: "bg-orange-50", text: "text-orange-600", border: "border-orange-300", bar: "bg-orange-500" },
    { bg: "bg-pink-500", light: "bg-pink-50", text: "text-pink-600", border: "border-pink-300", bar: "bg-pink-500" },
    { bg: "bg-teal-500", light: "bg-teal-50", text: "text-teal-600", border: "border-teal-300", bar: "bg-teal-500" },
    { bg: "bg-indigo-500", light: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-300", bar: "bg-indigo-500" },
];
const optionLabels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const getColor = (i) => optionColors[i % optionColors.length];

// ─── Poll Card ───────────────────────────────────────────────────────────────

const PollCard = ({ poll, currentUserId, onVote }) => {
    const [voting, setVoting] = useState(false);
    const [localPoll, setLocalPoll] = useState(poll);
    const [showResults, setShowResults] = useState(false);
    const [justVoted, setJustVoted] = useState(null); // index of option just voted

    const expiryDate = localPoll?.expiry || null;
    const expired = localPoll?.status === "expired";
    const options = localPoll?.options || [];
    const totalVotes = getTotalVotes(options);

    // Check if current user has already voted
    const userVotedIndex = options.findIndex((opt) =>
        Array.isArray(opt?.votes) &&
        opt.votes.some(
            (v) => v?.userId === currentUserId || v === currentUserId
        )
    );
    const hasVoted = userVotedIndex !== -1;

    // Show results automatically if voted or expired
    const showResultsView = showResults || hasVoted || expired;

    const handleVote = async (optionIndex) => {
        if (voting || expired) return;

        // 🔒 Check: user already voted anywhere in poll
        const alreadyVoted = localPoll.options.some((opt) =>
            (opt.votes || []).some(
                (v) => v?.userId === currentUserId || v === currentUserId
            )
        );

        if (alreadyVoted) return;

        let previousPoll = localPoll; // rollback ke liye

        try {
            setVoting(true);
            setJustVoted(optionIndex);

            // ✅ OPTIMISTIC UPDATE
            const updatedLocal = {
                ...localPoll,
                options: localPoll.options.map((opt, i) => {
                    if (i === optionIndex) {
                        return {
                            ...opt,
                            votes: [
                                ...(opt.votes || []),
                                { userId: currentUserId }
                            ]
                        };
                    }
                    return opt;
                }),
            };

            setLocalPoll(updatedLocal);
            setShowResults(true);
            onVote && onVote(updatedLocal);

            // ✅ API CALL
            const res = await axiosInstance.post(
                API_PATHS.POLLS.VOTE_POLL,
                {
                    pollId: localPoll._id,
                    optionIndex
                }
            );

            // ✅ SERVER SYNC (important for refresh issue)
            if (res?.data) {
                const serverPoll = res.data.poll || res.data;

                const normalized = {
                    ...serverPoll,
                    options: Array.isArray(serverPoll?.options)
                        ? serverPoll.options.map((opt) =>
                            typeof opt === "string"
                                ? { text: opt, votes: [] }
                                : opt
                        )
                        : [],
                };

                setLocalPoll(normalized);
                onVote && onVote(normalized);
            }

        } catch (err) {
            console.error("Vote Error:", err);

            // ❌ ROLLBACK if API fails
            setLocalPoll(previousPoll);
        } finally {
            setVoting(false);
        }
    };

    // Leading option
    const leadingIndex = options.reduce(
        (maxIdx, opt, i, arr) =>
            (opt?.votes?.length || 0) > (arr[maxIdx]?.votes?.length || 0)
                ? i
                : maxIdx,
        0
    );

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden poll-card">

            {/* ── Card Header ── */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-violet-600 px-5 pt-4 pb-3">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 shrink-0">
                        <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                            <BarChart3 size={14} className="text-white" />
                        </div>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${expired ? "bg-red-400/30 text-red-100" : "bg-white/20 text-white"}`}>
                            {expired ? "Closed" : "Active"}
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-blue-100 shrink-0">
                        <Vote size={12} />
                        <span>{totalVotes} vote{totalVotes !== 1 ? "s" : ""}</span>
                    </div>
                </div>

                {/* Question */}
                <h2 className="text-white font-bold text-base mt-2 leading-snug">
                    {localPoll?.question || "No question"}
                </h2>
            </div>

            {/* ── Body ── */}
            <div className="px-5 py-4">

                {/* ── Voting View ── */}
                {!showResultsView ? (
                    <div className="space-y-2.5">
                        <p className="text-xs text-gray-400 font-medium mb-3">
                            Choose one option to vote
                        </p>
                        {options.map((opt, i) => {
                            const color = getColor(i);
                            return (
                                <button
                                    key={i}
                                    type="button"
                                    disabled={voting}
                                    onClick={() => handleVote(i)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer group
                                        ${voting && justVoted === i
                                            ? `${color.light} ${color.border}`
                                            : `border-gray-200 hover:${color.border} hover:${color.light} bg-gray-50 hover:bg-opacity-60`
                                        }
                                        active:scale-98 disabled:cursor-not-allowed`}
                                >
                                    <span className={`w-7 h-7 rounded-lg ${color.bg} flex items-center justify-center text-white text-xs font-bold shrink-0 transition-transform duration-200 group-hover:scale-110`}>
                                        {optionLabels[i]}
                                    </span>
                                    <span className="text-sm text-gray-700 font-medium flex-1">
                                        {opt?.text || "—"}
                                    </span>
                                    {voting && justVoted === i && (
                                        <Loader2 size={15} className="animate-spin text-gray-400 shrink-0" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                ) : (
                    /* ── Results View ── */
                    <div className="space-y-2.5">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
                                <TrendingUp size={12} />
                                Results — {totalVotes} total vote{totalVotes !== 1 ? "s" : ""}
                            </p>
                            {hasVoted && (
                                <span className="flex items-center gap-1 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                                    <CheckCircle2 size={11} />
                                    Voted
                                </span>
                            )}
                        </div>

                        {options.map((opt, i) => {
                            const votes = opt?.votes?.length || 0;
                            const pct = getVotePercent(votes, totalVotes);
                            const color = getColor(i);
                            const isLeading = i === leadingIndex && totalVotes > 0;
                            const isMyVote = i === userVotedIndex;

                            return (
                                <div key={i} className={`rounded-xl overflow-hidden border transition-all duration-200 ${isMyVote ? `${color.border} border-2` : "border-gray-100"}`}>
                                    <div className={`flex items-center gap-3 px-3 py-2.5 ${isMyVote ? color.light : "bg-gray-50"}`}>
                                        {/* Label badge */}
                                        <span className={`w-7 h-7 rounded-lg ${color.bg} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                                            {optionLabels[i]}
                                        </span>

                                        {/* Text + leading crown */}
                                        <span className="text-sm text-gray-700 font-medium flex-1 truncate">
                                            {opt?.text || "—"}
                                        </span>

                                        {isLeading && totalVotes > 0 && (
                                            <span className="text-xs shrink-0">🏆</span>
                                        )}
                                        {isMyVote && (
                                            <CheckCircle2 size={14} className={`${color.text} shrink-0`} />
                                        )}

                                        {/* Percent */}
                                        <span className={`text-xs font-bold shrink-0 ${isMyVote ? color.text : "text-gray-500"}`}>
                                            {pct}%
                                        </span>
                                    </div>

                                    {/* Progress bar */}
                                    <div className="h-1.5 bg-gray-100">
                                        <div
                                            className={`h-full ${color.bar} transition-all duration-700 ease-out`}
                                            style={{ width: `${pct}%` }}
                                        />
                                    </div>

                                    {/* Vote count */}
                                    <div className={`px-3 py-1 text-xs ${isMyVote ? color.text : "text-gray-400"} font-medium flex justify-end ${isMyVote ? color.light : "bg-gray-50"}`}>
                                        {votes} vote{votes !== 1 ? "s" : ""}
                                    </div>
                                </div>
                            );
                        })}

                        {/* Toggle back to vote view (only if not voted and not expired) */}
                        {!hasVoted && !expired && (
                            <button
                                onClick={() => setShowResults(false)}
                                className="text-xs text-blue-500 hover:text-blue-700 font-medium mt-1 flex items-center gap-1 cursor-pointer transition"
                            >
                                ← Back to voting
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* ── Footer ── */}
            <div className={`px-5 py-3 border-t flex items-center justify-between gap-2 ${expired ? "bg-red-50 border-red-100" : "bg-gray-50 border-gray-100"}`}>
                <div className={`flex items-center gap-1.5 text-xs font-medium ${expired ? "text-red-500" : "text-emerald-600"}`}>
                    {expired ? <Clock size={12} /> : <CalendarClock size={12} />}
                    <span>
                        {expired ? "Closed " : "Closes "}
                        {formatExpiry(expiryDate)}
                    </span>
                </div>

                {/* Toggle results button */}
                {!showResultsView && totalVotes > 0 && (
                    <button
                        onClick={() => setShowResults(true)}
                        className="text-xs text-blue-500 hover:text-blue-700 font-medium flex items-center gap-1 cursor-pointer transition"
                    >
                        <TrendingUp size={11} />
                        View results
                    </button>
                )}
            </div>
        </div>
    );
};

// ─── Skeleton Loader ─────────────────────────────────────────────────────────

const PollSkeleton = () => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
        <div className="h-24 bg-gradient-to-r from-blue-100 to-violet-100" />
        <div className="p-5 space-y-3">
            {[1, 2, 3].map((i) => (
                <div key={i} className="h-11 bg-gray-100 rounded-xl" />
            ))}
        </div>
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 h-10" />
    </div>
);

// ─── Main Page ───────────────────────────────────────────────────────────────

const MyPolls = () => {
    const [polls, setPolls] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState("all"); // "all" | "active" | "closed"
    const [refreshing, setRefreshing] = useState(false);

    // Get current user id from localStorage / session (adjust as per your auth)
    const currentUserId =
        JSON.parse(localStorage.getItem("user") || "{}")?.id ||
        JSON.parse(localStorage.getItem("user") || "{}")?._id ||
        null;

    const fetchPolls = async (isRefresh = false) => {
        try {
            isRefresh ? setRefreshing(true) : setLoading(true);

            const res = await axiosInstance.get(API_PATHS.POLLS.GET_ALL_POLLS);
            const data = res?.data?.polls;

            if (Array.isArray(data)) {
                const normalized = data.map((poll) => ({
                    ...poll,
                    options: Array.isArray(poll?.options)
                        ? poll.options.map((opt) =>
                            typeof opt === "string"
                                ? { text: opt, votes: [] }
                                : opt
                        )
                        : [],
                }));
                setPolls(normalized);
            } else {
                setPolls([]);
            }
        } catch (err) {
            console.error("Fetch Polls Error:", err);
            setPolls([]);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchPolls();
    }, []);

    const filteredPolls = polls.filter((poll) => {
        const expired = isExpired(poll?.expiry);
        if (filter === "active") return !expired;
        if (filter === "closed") return expired;
        return true;
    });

    const activeCount = polls.filter((p) => !isExpired(p?.expiry)).length;
    const closedCount = polls.filter((p) => isExpired(p?.expiry)).length;

    return (
        <DashboardLayout activeMenu="My Polls">
            <div className="min-h-screen bg-gray-50">

                {/* ── Page Header ── */}
                <div className="bg-white border-b border-gray-100 px-4 sm:px-6 py-5">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-center justify-between gap-4 flex-wrap">

                            {/* Title */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shadow-md shadow-blue-200">
                                    <Vote size={20} className="text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">
                                        My Polls
                                    </h1>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        {polls.length} poll{polls.length !== 1 ? "s" : ""} available
                                    </p>
                                </div>
                            </div>

                            {/* Refresh button */}
                            <button
                                onClick={() => fetchPolls(true)}
                                disabled={refreshing}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all duration-200 cursor-pointer active:scale-95 disabled:opacity-60"
                            >
                                <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
                                {refreshing ? "Refreshing..." : "Refresh"}
                            </button>
                        </div>

                        {/* ── Stats row ── */}
                        <div className="flex items-center gap-3 mt-4 flex-wrap">
                            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                {activeCount} Active
                            </div>
                            <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-500 text-xs font-semibold px-3 py-1.5 rounded-full">
                                <Clock size={11} />
                                {closedCount} Closed
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Filter Tabs ── */}
                <div className="px-4 sm:px-6 py-4 max-w-5xl mx-auto">
                    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-1 w-fit">
                        {[
                            { key: "all", label: "All Polls", count: polls.length },
                            { key: "active", label: "Active", count: activeCount },
                            { key: "closed", label: "Closed", count: closedCount },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setFilter(tab.key)}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
                                    ${filter === tab.key
                                        ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-sm"
                                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                    }`}
                            >
                                {tab.label}
                                <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold
                                    ${filter === tab.key
                                        ? "bg-white/25 text-white"
                                        : "bg-gray-100 text-gray-500"
                                    }`}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Poll Grid ── */}
                <div className="px-4 sm:px-6 pb-10 max-w-5xl mx-auto">

                    {loading ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                            {[1, 2, 3, 4].map((i) => <PollSkeleton key={i} />)}
                        </div>
                    ) : filteredPolls.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                                <AlertCircle size={28} className="text-gray-300" />
                            </div>
                            <p className="text-gray-500 font-semibold">
                                No {filter !== "all" ? filter : ""} polls found
                            </p>
                            <p className="text-gray-400 text-sm mt-1">
                                {filter !== "all"
                                    ? "Try switching to a different filter"
                                    : "No polls have been created yet"
                                }
                            </p>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                            {filteredPolls.map((poll, idx) => (
                                <div
                                    key={poll._id}
                                    className="poll-card-wrapper"
                                    style={{ animationDelay: `${idx * 60}ms` }}
                                >
                                    <PollCard
                                        poll={poll}
                                        currentUserId={currentUserId}
                                        onVote={(updated) => {
                                            setPolls((prev) =>
                                                prev.map((p) =>
                                                    p._id === updated._id ? updated : p
                                                )
                                            );
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .poll-card-wrapper {
                    animation: fadeSlideUp 0.35s ease both;
                }
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .active\\:scale-98:active { transform: scale(0.98); }
            `}</style>
        </DashboardLayout>
    );
};

export default MyPolls;