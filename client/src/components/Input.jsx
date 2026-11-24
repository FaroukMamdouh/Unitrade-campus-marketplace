import { useState } from "react";

export default function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  autoComplete,
}) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";
  const errorId = `${name}-error`;

  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <div className="field-control">
        <input
          id={name}
          name={name}
          type={isPassword && visible ? "text" : type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`${error ? "has-error" : ""} ${isPassword ? "with-toggle" : ""}`}
        />
        {isPassword && (
          <button
            type="button"
            className="toggle"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
          >
            {visible ? "إخفاء" : "إظهار"}
          </button>
        )}
      </div>
      {error && (
        <p id={errorId} className="error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}