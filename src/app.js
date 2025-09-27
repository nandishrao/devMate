const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json()); //middleware helps in converting json
//save an user in the database
app.post("/signup", async (req, res) => {
  //creating a new instance of the user model
  const user = new User(req.body);
  try {
    await user.save();
    res.send("user data saved Succesfully ");
  } catch (err) {
    res.status(400).send("Error saving the data" + err.message);
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
  const userID = req.body.UserID;
  const data = req.body;
  try {
    await User.findByIdAndUpdate(userID, data ,{runValidators : true} );
    res.send("the user details was updated");
  } catch (err) {
    res.send("the update was failed");
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
