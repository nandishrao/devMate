const express= require("express")
const app = express();
const {adminAuth , userAuth}=require("./middlewares/auth")
app.listen(3000, ()=>{
    console.log("The Server is Running on port 3000")
})
app.use("/admin" ,adminAuth)

app.get("/user/login" , ( req, res)=>{
    res.send("user Logged in ")
})

app.get("/user/data" , userAuth, ( req, res)=>{
    res.send("authorised user")
})

app.get("/admin/dashboard" , (req,res)=>{
    res.send("Welcome to Admin Dashboard")
})


