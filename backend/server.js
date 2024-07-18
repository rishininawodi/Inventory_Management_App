const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const userRoute  = require("./routes/userRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");
const productRoute = require("./routes/productRoute");
const contactRoute = require("./routes/contactRoute");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials : true,
    })
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//routes middlewares
app.use("/api/users" , userRoute); //localhost:/api/users/registers
app.use("/api/products", productRoute);
app.use("/api/contactus", contactRoute);
//Routes
app.get("/", (req, res) => {
    res.send("Home Page");
});
//Error Middle ware
app.use(errorHandler);

const PORT =process.env.PORT || 5000;
//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//this part for to connct mongo DB and  start server

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT,() =>{
            console.log(`sever Running on port ${PORT}
            `);

        });

    })
    .catch((err) => console.log(err));
