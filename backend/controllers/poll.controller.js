const Poll = require("../models/poll.model.js");

//* Create Poll (Admin only)
const createPoll = async (req, res) => {
    try {
        const { question, options, expiry } = req.body;

        if (!question || !options || options.length < 2) {
            return res.status(400).json({ msg: "Invalid poll data" });
        }

        const poll = new Poll({
            question,
            options: options.map(opt => ({
                text: opt,
                votes: []
            })),
            expiry,
            status: "active"
        });

        await poll.save();

        res.status(201).json({
            success: true,
            poll
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//* Get Polls (Logged-in users)
const getPolls = async (req, res) => {
    try {
        const now = new Date();

        const polls = await Poll.find();

        // auto-expire update
        for (let poll of polls) {
            if (poll.expiry < now && poll.status === "active") {
                poll.status = "expired";
                await poll.save();
            }
        }

        res.json({
            success: true,
            polls
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//* Vote Poll (Logged-in users)
const votePoll = async (req, res) => {
    try {
        const { pollId, optionIndex } = req.body;

        const userId = req.user.id;
        const userName = req.user.name;

        const poll = await Poll.findById(pollId);

        if (!poll) {
            return res.status(404).json({ msg: "Poll not found" });
        }

        if (poll.status === "expired") {
            return res.status(400).json({ msg: "Poll expired" });
        }

        if (
            optionIndex < 0 ||
            optionIndex >= poll.options.length
        ) {
            return res.status(400).json({ msg: "Invalid option" });
        }

        // duplicate vote check
        const alreadyVoted = poll.options.some(opt =>
            opt.votes.some(v => v.userId === userId)
        );

        if (alreadyVoted) {
            return res.status(400).json({ msg: "Already voted" });
        }

        poll.options[optionIndex].votes.push({
            userId,
            userName
        });

        await poll.save();

        res.json({
            success: true,
            poll
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createPoll,
    getPolls,
    votePoll
};