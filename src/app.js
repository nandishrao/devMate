const express= require("express")
const app = express();
app.listen(3000, ()=>{
    console.log("The Server is Running on port 3000")
})

app.use("/user", 
    (req,res,next)=>{
    next()
},
(req,res,next)=>{
    console.log("this is from the second handler")
    next()
},
(req , res, next)=>{
    console.log("third handler")
    next();
},
(req , res, next)=>{
    console.log("fourth handler")
    next();
},
(req , res, next)=>{
    console.log("fifth handler")
    res.send("from the fifth handler")
}
)




