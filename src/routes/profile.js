const express = require("express")
const profileRouter = express.Router()
const {userAuth} = require("../middlewares/auth")
const {validateEditRequest} = require("../utils/validation")

profileRouter.get("/profile" ,userAuth, async (req , res)=>{
try{
  const user = req.user
  res.send(user)
}catch(err){
  res.send("there was problem login back")
}
}) 

profileRouter.patch("/profile/edit", userAuth, async(req, res)=>{
  
  try{
    if(!validateEditRequest(req)){
    throw new Error("Invalid edit Request")
  }
    const user = req.user
    Object.keys(req.body).forEach((key)=> user[key]= req.body[key])
    res.json({
      message : ` Hey ${user.firstName} your profile was updated and your data is : `,
      name : user.firstName,
      data : user
    })
  }catch(err){
    res.send("ERROR  : " + err.message)
  }
}
)



module.exports = profileRouter