//implemented JWT auth tokens and cookies
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { request } = require("express");
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Token");
    }
    const decodedInfo = jwt.verify(token, "NANDISH@$RAO");
    const { _id } = decodedInfo;
    const loggedinuser = await User.findById(_id);
    if (!loggedinuser) {
      throw new Error("User not found");
    }
    request.user = loggedinuser;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};
module.exports = {
  userAuth,
};
