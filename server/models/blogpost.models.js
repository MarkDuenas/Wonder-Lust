const mongoose = require("mongoose");

const BlogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    body: {
      type: String,
    },
  },
  { timestamps: true }
);

const BlogPost = mongoose.model("BlogPosts", BlogPostSchema);

module.exports.BlogPost = BlogPost;
module.exports.BlogPostSchema = BlogPostSchema;
