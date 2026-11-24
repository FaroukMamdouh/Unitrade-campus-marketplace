// Shared validation helpers (used by Register now, Login/Profile later)

export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export const minLength = (value, length) => value.length >= length;

export const validateRegister = ({ fullName, email, password, confirmPassword }) => {
  const errors = {};

  if (!fullName.trim()) errors.fullName = "أدخل اسمك بالكامل.";
  else if (fullName.trim().length < 3) errors.fullName = "الاسم يجب ألا يقل عن 3 أحرف.";

  if (!email.trim()) errors.email = "أدخل بريدك الإلكتروني.";
  else if (!isEmail(email)) errors.email = "أدخل بريدًا صحيحًا مثل name@example.com.";

  if (!password) errors.password = "أدخل كلمة المرور.";
  else if (!minLength(password, 8)) errors.password = "كلمة المرور يجب ألا تقل عن 8 أحرف.";
  else if (!/\d/.test(password)) errors.password = "كلمة المرور يجب أن تحتوي على رقم واحد على الأقل.";

  if (!confirmPassword) errors.confirmPassword = "أكّد كلمة المرور.";
  else if (confirmPassword !== password) errors.confirmPassword = "كلمتا المرور غير متطابقتين.";

  return errors;
};