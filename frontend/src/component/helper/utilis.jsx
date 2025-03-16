import {toast} from 'react-toastify'


// export const handleSuccess =(msg)=>{
//     toast.success(msg, {
//         position:"top-right"
//     })
// }


// export const handleError =(msg)=>{
//     toast.error(msg, {
//         position:"top-right"
//     })
// }


// Handle info
export const handleInfo = (message) => {
  toast.info(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};


// Handle Success
export const handleSuccess = (message) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

// Handle Error
export const handleError = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};



// Handle Multiple Errors with Delay
export const handleMultipleErrors = (messages, delay = 500) => {
  messages.forEach((message, index) => {
    setTimeout(() => {
      handleError(message);
    }, index * delay); // Add a delay between each toast
  });
};