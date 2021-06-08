const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      minLength: [6, "Code length should be 6."],
      maxLength: [6, "Code length should be 6."],
      required: [true, "Please provide Code."],
      unique: [true, "This Code is already used."],
    },
    createdBy: {
      type: mongoose.ObjectId,
      ref: "User",
      required: [true, "Please provide User ID."]
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
