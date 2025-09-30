const express = require("express")
const authRouter = express.Router()
const User = require("../models/user");
const { validateSignUp } = require("../utils/validation");
const bcrypt = require("bcrypt")



authRouter.post("/signup", async (req, res) => {
  //validate data
  try {
    validateSignUp(req);
    const {firstName , lastName , emailId, password} = req.body

    //Encrypting password
    const passwordHash = await bcrypt.hash(password , 10)
    const user = new User({firstName,
       lastName,
       emailId,
      password : passwordHash
      });
    await user.save();
    res.send("user data saved Succesfully ");
  } catch (err) {
    res.status(400).send("Error saving the data  " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid creadential");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT()
      res.cookie("token",token)
      res.send("Login Successfull");
    } else {
      res.send("Invalid Credential");
    }
  } catch (err) {
    res.status(400).send("Error saving the data" + err.message);
  }
});


module.exports = authRouter