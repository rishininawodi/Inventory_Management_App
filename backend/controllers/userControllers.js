const asyncHandler = require("express-async-handler")
const User = require("../models/userModel");
//const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//generate web token function
const generateToken = (id) => {
    return jwt.sign({id} , process.env.JWT_SECRET , {expiresIn:"5d"}) //expire mean id will expire on 1 day
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
    //generate token fot front endCreate 
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

//logoutt User
const logout = asyncHandler(async(req,res) => {
    res.cookie("token", "", {
        path: "/",  //path were cookie wiil be stored
        httpOnly: true, //boolean parameter flags the cookie to be only used by the web server
        expires: new Date(0), //1 day equation
        
        //folowing two execute only deploye.
        sameSite: "none",
        secure:true  //this  marks the cookie to be used only with https
    });
    return res.status(200).json({message: "Successfully logout"});
});

//Get user data
const getUser = asyncHandler( async(req,res)=>{
    const user = await User.findById(req.user._id)

    if (user){
        const {_id,name,email,photo,phone,bio}= user;
        res.status(200).json({
            _id,name,email,photo,phone,bio,
           
        });
    }
    else{
        res.status(401);
        throw new Error("User not found");
    }
    
});

//Getting login status
const loginStatus = asyncHandler(async(req,res)=> {
    
    const  token =req.cookies.token;
    if(!token){
        return res.json(false)//if user is loggedout then logged in status is false..
    }

    //verify token
    const verified = jwt.verify(token,process.env.JWT_SECRET);
    if(verified){
        return res.json(true)//if user is logged in then logged in status is true..
    }
    return res.json(false);

});

//update User
const updateUser =asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id);

    if(user) {
        const{ name, email,photo,phone,bio} = user;
        user.email = email;
        user.name = req.body.name || name;
        user.phone = req.body.phone || phone;
        user.bio = req.body.bio || bio;
        user.photo = req.body.photo || photo;

        const updatedUser = await user.save()
        res.status(200).json({
            _id :updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            photo:updatedUser.photo,
            phone:updatedUser.phone,
            bio:updatedUser.bio,

        });
    }
    else{
        res.status(404)
        throw new Error("User not Found");
    }
});
const changePassword =asyncHandler(async(req,res) => {
    const user = await User.findById(req.user._id);
    const {oldPassword,password} = req.body;

    if(!user){
        res.status(404)
        throw new Error("User not found please signup");   
    }

    
    //validate
    if(!oldPassword || !password){
        res.status(404)
        throw new Error("Please add old and new password");   
    }
    //check if  old password matches password in DB
    const passswordIsCorrect = await bcrypt.compare(oldPassword,
        user.password)
    //save new password
    if(user && passswordIsCorrect){
        user.passswordIsCorrect = password
        await user.save()
        res.status(200).send("Password change successfull");

    }
    else{
        res.status(400);

        throw new Error("old password  is incorrect ");
    }

});
//reset/forgotpassword
const forgotPassword = asyncHandler(async(req,res) => {
    res.send("reset");
})


//this .js file has several controller functions.So exports module as an objects tha will have many  properties
module.exports = {
    registerUser,
    logingUser,
    logout,
    getUser,
    loginStatus,
    updateUser,
    changePassword,
    forgotPassword,
    
};
