import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post(`http://localhost:8080/auth/reset-password/${token}`, { newPassword });
      toast.success("Password successfully updated.");
    } catch (error) {
      toast.error("Failed to reset password.");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" />
      <button onClick={handleSubmit}>Reset Password</button>
    </div>
  );
}

export default ResetPassword;
