const registerUser  =   (req, res) => {
    if(!req.body.email){
        res.status(700)
        throw new Error("Please add an email")
    }
    res.send("Register User");
};

//this .js file has several controller functions.So exports module as an objects tha will have many  properties
module.exports = {
    registerUser,
};
