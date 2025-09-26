const mongoose=require('mongoose')
const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://nandishrao:NandishRao%40123@devmate.h228krp.mongodb.net/")
}

module.exports = connectDB

