import React from "react";
import "./LoginForm.css"; // Import LoginForm-specific styles

function LoginForm() {
  return (
    <div className="login-form">
      <h3 className="form-title">Get start</h3>
      <div className="form-content">
        <h4>Login</h4>
        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <div className="form-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="/" className="forgot-password">
              Forget Password
            </a>
          </div>
          <button className="submit-btn">Login</button>
          <p>
            Don’t have an account? <a href="/">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;

