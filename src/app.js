const express= require("express")
const connectDB =require("./config/database")
const app = express();

connectDB().then(()=>{
    console.log("Database connection is Successfull")
    app.listen(3000, ()=>{
    console.log("The Server is Running on port 3000")
})
}).catch(err=>{
    console.log("database connection failed")
})

 