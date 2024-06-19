const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    //specify schema properties
    name: {
        type: String,
        required: [true, "Please  add a name"]
    },
    email: {
        type: String,
        required: [true, "Please  add a email"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter valid email"
        ]

    },
    password: {
        type:String,
        required: [true, "Please add a Strong Password"],
        minLength: [8, "Password must be up to  8 characters"],

        /*  i comment following maxx lenghth because when encryptpassword,
        then password go more than 20.so i comment this*/

       /* maxLength: [20, "password  must not be more than 20 characters"],*/
    },
    photo: {
        type:String,
        required: [true, "please add a profile poto"],
        //not compulsary add a poto.there fore put default
        default: "https://i.ibb.co/4pDNDk1/avatar.png"
    },

    phone: {
        type:String,
        default: "+94"
    },
    bio: {
        type: String,
        default: "bio",
        maxLength: [400, "Bio must not over than 400 words"]
    }
}, 
{
    timestamps : true

});

//Encrypt password before saving to DB
//this part done in this file because of this code can reset password ,modify,and forgoten option

//"pre" mean before it saved in databse it will be modified...OR before you execute  the function to save it in the database or to create a new objects in dattabase hash the password.
userSchema.pre("save" , async function(next){ //because next use whenever we execute what is inside this function we want to be able to move on to next  line of code

    if(!this.isModified("password")){
        return next();
    }
    //Hash password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await  bcrypt.hash(this.password , salt); //this used for directly get.because password property have inside of this file
    this.password = hashedPassword;
    next();

})

const User = mongoose.model("User",userSchema)
module.exports = User;

