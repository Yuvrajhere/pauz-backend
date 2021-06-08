const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      minLength: [5, "Email length should be between 5 and 30."],
      maxLength: [30, "Email length should be between 5 and 30."],
      required: [true, "Please provide Email."],
      unique: [true, "This Email is already used."],
    },
    username: {
      type: String,
      minLength: [1, "Username length should be between 1 and 12."],
      maxLength: [20, "Username length should be between 1 and 12."],
      required: [true, "Please provide Username."],
      unique: [true, "This Username is already used."],
    },
    name: {
      type: String,
      minLength: [1, "Name length should be between 1 and 30."],
      maxLength: [30, "Name length should be between 1 and 30."],
      required: [true, "Please provide Name."],
    },

    img: {
      type: String,
      default: "https://res.cloudinary.com/yuvrajhere/image/upload/v1620990598/pauz/user_placeholder.png"
    },
    password: {
      type: String,
      minLength: [20, "Password cannot be less than 20 characters."],
      required: [true, "Please provide Password."],
    },
    connections: [
      {
        type: mongoose.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: mongoose.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
