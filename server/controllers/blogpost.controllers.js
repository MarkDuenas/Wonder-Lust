const { BlogPost } = require("../models/blogpost.models");
const User = require("../models/user.models");

module.exports = {
  getAllBlogs: (req, res) => {
    BlogPost.find({})
      .then((allBlogs) => res.json({ message: "Sucess!", results: allBlogs }))
      .catch((err) =>
        res.status(400).json({ results: err, message: "This is the error" })
      );
  },
  getOneBlog: (req, res) => {
    BlogPost.find({ _id: req.params.id })
      .then((oneBlog) =>
        res.json({ message: "Sucess!", thisBlogPost: oneBlog })
      )
      .catch((err) => res.status(400).json(err));
  },
  deleteBlog: (req, res) => {
    BlogPost.deleteOne({ _id: req.params.id })
      .then((deletedBlog) =>
        res.json({ message: "Blog Deleted", results: deletedBlog })
      )
      .catch((err) => res.status(400).json(err));
  },
  createPost: (req, res) => {
    BlogPost.create(req.body)
      .then((createdPost) =>
        res.json({ message: "Sucess!", results: createdPost })
      )
      .catch((err) => res.status(400).json(err));
  },
  getAllFeaturedBlogs: (req, res) => {
    User.find({ _id: req.params.id }).then((user) => {
      res
        .json({ mesage: "Sucess!", results: user.featuredPost })
        .catch((err) => res.status(400).json(err));
    });
  },
};
