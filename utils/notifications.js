// Simple toast notification utility
// This creates a non-blocking notification instead of using alert()

export const showNotification = (message, type = 'error') => {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white max-w-sm ${
    type === 'error' ? 'bg-red-500' : type === 'success' ? 'bg-green-500' : 'bg-blue-500'
  }`;
  toast.textContent = message;
  
  // Add to DOM
  document.body.appendChild(toast);
  
  // Add entrance animation
  toast.style.transform = 'translateX(100%)';
  toast.style.transition = 'transform 0.3s ease-out';
  
  // Animate in
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
  }, 10);
  
  // Remove after 4 seconds
  setTimeout(() => {
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 300);
  }, 4000);
};