const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUp } = require("./utils/validation");
const bycrypt = require("bcrypt")

app.use(express.json()); //middleware helps in converting json
//save an user in the database
app.post("/signup", async (req, res) => {
  //validate data
  try {
    validateSignUp(req);
    const {firstName , lastName , emailId, password} = req.body

    //Encrypting password
    const passwordHash = await bycrypt.hash(password , 10)
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

//GET method to get user by a particular emailID
app.get("/user", async (req, res) => {
  const email = req.body.emailId;

  try {
    const user = await User.find({ emailId: email });
    if (user.length === 0) {
      res.send("user not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Couldn't fetch user");
  }
});

//GET method to get all the users to show on the feed
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send("something went wrong");
  }
});

//DELETE method to delete a user by MONGOID
app.delete("/user", async (req, res) => {
  try {
    const id = req.body.UserID;
    const user = await User.findByIdAndDelete(id);
    res.send("the user is successfully deleted ");
  } catch (err) {
    res.status(500).send("There was some problem deleting the user");
  }
});
//PATCH method to update user data
app.patch("/user", async (req, res) => {
  try {
    const { userID, ...data } = req.body;

    const ALLOWED_UPDATES = [
      "gender",
      "about",
      "photoURL",
      "password",
      "skills",
    ];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );

    if (!isUpdateAllowed) {
      return res.status(400).send("Update not allowed");
    }
    if (data?.skills.length >= 3) {
      throw new Error("yooo you dont even have that much skills");
    }
    await User.findByIdAndUpdate(userID, data, {
      runValidators: true,
      new: true,
    });

    res.send("The user details were updated");
  } catch (err) {
    res.status(500).send("The update failed: " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection is Successfull");
    app.listen(3000, () => {
      console.log("The Server is Running on port 3000");
    });
  })
  .catch((err) => {
    console.log("database connection failed");
  });
