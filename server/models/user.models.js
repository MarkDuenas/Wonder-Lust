const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const { BlogPostSchema } = require("./blogpost.models");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
    },

    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },

    email: {
      type: String,
      required: [true, "Please provide a valid email"],
      unique: [true, "Email already registered. Please try Logging in"],
    },

    password: {
      type: String,
      minlength: [8, "Password must be at least 8 characters long"],
      required: [true, "Pleas provide a valid password"],
    },

    featuredPost: {
      type: [BlogPostSchema],
      unique: [true],
    },
  },
  { timestamps: true }
);

UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

UserSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Passwords must match");
  }
  next();
});

UserSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    next();
  });
});

UserSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("email must be unique"));
  } else {
    next(error);
  }
});

UserSchema.plugin(uniqueValidator, {
  message: `Email is already registered. Please use another email, or try loggin in`,
});

BlogPostSchema.plugin(uniqueValidator, {
  message: "Blog post already in featured.",
});

const User = mongoose.model("Users", UserSchema);

module.exports = User;
