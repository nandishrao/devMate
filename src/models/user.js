const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        maxLength : 50,
        minLength:5
    },
    lastName : {
        type : String,
        trim : true,
    },
    password: {
        type : String,
        required : true 
    },
    emailId : {
        type:String,
        required: true,
        unique: true,
        lowercase : true,
        trim : true,
    },
    age: {
        type : Number,
        min : 18
    },
    gender : {
        type : String,
        validate(value){
            if(!["male" , "female" , "others"].includes(value)){
                throw new Error("The Gender is not valid")
            }
        }
    },
    about : {
        type : String,
        default : "hi i am using devTinder",
        trim : true,
    },
    photoURL :{
        type : String,
        default : "./Dummy.png"
    },
    skills : {
        type : [String]
    }
} , {timestamps : true})
 
module.exports = mongoose.model("User" , userSchema)