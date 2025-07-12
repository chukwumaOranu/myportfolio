"use client"

import { 
  showSuccess, 
  showError, 
  showLoading, 
  dismissLoading, 
  showCustom, 
  showPromise,
  showValidationError,
  showNetworkError,
  showAuthError 
} from "@/utils/toast"

export default function ToastExamples() {
  const handleSuccessToast = () => {
    showSuccess("Operation completed successfully!");
  };

  const handleErrorToast = () => {
    showError("Something went wrong!");
  };

  const handleLoadingToast = () => {
    const loadingToast = showLoading("Processing your request...");
    
    // Simulate async operation
    setTimeout(() => {
      dismissLoading(loadingToast);
      showSuccess("Request completed!");
    }, 2000);
  };

  const handleCustomToast = () => {
    showCustom("This is a custom toast message!", {
      icon: "🔥",
      duration: 6000,
    });
  };

  const handlePromiseToast = async () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5 ? resolve() : reject();
      }, 2000);
    });

    showPromise(promise, {
      loading: "Processing...",
      success: "Successfully completed!",
      error: "Failed to complete operation",
    });
  };

  const handleValidationErrors = () => {
    const errors = {
      email: ["Invalid email format"],
      password: ["Password is too short", "Password must contain numbers"],
      name: ["Name is required"]
    };
    showValidationError(errors);
  };

  const handleNetworkError = () => {
    showNetworkError();
  };

  const handleAuthError = () => {
    showAuthError();
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Toast Notification Examples</h2>
      <div className="row g-3">
        <div className="col-md-4">
          <button onClick={handleSuccessToast} className="btn btn-success w-100">
            Success Toast
          </button>
        </div>
        <div className="col-md-4">
          <button onClick={handleErrorToast} className="btn btn-danger w-100">
            Error Toast
          </button>
        </div>
        <div className="col-md-4">
          <button onClick={handleLoadingToast} className="btn btn-primary w-100">
            Loading Toast
          </button>
        </div>
        <div className="col-md-4">
          <button onClick={handleCustomToast} className="btn btn-warning w-100">
            Custom Toast
          </button>
        </div>
        <div className="col-md-4">
          <button onClick={handlePromiseToast} className="btn btn-info w-100">
            Promise Toast
          </button>
        </div>
        <div className="col-md-4">
          <button onClick={handleValidationErrors} className="btn btn-secondary w-100">
            Validation Errors
          </button>
        </div>
        <div className="col-md-4">
          <button onClick={handleNetworkError} className="btn btn-outline-danger w-100">
            Network Error
          </button>
        </div>
        <div className="col-md-4">
          <button onClick={handleAuthError} className="btn btn-outline-warning w-100">
            Auth Error
          </button>
        </div>
      </div>
    </div>
  );
} 