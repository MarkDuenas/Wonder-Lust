const jwt = require("jsonwebtoken");
module.exports.checkIfUserValid = function (req, res, next) {
  try {
    jwt.verify(req.cookies.userToken, process.env.SECRET_KEY);
    next();
  } catch (e) {
    res.status(401).json();
  }
};

module.exports.authenticate = (req, res, next) => {
  jwt.verify(req.cookies.userToken, process.env.SECRET_KEY, (err, payload) => {
    if (err) {
      res.status(401).json({ verified: false });
    } else {
      res.json({
        message: "Success!",
        results: payload,
      });
      next();
    }
  });
};
