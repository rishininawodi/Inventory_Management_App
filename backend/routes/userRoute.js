const express = require("express");
const { registerUser, loginUser ,logout,getUser, loginStatus, updateUser, changePassword, forgotPassword, resetPassword, } = require("../controllers/userControllers");//by cntrl+space bar 
const router = express.Router();
const protect = require("../middleWare/authMiddleware");

//this is the function that is supposed to fire whenever we make a request to this user routes "/register"
////localhost:/api/users/registers
//const registerUser = () => {};//normally this put in userController 

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/logout", logout);
router.get("/getuser",protect, getUser); //get this user route acces to user information
router.get("/loggedin", loginStatus);
router.patch("/updateuser", protect,updateUser);
router.patch("/changepassword" ,protect,changePassword);
router.post("/forgotpassword" , forgotPassword);
router.put("/resetpassword/:resetToken" , resetPassword);

module.exports = router;