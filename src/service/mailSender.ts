import EmailModel from "@/models/Email";
import config from "next/config";
import nodemailer from "nodemailer";
export async function sendMail(emailModel:EmailModel) {
    try {
     config();
     const transporter = nodemailer.createTransport({
         host: process.env.BREVO_HOST,
         port: Number(process.env.BREVO_PORT),
         secure: false,
         auth: {
           user: process.env.BREVO_USERNAME,
           pass: process.env.BREVO_PASSWORD,
         },
       });
  
       await transporter.sendMail({
         from: `"LMS Portal" <${process.env.FROM_MAIL}>`,
         to: emailModel.toEmail,
         subject: emailModel.subject,
         html: emailModel.message,
       });
      
       console.log("Email sent successfully");
    } catch (error) {
       throw new Error("Error while sending email");
    }
 }