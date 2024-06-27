import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import QRCode from 'qrcode';

dotenv.config();

console.log('Email:', process.env.EMAIL);
console.log('Password:', process.env.PASSWORD);

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

const generateQRCode = async (data) => {
    try {
        const qrCodeDataUrl = await QRCode.toDataURL(data);
        return qrCodeDataUrl;
    } catch (error) {
        console.error('Error generating QR code:', error);
        throw error;
    }
};

export const sendParticipationEmail = async (userEmail, userNom, userPrenom, eventName, location, date, description) => {
    const eventDate = new Date(date); // Convert date string to Date object
    const eventData = `Event: ${eventName}\nLocation: ${location}\nDate: ${eventDate.toLocaleString()}\nName: ${userNom}\nSurname: ${userPrenom}\nDescription: ${description}`;
    const qrCodeDataUrl = await generateQRCode(eventData);

    const mailOptions = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: `Participation Confirmation for ${eventName}`,
        text: `Thank you for participating in ${eventName}!\n\nEvent Details:\nLocation: ${location}\nDate: ${eventDate.toLocaleString()}\n\nWe look forward to seeing you at the event.`,
        attachments: [
            {
                filename: 'qrcode.png',
                path: qrCodeDataUrl,
                cid: 'qrcode@event'
            }
        ],
        html: `<p>Thank you for participating in ${eventName}!</p>
               <p>Event Details:${description}</p>
               <p>Location: ${location}</p>
               <p>Date: ${eventDate.toLocaleString()}</p>
               <p>We look forward to seeing you at the event.</p>
               <img src="cid:qrcode@event" alt="QR Code" />`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
