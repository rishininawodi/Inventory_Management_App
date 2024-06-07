const asyncHandler = require("express-async-handler")
const User = require("../models/userModel");
//const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//generate web token function
const generateToken = (id) => {
    return jwt.sign({id} , process.env.JWT_SECRET , {expiresIn:"1d"}) //expire mean id will expire on 1 day
};

const registerUser  = asyncHandler( async (req, res) => {
    
     
    const {name , email,password} =req.body;

    //validation
    if(!name || !email || !password){
        res.status(401);
        throw new Error("Please fill in all required fields");
    }
    if(password.length < 7){
        res.status(402);
        throw new Error("passsword must e in 7 characters") ; 
    }
    //check if user email already exit
    const userExists = await User.findOne({email});

    if(userExists) {
        res.status(403);
        throw new Error("Your email has already been used")  ;
    }
    /*
     //commment this part because this part dont need this here.it in userbodel.js
    //hasj a pasword beforre you create new user
    //encrypt password before saving to DB

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await  bcrypt.hash(password , salt)

    */
    
    //create new user
    const user = await User.create({
        name,
        email,
        password,   //this also no need it used in usermodel.js: hashedPassword,//point to hashedpassword

    });

    //generate token
    const token= generateToken(user._id)


    if (user){
        const {_id,name,email,photo,phone,bio}= user;
        res.status(201).json({
            _id,name,email,photo,phone,bio,token,
           
        });
    }
    else{
        res.status(401);
        throw new Error("Invalid User data");
    }
    
});

//this .js file has several controller functions.So exports module as an objects tha will have many  properties
module.exports = {
    registerUser,
};
