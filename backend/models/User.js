const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user" // By default, every new user is a regular user
  },
  joiningTime: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);
module.exports = User;
