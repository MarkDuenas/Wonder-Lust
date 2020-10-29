const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

require("./server/config/mongoose.config");

app.use(
  cookieParser(),
  express.json(),
  express.urlencoded({ extended: true }),
  cors({ credentials: true, origin: "http://localhost:3000" }),
  express.static("uploads")
);

const UserRoutes = require("./server/routes/user.routes");
const BlogPostRoutes = require("./server/routes/blogpost.routes");
BlogPostRoutes(app);
UserRoutes(app);

app.listen(8000, () => {
  console.log("You're server is now locked and loaded on port 8000");
});
