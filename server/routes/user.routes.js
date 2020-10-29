const UserController = require("../controllers/user.controllers");
const { authenticate, checkIfUserValid } = require("../config/jwt.config");

module.exports = (app) => {
  app.post("/api/user/register", UserController.register);
  app.post("/api/user/login", UserController.loginUser);
  app.get("/api/user", authenticate);
  app.delete("/api/logout", UserController.logout);
  app.put(
    "/api/user/featuredblogs/:id",
    checkIfUserValid,
    UserController.featuredPost
  );
};
