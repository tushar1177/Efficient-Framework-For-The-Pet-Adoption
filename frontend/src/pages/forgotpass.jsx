import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:8080/auth/forgot-password", { email });
      toast.success("Reset link sent to your email.");
    } catch (error) {
      toast.error("Error sending reset link.");
    }
  };

  return (
    <div>
      <h2>Forgot Password?</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
      <button onClick={handleSubmit}>Send Reset Link</button>
    </div>
  );
}

export default ForgotPassword;
