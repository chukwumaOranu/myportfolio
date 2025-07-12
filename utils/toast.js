import toast from 'react-hot-toast';

// Success toast
export const showSuccess = (message) => {
  toast.success(message);
};

// Error toast
export const showError = (message) => {
  toast.error(message);
};

// Loading toast
export const showLoading = (message = 'Loading...') => {
  return toast.loading(message);
};

// Dismiss loading toast
export const dismissLoading = (toastId) => {
  toast.dismiss(toastId);
};

// Custom toast
export const showCustom = (message, options = {}) => {
  return toast(message, options);
};

// Promise toast - automatically shows loading, success, or error
export const showPromise = (promise, messages = {}) => {
  const {
    loading = 'Loading...',
    success = 'Success!',
    error = 'Something went wrong!'
  } = messages;

  return toast.promise(promise, {
    loading,
    success,
    error,
  });
};

// Form validation error toast
export const showValidationError = (errors) => {
  const errorMessages = Object.values(errors).flat();
  errorMessages.forEach(message => {
    toast.error(message);
  });
};

// Network error toast
export const showNetworkError = () => {
  toast.error('Network error. Please check your connection and try again.');
};

// Authentication error toast
export const showAuthError = () => {
  toast.error('Authentication failed. Please log in again.');
}; 