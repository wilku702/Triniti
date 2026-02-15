const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s\-+()]{7,20}$/;

export const validateEmail = (email) => {
  if (!email || !email.trim()) return 'Email is required.';
  if (!EMAIL_REGEX.test(email.trim())) return 'Please enter a valid email address.';
  return null;
};

export const validatePassword = (password) => {
  if (!password || !password.trim()) return 'Password is required.';
  if (password.length < 6) return 'Password must be at least 6 characters.';
  return null;
};

export const validateRequired = (value, fieldName) => {
  if (!value || !String(value).trim()) return `${fieldName} is required.`;
  return null;
};

export const validateAge = (age) => {
  if (!age || !String(age).trim()) return null; // age is optional
  const num = Number(age);
  if (isNaN(num) || !Number.isInteger(num) || num < 0 || num > 150) {
    return 'Please enter a valid age (0-150).';
  }
  return null;
};

export const validatePhone = (phone) => {
  if (!phone || !phone.trim()) return null; // phone is optional
  if (!PHONE_REGEX.test(phone.trim())) return 'Please enter a valid phone number.';
  return null;
};

export const validateLoginFields = (email, password) => {
  const emailError = validateEmail(email);
  if (emailError) return emailError;
  const passwordError = validatePassword(password);
  if (passwordError) return passwordError;
  return null;
};
