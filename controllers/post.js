const Post = require("../models/Post");
const User = require("../models/User");

const addPost = (req, res) => {
  if (!req.body.caption) {
    return res.status(422).json({
      success: false,
      message: `Insufficient data provided!`,
    });
  }
  const data = {
    caption: req.body.caption,
    imgUrl: req.body.imgUrl || "",
    postedBy: req.body.userId,
  };
  const post = new Post(data);

  post
    .save()
    .then((newPost) => {
      User.findByIdAndUpdate(req.body.userId, {
        $push: { posts: newPost._id },
      })
        .then((newUser) => {
          res.status(200).json({
            success: true,
            data: newPost,
            message: "Post saved successfully!",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            success: false,
            message: "Failed to save Post!",
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Failed to save Post!",
      });
    });
};

const getUserFeed = (req, res) => {
  User.findById(req.body.userId)
    .populate({
      path: "connections",
      populate: {
        path: "posts",
        populate: "postedBy",
      }
    })
    .then((userData) => {
      console.log(userData);
      res.status(200).json({
        success: true,
        data: userData,
        message: "Post saved successfully!",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Failed to save Post!",
      });
    });
};

const getUsersPosts = (req, res) => {
  Post.find({postedBy: req.body.userId})
    .populate({
      path: "postedBy"
    })
    .then((postsData) => {
      console.log(postsData);
      res.status(200).json({
        success: true,
        data: postsData,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Failed to get Posts!",
      });
    });
};

const getPostsByUserId = (req, res) => {
  Post.find({postedBy: req.params.userId})
    .populate({
      path: "postedBy"
    })
    .then((postsData) => {
      console.log(postsData);
      if(!postsData) {
        res.status(500).json({
          success: false,
          message: "Failed to get Posts!",
        });
      }
      res.status(200).json({
        success: true,
        data: postsData,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Failed to get Posts!",
      });
    });
}

module.exports = {
  addPost,
  getUserFeed,
  getUsersPosts,
  getPostsByUserId
};
