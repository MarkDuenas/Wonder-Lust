const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BlogPost } = require("../models/blogpost.models");

module.exports = {
  oneUser: (req, res) => {
    User.find({ _id: req.body })
      .then((oneUser) => res.json({ message: "Success!", thisUser: oneUser }))
      .catch((err) => res.status(400).json(err));
  },

  updateUser: (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, {
      runValidators: true,
      new: true,
    })
      .then((updatedUser) =>
        res.json({ message: "User Updated!", results: updatedUser })
      )
      .catch((err) => res.status(400).json(err));
  },

  deleteUser: (req, res) => {
    User.deleteOne({ _id: req.params.id })
      .then((deletedUser) =>
        res.json({ message: "User Deleted", results: deletedUser })
      )
      .catch((err) => res.status(400).json(err));
  },

  register: (req, res) => {
    User.create(req.body)
      .then((user) => {
        const userToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
        res
          .cookie("userToken", userToken, { httpOnly: true })
          .json({ message: "success", results: user });
      })
      .catch((err) => res.status(400).json(err));
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (user === null) {
        return res.status(400).json({ email: "Email Address not registered" });
      }
      const correctPassword = await bcrypt.compare(password, user.password);
      if (!correctPassword) {
        console.log("Password did not match registred user");
        return res.status(400).json({ password: "Incorrect password" });
      }

      const userToken = jwt.sign({ user: user }, process.env.SECRET_KEY);
      res
        .cookie("userToken", userToken, { httpOnly: true })
        .json({ message: "success", results: userToken });
    } catch {
      (err) => res.status(400).json({ message: "failed", results: err });
    }
  },

  logout: (_, res) => {
    res.clearCookie("userToken");
    res.json({ message: "Logout Successfully" });
    res.sendStatus(200);
  },

  featuredPost: (req, res) => {
    BlogPost.find({ _id: req.body._id }).then((thisBlogPost) => {
      User.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { featuredPost: thisBlogPost } },
        { new: true }
      )
        .then((data) =>
          res.json({ message: "Successfully updated featured blogs list" })
        )
        .catch((err) => res.json({ message: "error", results: err }));
    });
  },
};
