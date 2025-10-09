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

const validateEditRequest = (req)=>{
    const allowedEditFields = ["firstName","lastName","age","about","password","gender","about", "skills", "photoURL"]
    const isEditAllowed =Object.keys(req.body)
    .every((field) => allowedEditFields
    .includes(field))

    return isEditAllowed ; 
}


module.exports= {validateSignUp, validateEditRequest}