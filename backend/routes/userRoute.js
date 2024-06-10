const express = require("express");
const { registerUser, logingUser ,logout } = require("../controllers/userControllers");//by cntrl+space bar 
const router = express.Router();

//this is the function that is supposed to fire whenever we make a request to this user routes "/register"
////localhost:/api/users/registers
//const registerUser = () => {};//normally this put in userController 

router.post("/register",registerUser);
router.post("/login",logingUser);
router.get("/logout", logout);


module.exports = router;