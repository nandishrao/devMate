const express= require("express")
const app = express();

app.get("/getuserdata" , ( req, res)=>{
    throw new Error("gajabijja error")
    res.send("user Logged in ")
})
app.use("/" ,(err , req, res, next )=>{
    if(err){
        res.status(500).send("There is some fuckup in the server ")
    }
})    


app.listen(3000, ()=>{
    console.log("The Server is Running on port 3000")
})
 