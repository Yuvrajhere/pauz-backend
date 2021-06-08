const express = require("express");
const router = express.Router();

const { checkToken } = require("../controllers/auth");
const { addPost, getUserFeed, getUsersPosts, getPostsByUserId } = require("../controllers/post");

// creating a post
router.post("/", checkToken, addPost);

// sending posts array for userFeed
router.get("/user/feed", checkToken, getUserFeed);

// sending posts array by a loggedin user
router.get("/user/self", checkToken, getUsersPosts);

// sending posts array by userId
router.get("/user/:userId", checkToken, getPostsByUserId);




module.exports = router;