const express = require("express");
const router = express.Router();

const { signin, checkToken } = require("../controllers/auth");
const { addUser, getUserById, getUserByUsername, getUserConnectionsById, removeConnection } = require("../controllers/user");

// creating a user
router.post("/", addUser);

// login of user
router.post("/login", signin);

// get logged in user's data
router.get("/user/self", checkToken, getUserById);

// get a user's data
router.get("/user/username/:username", checkToken, getUserByUsername);

// get logged in user's connections list
router.get("/user/getConnections", checkToken, getUserConnectionsById);

// remove connection from logged in user's account
router.delete("/connection/:otherUserId", checkToken, removeConnection)

module.exports = router;