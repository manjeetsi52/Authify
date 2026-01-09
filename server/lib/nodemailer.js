/* import nodemailer from "nodemailer";
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
} */

   // email.js
import SibApiV3Sdk from "sib-api-v3-sdk";
import dotenv from "dotenv";
dotenv.config();

const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendVerificationEmail = async ({ to, subject, html }) => {
  try {
    console.log("Brevo API Key:", process.env.BREVO_API_KEY);

    const resp = await emailApi.sendTransacEmail({
      sender: { email: process.env.SENDER_EMAIL, name: process.env.SENDER_NAME || "Authify" },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    });

    console.log("✅ Email sent:", resp);
    return resp;
  } catch (err) {
    console.error("❌ Brevo send error:", err.response ? err.response.body : err);
    throw err; // rethrow or handle as you prefer
  }
};
