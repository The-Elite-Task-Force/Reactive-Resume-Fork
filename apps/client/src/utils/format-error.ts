export const formatErrorMessage = (message?: string) => {
  if (!message) return "";
  return message.replace(/([a-z])([A-Z])/g, "$1 $2"); // Add space before uppercase letters
};
