const express= require("express")
const connectDB =require("./config/database")
const app = express();
const User = require ("./models/user")

app.post("/signup" , async ( req , res )=>{
    const user = new User({
        firstName: "Nandish",
        lastName : "Rao",
        password : "NandishRao@123",
        email: "nandishhraoo@gmail.com",
    })
     try{
        await user.save()
     res.send("user data saved Succesfully ")
     }catch(err){
        res.status(400).send("Error saving the data"  + err.message)
     }
})

 




connectDB().then(()=>{
    console.log("Database connection is Successfull")
    app.listen(3000, ()=>{
    console.log("The Server is Running on port 3000")
})
}).catch(err=>{
    console.log("database connection failed")
})

 