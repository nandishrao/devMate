const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUp } = require("./utils/validation");
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const {userAuth} = require("./middlewares/auth")

app.use(express.json()); //middleware helps in converting json
app.use(cookieParser());//middleware for parsing cookies
//save an user in the database
app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid creadential");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT()
      //add the JWT token to the cookie and send it to the user
      res.cookie("token",token)
      res.send("Login Successfull");
    } else {
      res.send("Invalid Credential");
    }
  } catch (err) {
    res.status(400).send("Error saving the data" + err.message);
  }
});

//GET method for profile
app.get("/profile" ,userAuth, async (req , res)=>{
try{
  const user = req.user
  res.send(user)
}catch(err){
  res.send("there was problem login back")
}
}) 

app.post("/sendConnectionRequest", userAuth , (req , res)=>{
  const user = req.user
  res.send(user.firstName   + "SENT A CONNECTION REQUEST" )
})

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
