const registerUser  =  async (req, res) => {
    res.send("Register User");
};

//this .js file has several controller functions.So exports module as an objects tha will have many  properties
module.exports = {
    registerUser,
};
