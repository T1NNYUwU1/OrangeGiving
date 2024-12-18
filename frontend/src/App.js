import React from "react";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import AccountSetting from "./components/AccountSetting.js";
import { AuthProvider } from "./components/AuthContext.js";
import CreateAccount from "./components/CreateAccount.js";
import Footer from "./components/Footer";
import ForgotPassword from "./components/ForgotPassword";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
import ProfilePage from "./components/ProfilePage.js";
import ProjectPage from "./components/ProjectPage.js";
import ProjectSearch from "./components/ProjectSeach.jsx";
import ResetPassword from "./components/ResetPassword.js";
import ThankYou from "./components/ThankYouPage.js";
import VerifyEmail from "./components/VerifyEmail.js";

function AppContent() {
  const location = useLocation(); // Use `useLocation` within a child component of Router

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/search" element={<ProjectSearch />} />
          <Route path="/project" element={<ProjectPage />} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create-account/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/forget-password/reset-password" element={<ResetPassword />} />
          <Route path="/home/profile/account-setting" element={<AccountSetting />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
      {/* Conditionally render Footer */}
      {location.pathname !== "/" && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
