import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AccountPage from "./components/AccountPage.js";
import AccountSetting from "./components/AccountSetting.js";
import { AuthProvider } from "./components/AuthContext.js";
import CreateAccount from "./components/CreateAccount.js";
import Footer from "./components/Footer";
import ForgotPassword from "./components/ForgotPassword";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
import ProjectPage from "./components/ProjectPage.js";
import ProjectSearch from "./components/ProjectSeach.jsx";
import ResetPassword from "./components/ResetPassword.js";
import VerifyEmail from "./components/VerifyEmail";
import ProfilePage from "./components/ProfilePage.js";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/search" element={<ProjectSearch />} />
              <Route path="/project" element={<ProjectPage />} />
              <Route path="/signup" element={<CreateAccount />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/create-account/verify-email" element={<VerifyEmail />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/forget-password/reset-password" element={<ResetPassword />} />
              <Route path="/home/account-page" element={<AccountPage />} />
              <Route path="/home/account-page/account-setting" element={<AccountSetting />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
