import { useState } from "react";
import { Link } from "react-router-dom";
import PerformanceMeeting from "../assets/PerformanceMeeting.jpeg";
import "../styles/Register.css";
import {
  UserIcon,
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  GoogleIcon,
  GitHubIcon,
  AppleIcon,
} from "../components/icons/Icons";

const API_BASE_URL = "http://localhost:5000";

function Login() {
  const [showPw, setShowPw] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [step, setStep] = useState("email");
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loginName, setLoginName] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

  const handleLogin = async () => {
    const newErrors = {};

    if (!loginName.trim()) {
      newErrors.loginName = "Name is required";
    }

    if (!loginEmail.trim()) {
      newErrors.loginEmail = "Email is required";
    } else if (!emailRegex.test(loginEmail.trim())) {
      newErrors.loginEmail = "Enter a valid email address";
    }

    if (!loginPassword.trim()) {
      newErrors.loginPassword = "Password is required";
    } else if (!passwordRegex.test(loginPassword)) {
      newErrors.loginPassword =
        "Password must be at least 6 characters and include letters and numbers";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: loginName,
          email: loginEmail,
          password: loginPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || "Login successful");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong while logging in");
    }
  };

  const handleSendOtp = async () => {
    const newErrors = {};

    if (!forgotEmail.trim()) {
      newErrors.forgotEmail = "Email is required";
    } else if (!emailRegex.test(forgotEmail.trim())) {
      newErrors.forgotEmail = "Enter a valid email address";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || "OTP sent to email");
        setStep("otp");
      } else {
        alert(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Send OTP error:", error);
      alert("Something went wrong while sending OTP");
    }
  };

  const handleVerifyOtp = async () => {
    const newErrors = {};

    if (!/^\d{6}$/.test(otp)) {
      newErrors.otp = "OTP must be exactly 6 digits";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: forgotEmail,
          otp: otp,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || "OTP verified");
        setStep("newPassword");
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error("Verify OTP error:", error);
      alert("Something went wrong while verifying OTP");
    }
  };

  const handleSavePassword = async () => {
    const newErrors = {};

    if (!newPassword.trim()) {
      newErrors.newPassword = "Password is required";
    } else if (!passwordRegex.test(newPassword)) {
      newErrors.newPassword =
        "Password must be at least 6 characters and include letters and numbers";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: forgotEmail,
          otp: otp,
          newPassword: newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setShowForgot(false);
        setStep("email");
        setForgotEmail("");
        setOtp("");
        setNewPassword("");
        setErrors({});
        alert(data.message || "Password updated. Now login with your new password.");
      } else {
        alert(data.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      alert("Something went wrong while updating password");
    }
  };

  const handleCloseForgot = () => {
    setShowForgot(false);
    setStep("email");
    setForgotEmail("");
    setOtp("");
    setNewPassword("");
    setErrors({});
  };

  return (
    <div className="reg-root">
      <div className="reg-card">
        <div className="reg-photo">
          <img
            src={PerformanceMeeting}
            alt="Login visual"
            className="reg-photo-img"
          />
          <div className="reg-photo-overlay" />
          <div className="reg-photo-content">
            <div>
              <div className="reg-brand-name">Project Management</div>
              <div className="reg-brand-tagline">
                Project management made easy - plan, track, and succeed with confidence.
              </div>
            </div>
          </div>
        </div>

        <div className="reg-form-side">
          <h1>Welcome</h1>
          <p className="reg-form-tagline">Sign in to your account</p>

          <div className="reg-field">
            <span className="reg-icon"><UserIcon /></span>
            <input
              type="text"
              placeholder="Full Name"
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
            />
          </div>
          {errors.loginName && <div className="reg-error">{errors.loginName}</div>}

          <div className="reg-field">
            <span className="reg-icon"><MailIcon /></span>
            <input
              type="email"
              placeholder="Email Address"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          {errors.loginEmail && <div className="reg-error">{errors.loginEmail}</div>}

          <div className="reg-field">
            <span className="reg-icon"><LockIcon /></span>
            <input
              type={showPw ? "text" : "password"}
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button
              type="button"
              className="reg-eye-btn"
              onClick={() => setShowPw((prev) => !prev)}
              aria-label={showPw ? "Hide password" : "Show password"}
            >
              {showPw ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          {errors.loginPassword && <div className="reg-error">{errors.loginPassword}</div>}

          <button className="reg-btn" type="button" onClick={handleLogin}>
            Sign In
          </button>

          <button
            type="button"
            className="reg-forgot-btn"
            onClick={() => setShowForgot(true)}
          >
            Forgot password?
          </button>

          <div className="reg-divider">
            <div className="reg-divider-line" />
            <span>Or continue with</span>
            <div className="reg-divider-line" />
          </div>

          <div className="reg-socials">
            <button className="reg-social-btn" type="button" aria-label="Google">
              <GoogleIcon />
            </button>
            <button className="reg-social-btn" type="button" aria-label="GitHub">
              <GitHubIcon />
            </button>
            <button className="reg-social-btn" type="button" aria-label="Apple">
              <AppleIcon />
            </button>
          </div>
        </div>
      </div>

      {showForgot && (
        <div className="forgot-modal-backdrop" onClick={handleCloseForgot}>
          <div className="forgot-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="forgot-modal-close"
              onClick={handleCloseForgot}
            >
              ×
            </button>

            <div className="forgot-stepper">
              <span className={step === "email" ? "active" : ""}>1</span>
              <span className={step === "otp" ? "active" : ""}>2</span>
              <span className={step === "newPassword" ? "active" : ""}>3</span>
            </div>

            <h2>Reset Password</h2>
            <p className="forgot-modal-text">
              Enter your email, verify the 6-digit code, then create a new password.
            </p>

            {step === "email" && (
              <>
                <div className="reg-field">
                  <span className="reg-icon"><MailIcon /></span>
                  <input
                    type="email"
                    placeholder="Enter your Gmail"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                  />
                </div>
                {errors.forgotEmail && <div className="reg-error">{errors.forgotEmail}</div>}
                <button className="reg-btn" type="button" onClick={handleSendOtp}>
                  Send OTP
                </button>
              </>
            )}

            {step === "otp" && (
              <>
                <div className="reg-field">
                  <span className="reg-icon"><LockIcon /></span>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  />
                </div>
                {errors.otp && <div className="reg-error">{errors.otp}</div>}
                <button className="reg-btn" type="button" onClick={handleVerifyOtp}>
                  Verify OTP
                </button>
              </>
            )}

            {step === "newPassword" && (
              <>
                <div className="reg-field">
                  <span className="reg-icon"><LockIcon /></span>
                  <input
                    type={showPw ? "text" : "password"}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="reg-eye-btn"
                    onClick={() => setShowPw((prev) => !prev)}
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                    {showPw ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                {errors.newPassword && <div className="reg-error">{errors.newPassword}</div>}
                <button className="reg-btn" type="button" onClick={handleSavePassword}>
                  Update Password
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;