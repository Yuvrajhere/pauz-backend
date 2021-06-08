const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      minLength: [1, "Caption length should be between 5 and 30."],
      maxLength: [150, "Caption length should be between 5 and 30."],
      required: [true, "Please provide Caption."],
    },
    imgUrl: {
      type: String,
      default: ""
    },
    comments: [
      {
        type: mongoose.ObjectId,
        ref: "Comment",
      },
    ],
    postedBy: {
      type: mongoose.ObjectId,
      ref: "User",
      required: [true, "Please provide User ID."]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
