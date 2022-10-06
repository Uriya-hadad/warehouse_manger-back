import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'warehousestaffregister',
        pass: process.env.EMAIL_PASSWORD
    }
});

export async function sendEmail(email: string, username: string, link: string): Promise<boolean> {
    const mailOptions = {
        to: email,
        subject: 'Thank you for registering to our website',
        text: `
         Hello ${username}!
         Thank you for registering to our website.
         Please click on the link below to verify your email address.
         Verify your email address: ${link}
        `
    };
    try {
        await transporter.sendMail(mailOptions);
        return true
    } catch (e) {
        return false;
    }
}
