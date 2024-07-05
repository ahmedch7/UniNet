import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import QRCode from 'qrcode';

dotenv.config();

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

export const sendParticipationEmail = async (userEmail, userNom, userPrenom, eventName, location, date, description, eventId) => {
    const eventDate = new Date(date);
    const eventData = `Event: ${eventName}\nLocation: ${location}\nDate: ${eventDate.toLocaleString()}\nName: ${userNom}\nSurname: ${userPrenom}\nDescription: ${description}`;
    const qrCodeDataUrl = await generateQRCode(eventData);

    const eventLink = `http://localhost:4200/event-details/${eventId}`;

    const mailOptions = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: `Participation Confirmation for ${eventName}`,
        html: `
        <div style="background-color: #f8f9fa; padding: 20px; font-family: Arial, sans-serif; color: #333;">
            <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
                <div style="text-align: center;">
                    <h2 style="color: #dc3545;">${eventName}</h2>
                </div>
                <div style="display: flex; justify-content: center; margin: 20px 0;">
                    <img src="cid:qrcode@event" alt="QR Code" style="border-radius: 8px; max-width: 150px;" />
                </div>
                <p style="font-size: 16px; line-height: 1.5;">Dear ${userPrenom} ${userNom},</p>
                <p style="font-size: 16px; line-height: 1.5;">Thank you for participating in <strong>${eventName}</strong>!</p>
                <p style="font-size: 16px; line-height: 1.5;"><strong>Event Details:</strong> ${description}</p>
                <p style="font-size: 16px; line-height: 1.5;"><strong>Location:</strong> ${location}</p>
                <p style="font-size: 16px; line-height: 1.5;"><strong>Date:</strong> ${eventDate.toLocaleString()}</p>
                <p style="font-size: 16px; line-height: 1.5;">We look forward to seeing you at the event.</p>
                <div style="text-align: center; margin-top: 30px;">
                    <a href="${eventLink}" style="background-color: #dc3545; color: #ffffff; padding: 10px 20px; border-radius: 5px; text-decoration: none;">View Event</a>
                </div>
            </div>
            <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #777;">
                <p>&copy; 2024 Your Company. All rights reserved.</p>
                <p>1234 Your Street, Your City, Your Country</p>
            </div>
        </div>`,
        attachments: [
            {
                filename: 'qrcode.png',
                path: qrCodeDataUrl,
                cid: 'qrcode@event'
            }
        ],
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
