const express= require("express")
const app = express();
app.listen(3000, ()=>{
    console.log("The Server is Running on port 3000")
})
app.get("/user/:userId/:Name/:Password",(req,res)=>{
    console.log(req.params)
    res.send({firstName : "Nandish",    lastName : "Rao"})
})
 
app.post("/user" , (req,res)=>{
    res.send("The user data has been updated in the database")
})

app.use("/test", (req,res)=>{
    res.send("from test path")
})




