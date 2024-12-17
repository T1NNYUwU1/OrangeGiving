import axios from "axios"; // Import Axios
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CreateAccount.css";

function CreateAccount() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAddress: "",
    country: "",
    state: "",
    postalCode: "",
    password: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      alert("You must accept the terms and conditions.");
      return;
    }

    try {
      // Call signup API
      const response = await axios.post("http://localhost:5000/users/signup", {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone_number: formData.phone,
        street_address: formData.streetAddress,
        country: formData.country,
        state: formData.state,
        postal_code: formData.postalCode,
        password: formData.password,
      });

      alert(response.data.message);
      navigate("/create-account/verify-email"); // Redirect to verify email page
    } catch (error) {
      console.error("Error creating account:", error.response?.data.message);
      alert(error.response?.data.message || "Something went wrong.");
    }
  };

  return (
    <div className="create-account-container">
      <div className="create-account-form">
        <h3 className="form-title">Create Account</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Street Address"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Postal_code"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label className="terms-label">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              required
            />{" "}
            Accept all{" "}
            <Link to="/terms" className="link">
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="link">
              Privacy Policy
            </Link>
          </label>
          <button type="submit" className="submit-btn">
            Create Account
          </button>
        </form>
        <p className="already-account">
          Already have account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default CreateAccount;

