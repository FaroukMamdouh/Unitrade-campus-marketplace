import React, { useState } from "react";
import "./Login.css";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState("");
  const [toggleButtonText, setToggleButtonText] = useState("Show");
  const [passwordInputType, setPasswordInputType] = useState("password");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleKeepLoggedInChange(e) {
    setKeepLoggedIn(e.target.checked);
  }

  function handleTogglePassword() {
    if (showPassword) {
      setShowPassword(false);
      setToggleButtonText("Show");
      setPasswordInputType("password");
    } else {
      setShowPassword(true);
      setToggleButtonText("Hide");
      setPasswordInputType("text");
    }
  }

  function handlePreventDefault(e) {
    e.preventDefault();
  }

  function handleSubmit(e) {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setSuccess("");

    if (!email.trim()) {
      setEmailError("Please enter your email or username.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setPasswordError("Please enter your password.");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }

    setSuccess("Details verified successfully!");
    console.log("Login submitted:", { email, password, keepLoggedIn });
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Log in</h2>
        <p className="login-subtitle">
          Need a UniTrade account?{" "}
          <a href="/register" >
            Create an account
          </a>
        </p>

        {success !== "" && <p className="login-success">{success}</p>}

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <div className="form-group">
            <label htmlFor="email">Username or Email</label>
            <input
              id="email"
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError !== "" && (
              <span className="field-error">{emailError}</span>
            )}
          </div>

          <div className="form-group">
            <div className="password-header">
              <label htmlFor="password">Password</label>
              <button
                type="button"
                className="toggle-password"
                onClick={handleTogglePassword}
              >
                {toggleButtonText}
              </button>
            </div>
            <input
              id="password"
              type={passwordInputType}
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError !== "" && (
              <span className="field-error">{passwordError}</span>
            )}
          </div>

          <div className="checkbox-group">
            <input
              id="keepLoggedIn"
              type="checkbox"
              checked={keepLoggedIn}
              onChange={handleKeepLoggedInChange}
            />
            <label htmlFor="keepLoggedIn">Keep me logged in</label>
          </div>

          <button type="submit" className="login-btn">
            Log in
          </button>

          <div className="login-links">
            <a href="#forgot-user" onClick={handlePreventDefault}>
              Forgot username?
            </a>
            <a href="#forgot-pass" onClick={handlePreventDefault}>
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
