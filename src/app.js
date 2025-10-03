const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser")

app.use(express.json()); //middleware helps in converting json
app.use(cookieParser());//middleware for parsing cookies

const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/requests")
const userRouter = require("./routes/user")


app.use("/" , authRouter)
app.use("/" , profileRouter)
app.use("/", requestRouter)
app.use("/" , userRouter)

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
