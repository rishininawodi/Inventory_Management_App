const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const userRoute  = require("./routes/userRoute");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyparser.json());

//routes
app.use("/api/users" , userRoute); //localhost:/api/users/registers

//Routes
app.get("/", (req, res) => {
    res.send("Home Page");
});

const PORT =process.env.PORT || 4000;

//this part for to connct mongo DB and  start server

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT,() =>{
            console.log(`sever Running on porrt ${PORT}
            `);

        });    

    })
    .catch((err) => console.log(err));
