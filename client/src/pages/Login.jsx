import React, { useState } from "react";
import { loginUser } from "../services/api";

const Login = ({ onLogin, onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      const data = await loginUser({
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      onLogin(data.user);
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-phone">

        {/* Top Header */}
        <div className="auth-logo">
          <span className="logo-symbol">◈</span>
          <span>Nuzio</span>
          <span className="logo-ai">AI</span>
        </div>

        {/* Progress */}
        <div className="auth-progress">
          <span className="progress-active"></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Content */}
        <div className="auth-content">

          <div className="auth-eyebrow">
            WELCOME BACK
          </div>

          <h1>
            Good morning,
            <br />
            <em>Nuzio AI.</em>
          </h1>

          <p className="auth-description">
            Your personalized news briefing,
            <br />
            tailored around what matters to you.
          </p>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >

            <div className="input-group">
              <label>Email address</label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />
            </div>

            <div className="input-group">
              <div className="password-label">
                <label>Password</label>

                <button
                  type="button"
                  className="forgot-password"
                >
                  Forgot?
                </button>
              </div>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />
            </div>

            <button
              type="submit"
              className="auth-primary-btn"
            >
              Continue
              <span>→</span>
            </button>

          </form>

          <div className="auth-divider">
            <span></span>
            <small>OR</small>
            <span></span>
          </div>

          <button
            type="button"
            className="google-btn"
          >
            <span className="google-icon">G</span>
            Continue with Google
          </button>

          <p className="auth-switch">
            Don't have an account?

            <button
              type="button"
              onClick={onRegister}
            >
              Create one
            </button>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;