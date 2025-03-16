const express = require("express");
const routes = require("../controllers/userController");
const {
  signUpValidation,
  LoginValidation,
  emailVarificationValidation,
  passwordResetValidation,
} = require("../middelwares/authValidation");

const {
  registerLimiters,
  loginLimiters,
  forgotPasswordLimiter,
  resetPasswordLimiter,
  verifyEmailLimiter,
  resendVerifyEmailLimiter
} =require("../utils/rateLimiter")


const router = express.Router();
// get users
router.get("/users",
     routes.handleGetAllUsers);


//register user
router.post("/register", 
    registerLimiters,
    signUpValidation, 
    routes.handleRegister);


// email varification
router.get("/verify-email/:token",
    // verifyEmailLimiter,
     routes.handleEmailVerify);


// resend email verification
router.post("/resend-verification", 
  // resendVerifyEmailLimiter,
    routes.handleResendVerificationEmail);


//login user
router.post("/login", 
  loginLimiters,
    LoginValidation,
     routes.handleLogin);


// forget password email varification
router.post(
  "/forget-password",
  forgotPasswordLimiter,
  emailVarificationValidation,
  routes.handleForgetPassword
);


// reset password
router.post(
  "/reset-password/:token",
  resetPasswordLimiter,
  passwordResetValidation,
  routes.handleResetPassword
);


// router.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ success: false, message: "❌ Internal Server Error" });
//   });

module.exports = router;
