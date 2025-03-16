require("dotenv").config();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModal");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const path=require("path");
const fs=require("fs");

const UnverifiedUser = require("../models/UnverifiedUser");

// import files
const { sendVerificationEmail } = require("../utils/verificationEmail");

const PORT = process.env.PORT || 8001;


// serving html
const forgetPasswordTemplatePath = path.join(__dirname, "../views/forgetPassword.html");



// Delete unverified users after 24 hours
const deleteUnverifiedUsers = async () => {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  await UnverifiedUser.deleteMany({
    isVerified: false,
    createdAt: { $lt: twentyFourHoursAgo },
  });
  console.log("Unverified users deleted.");
};

setInterval(deleteUnverifiedUsers, 24 * 60 * 60 * 1000);

// Get All Registered Users
const handleGetAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "❌ No users found." });
    }
    res
      .status(200)
      .json({ success: true, message: "✅ Users found successfully!", users });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "😟 Something went wrong. Please contact support.",
      error: error.message,
    });
  }
};

/// Authentic /////
// Register User
// const handleRegister = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ success: false, message: "🚨 User already exists" });
//     }
//     const hashedPassword = await bcryptjs.hash(password, 12);
//     // Create New User
//     const newUser = new User({
//       name: name.toLowerCase(),
//       email: email.toLowerCase(),
//       password: hashedPassword,
//       isVerified: false,
//       verificationToken: jwt.sign(
//         { email },
//         process.env.JWT_SECRET_KEY,
//         { expiresIn: "1h" }
//       ),
//       verificationExpires: Date.now() + 3600000,
//     });
//     await newUser.save();

//     // Send verification email
//     const verificationLink = `http://localhost:5000/auth/users/verify-email/${newUser.verificationToken}`;
//     await sendVerificationEmail(newUser.email, verificationLink);

//     // Response
//     res.status(201).json({
//       success: true,
//       message: "📬 Registration successful! Check your email to verify.",
//       user: {
//         name: newUser.name,
//         email: newUser.email,
//         id: newUser._id,
//       },
//     });
//   } catch (error) {
//     // Handle Other Errors
//     res
//       .status(500)
//       .json({
//         success: false,
//         message: "😟 Something went wrong. Please contact support.",
//         error: error.message,
//       });
//   }
// };

// authentic /////////
// // // Verify Email
// const handleEmailVerify = async (req, res) => {
//   try {
//     const { token } = req.params;
//     // Find user by token
//     const user = await User.findOne({
//       verificationToken: token,
//       verificationExpires: { $gt: Date.now() }, // Check expiry
//     });

//     if (!user) {
//       return res.status(400).send("⚠️ Invalid or expired verification link");
//     }

//     // Mark user as verified
//     user.isVerified = true;
//     user.verificationToken = undefined;
//     user.verificationExpires = undefined;
//     await user.save();

//     res.send(`
//       <h1>Email Verified Successfully! 🎉</h1>
//       <p>You can now <a href="http://localhost:3000/login">login</a>.</p>
//     `);
//   } catch (error) {
//     res.status(500).send("😟 Verification failed");
//   }
// };

/////////////////////////////////////////////////////////

const handleRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists (verified or unverified)
    const existingUser = await User.findOne({ email });
    const existingUnverifiedUser = await UnverifiedUser.findOne({ email });
    if (existingUser || existingUnverifiedUser) {
      return res.status(400).json({
        success: false,
        message: "🚨 User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 12);

    // Create new unverified user
    const newUnverifiedUser = new UnverifiedUser({
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
      verificationToken: crypto.randomBytes(32).toString("hex"),
      verificationExpires: Date.now() + 3600000,
    });

    await newUnverifiedUser.save();

    // Send verification email
    const verificationLink = `https://authentication-app-9ywt.onrender.com/auth/users/verify-email/${newUnverifiedUser.verificationToken}`;
    await sendVerificationEmail(newUnverifiedUser.email, verificationLink);
    // console.log("verification Link", verificationLink);
    res.status(201).json({
      success: true,
      message: "✅ Verification email sent! Check your inbox.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "😟 Something went wrong. Please contact support.",
      error: error.message,
    });
  }
};

// verifyEmail
const handleEmailVerify = async (req, res) => {
  try {
    const { token } = req.params;
    // console.log("Verification token received:", token);

    // Find unverified user by token
    const unverifiedUser = await UnverifiedUser.findOne({
      verificationToken: token,
      verificationExpires: { $gt: Date.now() }, // Check expiry
    });

    if (!unverifiedUser) {
      return res.redirect(`${process.env.FRONTEND_URL}/verify?verified=false`);
    }

    // Create verified user
    const newUser = new User({
      name: unverifiedUser.name,
      email: unverifiedUser.email,
      password: unverifiedUser.password,
      isVerified: true,
    });

    await newUser.save();

    // Delete unverified user
    await UnverifiedUser.deleteOne({ _id: unverifiedUser._id });

    // Redirect to frontend success page
    res.redirect(`${process.env.FRONTEND_URL}/verify?email=${newUser.email}&verified=true`);

    // console.log(
    //   "Redirecting to:",
    //   `${process.env.FRONTEND_URL}/verify?verified=true}`
    // );

    // res.send(`
    //         <h1>Email Verified Successfully! 🎉</h1>
    //         <p>You can now <a href="http://localhost:5000/login">login</a>.</p>
    //       `);
  } catch (error) {
    console.error("Verification failed:", error);
    res.redirect(`${process.env.FRONTEND_URL}/verify?email=${user.email}&verified=false`);
  }
};

// login
const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find User
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "❌ User not found!" });
    }

    // Check if email is verified 👈
    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message:
          "⚠️ Email not verified. Check your inbox or resend verification link.",
      });
    }

    // Compare Password
    const isMatchPassword = await bcryptjs.compare(password, user.password);
    if (!isMatchPassword) {
      return res
        .status(400)
        .json({ success: false, message: "❌ Password is incorrect!" });
    }

    // Generate JWT token with user ID and email as payload
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    // Response
    res.status(200).json({
      success: true,
      message: "✅ User logged in successfully!",
      token,
      user: { name: user.name, email: user.email, id: user._id },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "😟 Something went wrong. Please contact support.",
      error: error.message,
    });
  }
};

// Resend Verification Email
const handleResendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UnverifiedUser.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "📧 Email not registered. Please sign up first.",
      });
    }

    // Check if already verified
    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "✅ Email already verified. You can login now.",
      });
    }

    // Generate new token with user ID
    user.verificationToken = crypto.randomBytes(32).toString("hex");
    user.verificationExpires = Date.now() + 3600000;
    await user.save();


    // Send email
    const link = `https://authentication-app-9ywt.onrender.com/auth/users/verify-email/${user.verificationToken}`;
    await sendVerificationEmail(user.email, link);

    res.status(200).json({
      success: true,
      message:
        "📬 New verification email sent! Check your inbox (including spam).",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "😟 Failed to resend email. Please try again later.",
      error: error.message,
    });
  }
};

//////////////////////////////////////////////////////////////
// // forget-password
// const handleForgetPassword = async(req,res)=>{
//   const {email}=req.body;
//   try {
//     const user = await User.findOne({email});
//     if(!user) return res.status(400).json({success:false,message:"❌ User not found"});

//     // reset generate token
//     const token = jwt.sign({id:user._id},
//       process.env.JWT_SECRET_KEY,
//       {expiresIn:"10m"}
//     );

//     // save token and expiresTime in User Document
//     user.resetPasswordToken = token;
//     user.resetPasswordExpires=Date.now()+600000;
//     await user.save();

//     // send email varification link
//     const transporter =nodemailer.createTransport({
//       service:"gmail",
//       auth:{
//         user:process.env.EMAIL_USER,
//         pass:process.env.EMAIL_PASS,
//       },
//     });
//     const mailOptions ={
//       from: process.env.EMAIL_USER,
//       to:user.email,
//       subject:"Password-Reset",
//       // text:`Click the link to reset your password :http://localhost:${PORT}/reset-password/${token}`
//       html: `<p>Click the link to reset your password: <a href="http://localhost:${PORT}/reset-password/${token}">Reset Password</a></p>`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log(error);
//         return res.status(500).json({ success: false, message: "❌ Error sending mail", error: error.message });
//       }
//       res.status(200).json({ success: true, message: "✅ Email sent successfully" });
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "❌ Internal Server Error", error: error.message });
//   }
// }
//////////////////////////////////////////////////////////////////
// const handleForgetPassword = async (req, res) => {
//   const { email } = req.body;
//   try {
//     const user = await User.findOne({ email });

//     // User not found (Friendly message)
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message:
//           "📧 Email not found. Please check the spelling or register first.",
//       });
//     }

//     // Generate token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
//       expiresIn: "10m",
//     });

//     // Save token in DB
//     user.resetPasswordToken = token;
//     user.resetPasswordExpires = Date.now() + 600000; // 10 minutes
//     await user.save();

//     // Send email (Improved HTML)
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: `"Ninja Hathori" <${process.env.EMAIL_USER}>`,
//       to: user.email,
//       subject: "Reset Your Password",
//       html: `
//         <div style="font-family: Arial, sans-serif; padding: 20px;">
//           <h2>Password Reset Request</h2>
//           <p>We received a request to reset your password. Click the link below (valid for 10 minutes):</p>
//           <a href="http://localhost:${PORT}/reset-password/${token}"
//              style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
//              Reset Password
//           </a>
//           <p style="margin-top: 20px; color: #666;">
//             Didn't request this? You can safely ignore this email.
//           </p>
//           <p>Check your spam folder if you don't see the email.</p>
//         </div>
//       `,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error("Email Error:", error);
//         return res.status(500).json({
//           success: false,
//           message: "❌ Failed to send email. Please try again later.",
//         });
//       }
//       res.status(200).json({
//         success: true,
//         message:
//           "📬 Password reset link sent! Check your email (including spam).",
//       });
//     });
//   } catch (error) {
//     console.error("Server Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "😟 Something went wrong. Please contact support.",
//     });
//   }
// };

// reset password

const handleForgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "📧 Email not found. Please check the spelling or register first.",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 600000;
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    // Read the HTML file using fs.promises
    const htmlContent = await fs.promises.readFile(forgetPasswordTemplatePath, "utf8");

    // Replace placeholder in the HTML file
    const emailHTML = htmlContent.replace(/{{resetLink}}/g, resetLink); 

    const mailOptions = {
      from: `"Ninja Hathori" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Reset Your Password",
      html: emailHTML,
    };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });



    const info = await transporter.sendMail(mailOptions);
    if (!info.messageId) {
      throw new Error("Email sending failed");
    }

    res.status(200).json({
      success: true,
      message: "📬 Password reset link sent! Check your email (including spam).",
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({
      success: false,
      message: "😟 Something went wrong. Please contact support.",
      error: error.message, 
    });
  }
};


// const handleResetPassword = async (req, res) => {
//   const { token } = req.params;
//   const { newPassword } = req.body;

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

//     const user = await User.findOne({
//       _id: decoded.id,
//       resetPasswordToken: token,
//       resetPasswordExpires: { $gt: Date.now() },
//     });

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "🔐 Password reset link is invalid or expired. Please request a new reset link.",
//       });
//     }

//     // Password validation (optional)
//     if (newPassword.length < 8) {
//       return res.status(400).json({
//         success: false,
//         message: "🔒 Password must be at least 8 characters long",
//       });
//     }

//     const hashedPassword = await bcryptjs.hash(newPassword, 12);
//     user.password = hashedPassword;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;

//     await user.save();

//     res.status(200).json({
//       success: true,
//       message:
//         "🎉 Password reset successfully! You can now login with your new password.",
//     });
//   } catch (error) {
//     // Specific error messages
//     if (error.name === "TokenExpiredError") {
//       return res.status(400).json({
//         success: false,
//         message:
//           "⏳ Password reset link has expired. Please request a new one.",
//       });
//     }

//     if (error.name === "JsonWebTokenError") {
//       return res.status(400).json({
//         success: false,
//         message:
//           "⚠️ Invalid password reset link. Please check the URL or request a new link.",
//       });
//     }

//     // General error (avoid exposing technical details)
//     console.error("Password reset error:", error);
//     res.status(500).json({
//       success: false,
//       message: "😟 Something went wrong. Please try again later.",
//     });
//   }
// };

const handleResetPassword = async (req, res) => {
  const { token } = req.params; // Extract token from URL
  const { newPassword, confirmPassword } = req.body;

  try {
   

    // Find the user by the token and check if it's not expired
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Check if the token is still valid
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "🔐 Password reset link is invalid or expired. Please request a new reset link.",
      });
    }

 

    // Hash the new password
    const hashedPassword = await bcryptjs.hash(newPassword, 12);

    // Update the user's password and clear the reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "🎉 Password reset successfully! You can now login with your new password.",
    });
  } catch (error) {
    console.error("Password reset error:", error);
    res.status(500).json({
      success: false,
      message: "😟 Something went wrong. Please try again later.",
    });
  }
};
module.exports = {
  handleRegister,
  handleLogin,
  handleGetAllUsers,
  handleForgetPassword,
  handleResetPassword,
  handleEmailVerify,
  handleResendVerificationEmail,
};
