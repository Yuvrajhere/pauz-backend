const express = require("express");
const router = express.Router();

const { checkToken } = require("../controllers/auth");
const { addComment, getCommentsByPostId, getRecentCommentsByPostId } = require("../controllers/comment");

// creating a comment
router.post("/", checkToken, addComment);

// sending 2 recent comments array by postId
router.get("/post/recent/:postId", checkToken, getRecentCommentsByPostId);

// sending posts array by postId
router.get("/post/:postId", checkToken, getCommentsByPostId);


module.exports = router;