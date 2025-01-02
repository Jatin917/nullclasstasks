// const nodemailer = require("nodemailer");
import nodemailer from 'nodemailer'
const otpStorage = new Map();


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // Ignore self-signed certificate errors
  },
});

const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: otp,
    html: `<p>Your OTP code is: <b>${otp}</b></p><p>It is valid for the next 5 minutes.</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};


const generateOtpAndSend = async(email) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStorage.set(email, { otp, expiresAt: Date.now() + 300000 });
    console.log(otpStorage);
    const response = await sendOtpEmail(email, otp);
    return response;
  } catch (error) {
    console.log(error.message);
    return false;
  }
}
export const sendOtpController = async(req, res) =>{
  try {
    const email = req.body.email;
    const status = await generateOtpAndSend(email);
    if(status){
      return res.status(200).json({message:"OTP sent successfully"})
    }
    return res.status(401).json({message:"failed to send otp"});
  } catch (error) {
    res.status(500).json({message:error.message});
  }
}

export const emailVerificationController = async (req, res) =>{
  try {
    const receivedOtp = req.body.otp;
    const email = req.body.email;
    const storedOtp = otpStorage.get(email);
    if (storedOtp && storedOtp.otp=== Number(receivedOtp) && Date.now() < storedOtp.expiresAt) {
      console.log("OTP is valid!");
      otpStorage.delete(email);
      return res.status(200).json({message: "OTP verified successfully" });
    }
    return res.status(401).json({message:"Otp expired or invalid"})
  } catch (error) {
    return res.status(500).json({message:error.message});
  }
}
