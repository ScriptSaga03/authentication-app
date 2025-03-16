const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "🚨 Name is required!"],
//       minlength: [3, "🚨 Name must be at least 3 characters long!"],
//       maxlength: [30, "🚨 Name cannot be more than 30 characters long!"],
//     },
//     email: {
//       type: String,
//       required: [true, "🚨 Email is required!"],
//       unique: true,
//       match: [/^\S+@\S+\.\S+$/, "🚨 Please enter a valid email address!"],
//       lowercase: true,
//     },
//     password: {
//       type: String,
//       required: [true, "🚨 Password is required!"],
//       minlength: [6, "🚨 Password must be at least 6 characters long!"],
//       validate: {
//         validator: function (v) {
//           return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
//             v
//           );
//         },
//         message:
//           "🚨 Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!",
//       },
//     },
//   },
//   { timestamps: { createdAt: "registeredAt", updatedAt: "modifiedAt" } }
// );

// Hash password before saving

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true, lowercase: true },
    password: { type: String },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    isVerified: { type: Boolean, default: false },
    verificationToken: String,
    verificationExpires: Date,
  },
  { timestamps: { createdAt: "registeredAt", updatedAt: "modifiedAt" } }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
