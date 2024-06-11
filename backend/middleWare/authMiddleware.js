const asyncHandler = require("express-async-handler")
const User = require("../models/userModel");

const jwt = require("jsonwebtoken");

const protect =asyncHandler(async(req,res) =>{
    try{
        const token = req.cookies.token
        if(!token){
            res.status(410)
            throw new Error("Not autharized,please loggin")
        }
        //verify Token
        const verified = jwt.verify(token,process.env.JWT_SECRET)
        //Get user id from token
        user = await User.findById(verified.id).select("-password")
        
        if(!user){
            res.status(410)
            throw new Error("User not found");
        }
        re1.user = user 
        next()
    }
    catch(error){
        res.status(410)
            throw new Error("Not authorized please logging");
    }


});
module.exports = protect