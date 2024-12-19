import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
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
import VerifyEmail from "./components/VerifyEmail";


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<ProjectSearch />} />
              <Route path="/project" element={<ProjectPage />} />
              <Route path="/signup" element={<CreateAccount />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/create-account/verify-email" element={<VerifyEmail />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/forget-password/reset-password" element={<ResetPassword />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
