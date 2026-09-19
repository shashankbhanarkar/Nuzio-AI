import React, { useState } from "react";
import { registerUser } from "../services/api";

const Register = ({ onRegister, onLogin }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      await registerUser(form);

      // Register → Login
      onRegister();
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Registration failed"
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
            GET STARTED
          </div>

          <h1>
            Create your
            <br />
            <em>Nuzio account.</em>
          </h1>

          <p className="auth-description">
            Let's get to know you before we
            <br />
            build your personalized briefing.
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

            {/* Name */}
            <div className="input-group">
              <label>Full name</label>

              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="input-group">
              <label>Email address</label>

              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="input-group">
              <label>Password</label>

              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="auth-primary-btn"
            >
              Create account
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
            Already have an account?

            <button
              type="button"
              onClick={onLogin}
            >
              Login
            </button>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;