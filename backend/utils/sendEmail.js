const nodemailer = require("nodemailer");
//create email transporter
const sendEmail = async(subject,message,send_to,send_from,reply_to) => {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port:587,
            auth :{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false  //to mitigate any issues
            }
        });
//options for sending emails
        const options ={
            from : sent_from,
            to : send_to,
            replyId : reply_to,
            fsubject  : subject,
            html : message,
        }
        //send email
        transporter.sendMail(option,function(err,info){
            if(err){
                console.log (err)
            }
            console.log(info)
        })
};

module.exports = sendEmail

