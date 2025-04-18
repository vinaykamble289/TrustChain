import React, { createContext, useContext, useState, useCallback } from 'react';

// Create context
const ToastContext = createContext();

// Toast severity types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Function to show a toast
  const showToast = useCallback((message, type = TOAST_TYPES.INFO, duration = 5000) => {
    const id = Date.now(); // Generate unique ID
    
    setToasts(prevToasts => [
      ...prevToasts,
      { id, message, type, duration }
    ]);
    
    // Auto remove toast after duration
    setTimeout(() => {
      setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
    }, duration);
    
    return id;
  }, []);

  // Function to manually close a toast
  const closeToast = useCallback(id => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  }, []);

  // Context value
  const value = {
    toasts,
    showToast,
    closeToast
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} closeToast={closeToast} />
    </ToastContext.Provider>
  );
};

// Custom hook to use toast context
export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Toast container component
const ToastContainer = ({ toasts, closeToast }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map(toast => (
        <Toast 
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      ))}
    </div>
  );
};

// Individual Toast component
const Toast = ({ id, message, type, onClose }) => {
  // Style based on type
  const getTypeStyles = () => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return 'bg-green-500 border-green-600';
      case TOAST_TYPES.ERROR:
        return 'bg-red-500 border-red-600';
      case TOAST_TYPES.WARNING:
        return 'bg-yellow-500 border-yellow-600';
      case TOAST_TYPES.INFO:
      default:
        return 'bg-blue-500 border-blue-600';
    }
  };

  return (
    <div 
      className={`${getTypeStyles()} text-white px-4 py-3 rounded shadow-lg border-l-4 flex justify-between items-center min-w-80`}
    >
      <div>{message}</div>
      <button 
        onClick={() => onClose(id)}
        className="ml-4 text-white hover:text-gray-200 focus:outline-none"
      >
        ✕
      </button>
    </div>
  );
};

export default ToastContext;