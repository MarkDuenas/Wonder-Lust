const BlogPostController = require("../controllers/blogpost.controllers");
const { checkIfUserValid } = require("../config/jwt.config");

module.exports = (app) => {
  app.post("/api/blog/post", BlogPostController.createPost);
  app.get("/api/blog/:id", BlogPostController.getOneBlog);
  app.get("/api/blogs", BlogPostController.getAllBlogs);
  app.delete(
    "/api/blog/delete/:id",
    checkIfUserValid,
    BlogPostController.deleteBlog
  );
  app.get(
    "api/blogs/featured/:id",
    checkIfUserValid,
    BlogPostController.getAllFeaturedBlogs
  );
};
