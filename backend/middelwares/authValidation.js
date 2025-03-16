const Joi = require("joi");

const emailSchema = Joi.string().email().required().messages({
  "string.email":
    "📧 Please enter a valid email address (e.g., name@example.com)",
  "any.required": "📧 Email is required",
  "string.empty": "📧 Email cannot be empty",
});
const signUpValidation = (req, res, next) => {
  // const { name, email, password } = req.body;

  // // Check if all fields are empty
  // if (!name || !email || !password) {
  //   return res.status(400).json({ success: false, message: "🚨 All fields are required!" });
  // }
  const userValidationSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
      "string.empty": "🚨 Name is required!",
      "string.min": "🚨 Name must be at least 3 characters long!",
      "string.max": "🚨 Name cannot be more than 30 characters long!",
    }),

    email: emailSchema,

    // password: Joi.string()
    //   .min(6)
    //   .required()
    //   .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
    //   .messages({
    //     "string.empty": "🚨 Password is required!",
    //     "string.min": "🚨 Password must be at least 6 characters long!",
    //     "string.pattern.base":
    //       "🚨 Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!",
    //   }),
    password: Joi.string()
      .min(8)
      .required()
      .custom((value, helpers) => {
        if (!/[A-Z]/.test(value))
          return helpers.error("string.password.uppercase");
        if (!/[a-z]/.test(value))
          return helpers.error("string.password.lowercase");
        if (!/\d/.test(value)) return helpers.error("string.password.number");
        if (!/[@$!%*?&]/.test(value))
          return helpers.error("string.password.special");
        return value;
      })
      .messages({
        "string.empty": "🚨 Password is required!",
        "string.min": "🚨 Password must be at least 8 characters long!",
        "string.password.uppercase":
          "🚨 Password must contain at least one uppercase letter!",
        "string.password.lowercase":
          "🚨 Password must contain at least one lowercase letter!",
        "string.password.number":
          "🚨 Password must contain at least one number!",
        "string.password.special":
          "🚨 Password must contain at least one special character (@$!%*?&)!",
      }),
  });

  // const {error}=userValidationSchema.validate(req.body)

  // if(error){
  //   return res.status(400)
  //   .json({messages:"Bad request ",error})
  // }
  // next()

  // Validate the request body
  const { error } = userValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  // Handle validation errors
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ success: false, messages: errorMessages });
  }
  next();
};

// login
const LoginValidation = (req, res, next) => {
  const userValidationSchema = Joi.object({
    email: emailSchema,
    password: Joi.string().min(6).required().messages({
      "string.empty": "🚨 Password is required!",
      "string.min": "🚨 Password must be at least 6 characters long!",
    }),
  });

  const { error } = userValidationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ success: false, messages: errorMessages });
  }
  // if (error) {
  //   return res.status(400).json({ messages: "Bad request ", error });
  // }
  next();
};

// forgot password validation
const emailVarificationValidation = async (req, res, next) => {
  const userValidationSchema = Joi.object({
    email: emailSchema,
  });
  const { error } = userValidationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ success: false, messages: errorMessages });
  }
  next();
};

const passwordResetValidation = async (req, res, next) => {
  const userValidationSchema = Joi.object({
    newPassword: Joi.string()
      .min(8)
      .required()
      .custom((value, helpers) => {
        if (!/[A-Z]/.test(value))
          return helpers.error("string.password.uppercase");
        if (!/[a-z]/.test(value))
          return helpers.error("string.password.lowercase");
        if (!/\d/.test(value)) return helpers.error("string.password.number");
        if (!/[@$!%*?&]/.test(value))
          return helpers.error("string.password.special");
        return value;
      })
      .messages({
        "string.empty": "🚨 Password is required!",
        "string.min": "🚨 Password must be at least 8 characters long!",
        "string.password.uppercase":
          "🚨 Password must contain at least one uppercase letter!",
        "string.password.lowercase":
          "🚨 Password must contain at least one lowercase letter!",
        "string.password.number":
          "🚨 Password must contain at least one number!",
        "string.password.special":
          "🚨 Password must contain at least one special character (@$!%*?&)!",
      }),
    confirmPassword: Joi.string()
      .required()
      .valid(Joi.ref("newPassword")) // Ensure confirmPassword matches newPassword
      .messages({
        "string.empty": "🚨 Confirm Password is required!",
        "any.only": "🚨 Passwords do not match!",
      }),
  });
  const { error } = userValidationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ success: false, messages: errorMessages });
  }
  next();
};

module.exports = {
  signUpValidation,
  LoginValidation,
  emailVarificationValidation,
  passwordResetValidation,
};
