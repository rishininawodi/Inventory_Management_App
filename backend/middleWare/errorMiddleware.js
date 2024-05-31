const errorHandler = (errr, rreq, res, next) => {
 
    const statusCode =res.statusCode ? res. 
    statusCode : 401
    res.status(statusCode)

    res.json({
        message: err.message,
        stack : process.env.NODE_ENVIRONMENT === "developing"
        ? err.stack : null
    })
};

//exporting so that can be accessible from different points of our applications...

module.exports = errorHandler;

//make shure that above error handler is acceccible from top of our application .it do in server.js by doing following
//const errorHandler = require("./middleWare/errorMiddleware"); 
