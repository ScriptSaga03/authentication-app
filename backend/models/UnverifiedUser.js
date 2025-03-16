const mongoose = require("mongoose");

const unverifiedUserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  verificationToken: String,
  verificationExpires: Date,
}, { timestamps: true });

const UnverifiedUser= mongoose.model("UnverifiedUser", unverifiedUserSchema);
module.exports =UnverifiedUser;