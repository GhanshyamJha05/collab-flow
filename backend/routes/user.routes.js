const express = require("express");
const { protect, adminOnly } = require("../middlewares/auth.middleware.js");
const { getUsers, getUserById } = require("../controllers/user.controller.js");

const router = express.Router();

//* User management routes
router.get("/", protect, adminOnly, getUsers);  //* get all users (admin only)
router.get("/:id", protect, getUserById);  //* get a specific user
// router.delete("/:id", protect, adminOnly, deleteUser);  //* delete a user (admin only)

module.exports = router;