import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
} from "@mui/material";
import Header from "./Header";
// import axios from "axios";

function Resetpassword() {
  // debugger;
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const URLToken = new URLSearchParams(location.search).get("token");
  console.log("URLToken ", URLToken)
  const handleChangePassword = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/v1/auth/reset-password?token=${URLToken}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
         
          body: JSON.stringify({
            password,
          }),
         
        }
      );
      navigate('/login');
  // debugger;
      const data = await response.json(); 
 
      if (response.ok) {
        console.log("Password changed successfully.");
      
      } else {
        console.log("Password reset failed. Error:", data.message);

      }
    } catch (error) {
      console.log("Error:", error);
      
    }
  };

 const handleSubmit = (e) => {
  e.preventDefault();


  if (password !== confirmPassword) {
    setPasswordMatchError("Passwords do not match.");
    return; 
  }

  setPasswordMatchError(""); 
  
  // handleChangePassword();
};

  return (
    <div>
      <Header />
      <div 
          style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
        }}
      >
        <Card style={{ width: "400px", margin: "auto" }}>
          <CardHeader title="Change Password" />
          <CardContent>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <TextField
                  type="password"
                  id="password"
                  label="New Password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </div>
              <div className="form-group">
                <TextField
                  type="password"
                  id="confirmPassword"
                  label="Confirm Password"
                  variant="outlined"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </div>
              <div style={{ color: "red" }}>{passwordMatchError}</div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleChangePassword}
              >
                Change Password
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Resetpassword;