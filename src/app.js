const express= require("express")
const connectDB =require("./config/database")
const app = express();
const User = require ("./models/user")

app.use(express.json())//middleware helps in converting json 

app.post("/signup" , async ( req , res )=>{ 
    //creating a new instance of the user model
     const user = new User(req.body)
     try{
        await user.save()
     res.send("user data saved Succesfully ")
     }catch(err){
        res.status(400).send("Error saving the data"  + err.message)
     }
})

app.get("/user" , async (req,res)=>{
    const email = req.body.emailId  

    try{
    const user = await User.find({emailId : email})
    if(user.length === 0){
        res.send("user not found")
    }else{
        res.send(user)
    }
    }catch (err){
    res.status(400).send("Couldn't fetch user")
    }
})


app.get("/feed" , async (req,res)=>{
   try{
     const users = await User.find({})
     res.send(users)
   }catch(err){
    res.status(500).send("something went wrong" )
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

 