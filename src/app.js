const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

//   // Handle preflight OPTIONS request
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// });

app.use(express.json()); //middleware helps in converting json
app.use(cookieParser()); //middleware for parsing cookies

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

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
