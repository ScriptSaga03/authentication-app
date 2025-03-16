const rateLimit =require("express-rate-limit");

// common rate limits options
const commonOptions={
    windowMs:15*60*1000,
    max:100,
    message:{
        success: false,
        message: "⏳ Too many requests. Please try again later.",
    },
    standardHeaders:true,
    lagacyHeaders:false
}

// specific limits

const registerLimiters =rateLimit({
    ...commonOptions,
    windowMs:60*60*1000,
    max:5
});



const loginLimiters =rateLimit({
    ...commonOptions,
    max:10
});

const forgotPasswordLimiter =rateLimit({
    ...commonOptions,
    windowMs:60*60*1000,
    max:3
});
const resetPasswordLimiter =rateLimit({
    ...commonOptions,
    windowMs:60*60*1000,
    max:5
});

const verifyEmailLimiter =rateLimit({
    ...commonOptions,
    windowMs:60*60*1000,
    max:5
});

const resendVerifyEmailLimiter =rateLimit({
    ...commonOptions,
    windowMs:60*60*1000,
    max:5
});

module.exports={
    registerLimiters,
    loginLimiters,
    forgotPasswordLimiter,
    resetPasswordLimiter,
    verifyEmailLimiter,
    resendVerifyEmailLimiter
}



