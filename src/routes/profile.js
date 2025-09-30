const express = require("express")

const profileRouter = express.Router

profileRouter.get("/profile" ,userAuth, async (req , res)=>{
try{
  const user = req.user
  res.send(user)
}catch(err){
  res.send("there was problem login back")
}
}) 

module.exports = profileRouter