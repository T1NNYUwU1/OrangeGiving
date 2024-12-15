import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
