const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditRequest } = require("../utils/validation");
const bcrypt = require("bcrypt");
const user = require("../models/user");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditRequest(req)) {
      throw new Error("Invalid edit Request");
    }
    const user = req.user;
    Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));
    await user.save();
    res.json({
      message: ` Hey ${user.firstName} your profile was updated and your data is : `,
      name: user.firstName,
      data: user,
    });
  } catch (err) {
    res.send("ERROR  : " + err.message);
  }
});

profileRouter.patch("/profile/edit/password",  async (req, res) => {
  try {
    const user = req.user; //password hash from the DB
    console.log(user);
    const { oldPassword, newPassword } = req.body; //current password entered by user to verify of change of password
    const isPasswordSame = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordSame) {
      throw new Error("CurrentPassword is entered wrong");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.send(`${user.firstName} your passsword was updated `);
  } catch (err) {
    res.send("ERROR  : " + err.message);
  }
});
module.exports = profileRouter;
