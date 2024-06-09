const asyncHandler = require("express-async-handler")
const User = require("../models/userModel");
//const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//generate web token function
const generateToken = (id) => {
    return jwt.sign({id} , process.env.JWT_SECRET , {expiresIn:"1d"}) //expire mean id will expire on 1 day
};

//Register user

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
    const token= generateToken(user._id);
    //send HTTP -only cookie for client
    res.cookie("token", token, {
        path: "/",  //path were cookie wiil be stored
        httpOnly: true, //boolean parameter flags the cookie to be only used by the web server
        expires: new Date(Date.now() +1000 * 86400), //1 day equation
        
        //folowing two execute only deploye.
        sameSite: "none",
        secure:true  //this  marks the cookie to be used only with https
    });



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

//Logging User
const logingUser =asyncHandler(async(req, res)=> {
    const {email,password} = req.body;

    //validation 
    if(!email || !password) {
        res.status(400);
        throw new Error("please add email and password");

    }

    //check if user exist
    const user =await User.findOne({email});
    if(!user) {
        res.status(400);
        throw new Error("User not found,please signup");

    }
    //User exists, check if password is correct
    const passwordIsCorrect = await bcrypt.compare(password,user.password)
    //generate token fot front end
    const token= generateToken(user._id);
    //send HTTP -only cookie for client
    res.cookie("token", token, {
        path: "/",  //path were cookie wiil be stored
        httpOnly: true, //boolean parameter flags the cookie to be only used by the web server
        expires: new Date(Date.now() +1000 * 86400), //1 day equation
        
        //folowing two execute only deploye.
        sameSite: "none",
        secure:true  //this  marks the cookie to be used only with https
    });




    //user information
    if(user && passwordIsCorrect){
        const {_id,name,email,photo,phone,bio}= user;
        res.status(208).json({
            _id,name,email,photo,phone,bio,token,
           
        });

    }
    else{
        res.status(409);
        throw new Error("Invalid email or password"); 
    }

});

//this .js file has several controller functions.So exports module as an objects tha will have many  properties
module.exports = {
    registerUser,
    logingUser,
};
