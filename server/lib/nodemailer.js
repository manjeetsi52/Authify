import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: Number(process.env.BREVO_SMTP_PORT),
  secure: false, // true for port 465, false for 587
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS
  }
});

export const sendVerificationEmail = async({to,subject,html})=>{
   const info = await transporter.sendMail({
    from:process.env.SENDER_EMAIL,
    to,
    subject,
    html
   })
   console.log('info',info)
}