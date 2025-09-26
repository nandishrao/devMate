const adminAuth =  (req, res , next)=>{
    const token="abc";
    const isAdminAuthorised = token === "abc";
    if(!isAdminAuthorised){
        res.status(401).send("you are not authorised")
    }
    else{
        next();
    }
}
const userAuth =  (req, res , next)=>{
    const token="abcd";
    const isUserAuthorised = token === "abc";
    if(!isUserAuthorised){
        res.status(401).send("you are not a authorised user")
    }
    else{
        next();
    }
}
module.exports={
    adminAuth,
    userAuth,
}
