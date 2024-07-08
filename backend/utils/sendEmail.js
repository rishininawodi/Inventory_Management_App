const nodemailer = require("nodemailer");
//create email transporter
const sendEmail = async(subject,message,send_to, sent_from,reply_to) => {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port:587,
            auth :{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false,  //to mitigate any issues
            },
        });
//options for sending emails
        const options ={
            from : sent_from,
            to : send_to,
            replyTo : reply_to,
            subject  : subject,
            html : message,
        }
        //send email
        transporter.sendMail(options,function(err,info){
            if(err){
                console.error("Error sending email:", err);
                throw new Error("Email not sent, please try again");
            }
            else{ 
                console.log("Email sent:", info.response);
            }
        });
};

module.exports = sendEmail;

