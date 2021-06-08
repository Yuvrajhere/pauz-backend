const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");


const addComment = (req, res) => {
  if (!req.body.commentText || !req.body.postId) {
    return res.status(422).json({
      success: false,
      message: `Insufficient data provided!`,
    });
  }
  const data = {
    commentText: req.body.commentText,
    commentedBy: req.body.userId,
    postId: req.body.postId
  };
  const comment = new Comment(data);

  comment
    .save()
    .then((newComment) => {
      Post.findByIdAndUpdate(req.body.postId, {
        $push: { comments: newComment._id },
      }, {new: true})
        .then((newPost) => {
          res.status(200).json({
            success: true,
            message: "Comment saved successfully!",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            success: false,
            message: "Failed to save Comment!",
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Failed to save Comment!",
      });
    });
};

const getCommentsByPostId = (req, res) => {
  Comment.find({postId: req.params.postId})
  .populate({
    path: "commentedBy"
  })
  .then((comments) => {
    console.log(comments);
    if(!comments) {
      res.status(500).json({
        success: false,
        message: "No comments found!",
      });
    }
    res.status(200).json({
      success: true,
      data: comments,
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to get Comments!",
    });
  });
}

const getRecentCommentsByPostId = (req, res) => {
  Comment.find({postId: req.params.postId})
  .limit(2)
  .populate({
    path: "commentedBy"
  })
  .then((comments) => {
    console.log(comments);
    if(!comments) {
      res.status(500).json({
        success: false,
        message: "No comments found!",
      });
    }
    res.status(200).json({
      success: true,
      data: comments,
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to get Comments!",
    });
  });
}

module.exports = {
  addComment,
  getCommentsByPostId,
  getRecentCommentsByPostId,
};
