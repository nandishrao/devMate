const express = require("express")
const requestRouter = express.Router


requestRouter.post("/sendConnectionRequest", userAuth , (req , res)=>{
  const user = req.user
  res.send(user.firstName   + "SENT A CONNECTION REQUEST" )
})

module.exports = requestRouter