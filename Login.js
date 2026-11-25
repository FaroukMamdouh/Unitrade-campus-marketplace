const form = document.querySelector("#Login-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const keepLoggedInInput = document.querySelector("#keepLoggedIn");
const togglePasswordBtn = document.querySelector("#toggle-password");

const emailErrorEl = document.querySelector("#email-error");
const passwordErrorEl = document.querySelector("#password-error");
const successEl = document.querySelector("#Login-success");

const signupLink = document.querySelector("#signup-link");
const forgotUserLink = document.querySelector("#forgot-user-link");
const forgotPassLink = document.querySelector("#forgot-pass-link");

function handlePreventDefault(e) {
  e.preventDefault();
}

signupLink.addEventListener("click", handlePreventDefault);
forgotUserLink.addEventListener("click", handlePreventDefault);
forgotPassLink.addEventListener("click", handlePreventDefault);

togglePasswordBtn.addEventListener("click", function () {
  const isShown = passwordInput.type === "text";
  if (isShown) {
    passwordInput.type = "password";
    togglePasswordBtn.textContent = "Show";
  } else {
    passwordInput.type = "text";
    togglePasswordBtn.textContent = "Hide";
  }
});

function resetMessages() {
  emailErrorEl.textContent = "";
  emailErrorEl.hidden = true;

  passwordErrorEl.textContent = "";
  passwordErrorEl.hidden = true;

  successEl.textContent = "";
  successEl.hidden = true;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  resetMessages();

  const email = emailInput.value;
  const password = passwordInput.value;
  const keepLoggedIn = keepLoggedInInput.checked;

  if (!email.trim()) {
    emailErrorEl.textContent = "Please enter your email or username.";
    emailErrorEl.hidden = false;
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    emailErrorEl.textContent = "Please enter a valid email address.";
    emailErrorEl.hidden = false;
    return;
  }

  if (!password) {
    passwordErrorEl.textContent = "Please enter your password.";
    passwordErrorEl.hidden = false;
    return;
  }

  if (password.length < 6) {
    passwordErrorEl.textContent = "Password must be at least 6 characters long.";
    passwordErrorEl.hidden = false;
    return;
  }

  successEl.textContent = "Details verified successfully!";
  successEl.hidden = false;
  console.log("Login submitted:", { email, password, keepLoggedIn });
});
