const express= require("express")
const app = express();
app.listen(3000, ()=>{
    console.log("The Server is Running on port 3000")
})
app.use("/" , (req, res)=>{
    const token="abc"
    const Authorised_admin = token === "abc"
    if(!Authorised_admin){
        res.status(401).send("you are not authorised")
    }
    else{
        
    }
})



