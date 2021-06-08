const User = require("../models/User");
const { genSaltSync, hashSync } = require("bcrypt");

const addUser = (req, res) => {
  const { email, username, name, password } = req.body;
  if (!email || !username || !name || !password) {
    return res.status(422).json({
      success: false,
      message: `Insufficient data provided!`,
    });
  }

  if (password.length < 6 || password.length > 10) {
    return res.status(422).json({
      success: false,
      message: `Password length should be between 6 and 10!`,
    });
  }

  const salt = genSaltSync(10);
  req.body.password = hashSync(req.body.password, salt);

  req.body.username = req.body.username.toLowerCase();

  const user = new User(req.body);
  user
    .save()
    .then((response) => {
      res.status(200).json({
        success: true,
        data: response,
        message: "Signed Up Successfully!",
      });
    })
    .catch((err) => {
      if (err.name == "MongoError" && err.code == 11000) {
        res.status(409).json({
          success: false,
          message: `This ${Object.keys(err.keyPattern)[0]} is already used!`,
        });
      } else if (err.name == "ValidationError") {
        res.status(422).json({
          success: false,
          message: Object.values(err.errors)[0].message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to Sign Up, Please try again after some time!",
        });
      }
    });
};

const getUserById = (req, res) => {
  User.findOne({ _id: req.body.userId })
    .populate({
      path: "connections",
    })
    .populate({
      path: "posts",
    })
    .then((user) => {
      user.password = undefined;
      res.status(200).json({
        success: true,
        data: user,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Failed to get User!",
      });
    });
};

const getUserByUsername = (req, res) => {
  User.findOne({ username: req.params.username })
    .populate({
      path: "posts",
    })
    .then((user) => {
      user.password = undefined;
      user.connections = undefined;
      res.status(200).json({
        success: true,
        data: user,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Failed to get User!",
      });
    });
};

const getUserConnectionsById = (req, res) => {
  User.findById(req.body.userId)
    .populate({
      path: "connections",
    })
    .then((user) => {
      res.status(200).json({
        success: true,
        data: user.connections,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Failed to get User Connections!",
      });
    });
}

const removeConnection = (req, res) => {
  console.log("Yoooooooooooo")
  User.findByIdAndUpdate(req.body.userId, {
    $pull: {connections: req.params.otherUserId}
  }, {new: true})
    .then((user) => {
      console.log(user)
      res.status(200).json({
        success: true,
        message: "Connection removed successfully!"
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Failed to remove Connections!",
      });
    });
}

module.exports = {
  addUser,
  getUserById,
  getUserByUsername,
  getUserConnectionsById,
  removeConnection
};