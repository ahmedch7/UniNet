import nodemailer from 'nodemailer';
import 'dotenv/config';


export const sendNotificationEmail = (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIl, // Replace with your email
            pass: process.env.EMAIL_PASSWORD, // Replace with your email password or app password
        },
    });
    const mailOptions = {
        from: 'intissar.najjar@gmail.com',
        to,
        subject,
        text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};
