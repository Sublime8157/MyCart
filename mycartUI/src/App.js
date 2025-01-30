import React from "react";
import RegistrationForm from "./forms/registration.js";
import VerificationResult from "./views/verificationRegistrationResult.js";
import LoginForm from "./forms/login.js";
import EmailVerification from "./forms/emailVerification.js";
import Dashboard from "./views/dashboard.js";
import Admin from "./forms/adminLogin.js";  
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/verifyEmail" element={<EmailVerification />}/>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/verificationResult" element={<VerificationResult />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}
export default App;
