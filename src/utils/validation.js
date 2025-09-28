const validator = require("validator")

const validateSignUp = (req)=>{
const {firstName , lastName , emailId,password}=req.body
if(!firstName || !lastName){
    throw new Error("firstname and lastname do not exist")
}else if(!validator.isEmail(emailId)){
    throw new Error("the entered email is not valid")
}else if(!validator.isStrongPassword(password)){
    throw new Error("The password is weak please enter a storng password")
}
}
module.exports= {validateSignUp}