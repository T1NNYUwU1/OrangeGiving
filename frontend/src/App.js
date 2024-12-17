import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext.js";
import CreateAccount from "./components/CreateAccount.js";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
import ProjectPage from "./components/ProjectPage.js";
import ProjectSearch from "./components/ProjectSeach.jsx";
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
              <Route path="/" element={<LoginForm />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/search" element={<ProjectSearch />} />
              <Route path="/project" element={<ProjectPage />} />
              <Route path="/signup" element={<CreateAccount />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/create-account/verify-email" element={<VerifyEmail />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
