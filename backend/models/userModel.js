const mongoose = require("mongoose")

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
}, {
    timestamps : true
})

const User = mongoose.model("User",userSchema)
module.exports = User