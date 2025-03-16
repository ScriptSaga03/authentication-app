require("dotenv").config();
const nodemailer=require("nodemailer");
const sendVerificationEmail = (email, link) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { 
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS 
    },
  });

  const mailOptions = {
    from: `"Ninja Hathori" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify Your Email",
    html: `
      <div style="font-family: Arial; padding: 20px;">
        <h2>Welcome to Our App!</h2>
        <p>Click the button below to verify your email:</p>
        <a href="${link}" 
           style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
           Verify Email
        </a>
        <p style="margin-top: 20px;">Link expires in 1 hour.</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions); 
};

module.exports={
  sendVerificationEmail
}
 