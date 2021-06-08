const ConnectionRequest = require("../models/ConnectionRequest");
const User = require("../models/User");

// function to generate random strings for code
const getRandomString = (length) => {
  var randomChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var result = "";
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
};

const addConnectionRequest = (req, res) => {
  const data = {
    code: getRandomString(6),
    createdBy: req.body.userId,
  };
  const connectionRequest = new ConnectionRequest(data);

  connectionRequest
    .save()
    .then((newConnectionRequest) => {
      res.status(200).json({
        success: true,
        data: newConnectionRequest,
        message: "Connection Request created successfully!",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Failed to create Connection Request!",
      });
    });
};

const sendUserDetails = (req, res) => {
  console.log(req.params.code);
  ConnectionRequest.findOne({ code: req.params.code })
    .populate("createdBy")
    .then((connectionRequest) => {
      connectionRequest.createdBy.password = undefined;
      res.status(200).json({
        success: true,
        data: connectionRequest.createdBy,
        message: "User found for this code!",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Failed to find a User with this Request!",
      });
    });
};

const addConnection = (req, res) => {
  if (!req.body.user1Id || !req.body.code) {
    return res.status(422).json({
      success: false,
      message: `Insufficient data provided!`,
    });
  }

  User.findByIdAndUpdate(req.body.user1Id, {
    $push: { connections: req.body.userId },
  })
    .then((newUser) => {
      User.findByIdAndUpdate(req.body.userId, {
        $push: { connections: req.body.user1Id },
      })
        .then((newUser) => {
          newUser.password = undefined;
          ConnectionRequest.findOneAndDelete({ code: req.body.code })
            .then(() => {
              res.status(200).json({
                success: true,
                data: newUser,
                message: "Connection Added Successfully!",
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                success: false,
                message: "Failed to add Connection!",
              });
            });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            success: false,
            message: "Failed to add Connection!",
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Failed to add Connection!",
      });
    });
};

module.exports = {
  addConnectionRequest,
  sendUserDetails,
  addConnection,
};
