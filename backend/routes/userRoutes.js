const express = require("express");
const router = express.Router();
const { getUsers, getUser, getProfile, updateUser, deleteUser } = require("../controllers/userController");
const { verifyAccessToken } = require("../middlewares.js");

// Routes beginning with /api/users
router.get("/", verifyAccessToken, getUsers);
router.get("/profile", verifyAccessToken, getProfile);
router.get("/:userId", verifyAccessToken, getUser);
router.put("/:userId", verifyAccessToken, updateUser);
router.delete("/:userId", verifyAccessToken, deleteUser);

module.exports = router;