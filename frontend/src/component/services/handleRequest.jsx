import axios from "axios";
import {
  handleError,
  handleSuccess,
  handleMultipleErrors,
  handleInfo,
} from "../helper/utilis";

// Register User
export const handleSubmit = async (e, user, setUser, handleNavigate) => {
  e.preventDefault();

  const payload = {
    name: user.userName,
    email: user.userEmail,
    password: user.password,
  };

  try {
    const response = await axios.post(
      "http://localhost:5000/auth/users/register",
      payload
    );

    const { success, message } = response.data;
    if (success) {
      handleInfo(message);
      setUser({
        userName: "",
        userEmail: "",
        password: "",
      });
      setTimeout(() => {
        handleNavigate();
      }, 3000);
    } else {
      handleError(message);
    }
  } catch (error) {
    if (error.response) {
      const { messages } = error.response.data;
      if (messages) {
        //   messages.forEach((message) => handleError(message));
        handleMultipleErrors(messages, 500); // 500ms delay between toasts
      } else {
        handleError(error.response.data.message || "Something went wrong!");
      }
    } else {
      handleError("Network error. Please try again later.");
    }
  }
};

// Login user
export const handleLogin = async (e, isLogin,setIsLogin, navigate) => {
  e.preventDefault();

  const payload = {
    email: isLogin.userEmail,
    password: isLogin.password,
  };

  try {
    const response = await axios.post(
      "http://localhost:5000/auth/users/login",
      payload
    );

    const { success, message, token, user } = response.data;

    if (success) {
      // Save the token to localStorage (for authentication)
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify({ name: user.name, email: user.email }));

      // Show success message
      handleSuccess(message);
      setIsLogin({ userEmail: "", password: "" });
     setTimeout(() => {
        navigate("/")
     }, 3000);
       

      // Optionally, you can redirect the user or update the state
      // console.log("Logged in user:", user);
    } else {
      handleError(message);
    }
  } catch (error) {
    if (error.response) {
      const { messages } = error.response.data;
      if (messages) {
        // Display each validation error in a toast with a delay
        handleMultipleErrors(messages, 500); // 500ms delay between toasts
      } else {
        // Display a generic error message
        handleError(error.response.data.message || "Something went wrong!");
      }
    } else {
      // Handle network or other errors
      handleError("Network error. Please try again later.");
    }
  }
};

export const handleForgetPassword = async (email) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/auth/users/forget-password",
      { email }
    );
    const { success, message } = response.data;
    if (success) {
      handleInfo(message); // Handle success message
    }
  } catch (error) {
    if (error.response) {
      const { messages } = error.response.data;
      if (messages) {
        // Display each validation error in a toast with a delay
        handleMultipleErrors(messages, 500); // 500ms delay between toasts
      } else {
        // Display a generic error message
        handleError(error.response.data.message || "Something went wrong!");
      }
    } else {
      // Handle network or other errors
      handleError("Network error. Please try again later.");
    }
  }
};

export const handleResetPassword = async (
  token,
  newPassword,
  confirmPassword,
  setIsPasswordReset
) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/auth/users/reset-password/${token}`,
      {
        newPassword,
        confirmPassword,
      }
    );
    const { success, message } = response.data;
    if (success) {
      handleSuccess(message);
      setIsPasswordReset(true);
    }
  } catch (error) {
    if (error.response) {
      const { messages } = error.response.data;
      if (messages) {
        // Display each validation error in a toast with a delay
        handleMultipleErrors(messages, 500); // 500ms delay between toasts
      } else {
        // Display a generic error message
        handleError(error.response.data.message || "Something went wrong!");
      }
    } else {
      // Handle network or other errors
      handleError("Network error. Please try again later.");
    }
  }
};


//
 export const handleResendEmailVerification = async (email) => {

  try {
    const response = await axios.post("http://localhost:5000/auth/users/resend-verification", { email });
    const { success, message } = response.data;

    if (success) {
      handleSuccess(message);
    }
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.messages || error.response.data.message;
      handleError(errorMessage || "Something went wrong!");
    } else {
      handleError("Network error. Please try again later.");
    }
  }
};
