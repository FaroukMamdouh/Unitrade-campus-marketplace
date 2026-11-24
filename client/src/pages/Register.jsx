import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { validateRegister } from "../utils/validators";
import "./Register.css";

const initialValues = { fullName: "", email: "", password: "", confirmPassword: "" };

export default function Register() {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const errors = validateRegister(values);

  // Show an error only after the field was visited, or after a submit attempt
  const visibleError = (name) => (touched[name] || submitted ? errors[name] : "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length > 0) return;

    // Week 3: replace with a real POST /api/auth/register call
    console.log("Register payload:", {
      fullName: values.fullName,
      email: values.email,
      password: values.password,
    });
  };

  const success = submitted && Object.keys(errors).length === 0;

  return (
    <main className="auth-page">
      <section className="card auth-card">
        <header>
          <h1>أنشئ حسابك في UniTrade</h1>
          <p className="subtitle">بِع واشترِ الكتب والأجهزة والأدوات مع زملائك الطلاب.</p>
        </header>

        {success ? (
          <div className="success" role="status">
            بياناتك سليمة ✔ سيتم ربط التسجيل بالسيرفر في المرحلة القادمة.
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <Input
              label="الاسم بالكامل"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={visibleError("fullName")}
              placeholder="اسم الطالب"
              autoComplete="name"
            />
            <Input
              label="البريد الألكترونى"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={visibleError("email")}
              placeholder="name@example.com"
              autoComplete="email"
            />
            <Input
              label="كلمة المرور"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={visibleError("password")}
              placeholder="8 أحرف على الأقل وفيها رقم"
              autoComplete="new-password"
            />
            <Input
              label="تأكيد كلمة المرور"
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={visibleError("confirmPassword")}
              placeholder="أعد كتابة كلمة المرور"
              autoComplete="new-password"
            />
            <Button type="submit">إنشاء الحساب</Button>
          </form>
        )}

        <p className="switch">
          عندك حساب بالفعل؟ <a href="/login">سجّل الدخول</a>
        </p>
      </section>
    </main>
  );
}