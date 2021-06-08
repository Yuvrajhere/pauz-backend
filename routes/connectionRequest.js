const express = require("express");
const router = express.Router();

const { checkToken } = require("../controllers/auth");
const { addConnectionRequest, sendUserDetails, addConnection } = require("../controllers/connectionRequest");

// creating a connection code
router.get("/", checkToken, addConnectionRequest);

// send user details using code
router.get("/code/:code", checkToken, sendUserDetails);

// making the connection
router.post("/addConnection", checkToken, addConnection)

module.exports = router;