const User = require("../models/User");
const { validateObjectId } = require("../utils/validation");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users, status: true, msg: "Users found successfully.." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    if (!validateObjectId(req.params.userId)) {
      return res.status(400).json({ status: false, msg: "User id not valid" });
    }

    const user = await User.findById(req.params.userId).select("-password");
    if (!user) {
      return res.status(400).json({ status: false, msg: "No user found.." });
    }
    res.status(200).json({ user, status: true, msg: "User found successfully.." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(400).json({ status: false, msg: "User not found.." });
    }
    res.status(200).json({ user, status: true, msg: "Profile retrieved successfully.." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!validateObjectId(req.params.userId)) {
      return res.status(400).json({ status: false, msg: "User id not valid" });
    }

    let user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(400).json({ status: false, msg: "User with given id not found" });
    }

    // Build update object with only provided fields
    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (password) updateFields.password = password;

    user = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: updateFields },
      { new: true }
    ).select("-password");

    res.status(200).json({ user, status: true, msg: "User updated successfully.." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    if (!validateObjectId(req.params.userId)) {
      return res.status(400).json({ status: false, msg: "User id not valid" });
    }

    let user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(400).json({ status: false, msg: "User with given id not found" });
    }

    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({ status: true, msg: "User deleted successfully.." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};