const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxLength: 50,
      minLength: 5,
    },
    lastName: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password Too weak enter a strong password");
        }
      },
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("the email is invalid" + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("The Gender is not valid");
        }
      },
    },
    about: {
      type: String,
      default: "hi i am using devTinder",
      trim: true,
    },
    photoURL: {
      type: String,
      default: "https://avatars.githubusercontent.com/u/160399111?v=4",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("the PhotoURL is invalid" + value);
        }
      },
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
