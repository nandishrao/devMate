const express= require("express")
const app = express();
app.listen(3000, ()=>{
    console.log("The Server is Running on port 3000")
})
app.use("/nandish" ,(req,res)=>{
    res.send("this is from the nandish's path")
})
app.use("/test", (req,res)=>{
    res.send("from test path")
})
app.use("/", (req,res)=>{
    res.send("from slash path")
})



