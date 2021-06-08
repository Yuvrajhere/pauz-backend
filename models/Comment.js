const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    commentText: {
      type: String,
      minLength: [1, "commentText length should be between 5 and 100."],
      maxLength: [100, "commentText length should be between 5 and 100."],
      required: [true, "Please provide commentText."],
    },
    commentedBy: {
      type: mongoose.ObjectId,
      ref: "User",
      required: [true, "Please provide User ID."]
    },
    postId: {
      type: mongoose.ObjectId,
      ref: "Post",
      required: [true, "Please provide Post ID."]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
