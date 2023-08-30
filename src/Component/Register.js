import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { css } from "@emotion/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/v1/auth/register",
        {
          name: name,
          email: email,
          password: password,
        }
      );
      console.log(response.data);
      navigate("/login"); // Navigate to the login page
    } catch (error) {
      console.log(error.response);
      // Handle error or display error message to the user
    }
  };
  const styles = {
    cardContainer: css`
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
      position: relative;
    `,
    card: css`
      max-width: 400px;
      padding: 20px;
      z-index: 1;
    `,
  };
  return (
   <div>
      <Header />
       <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
      <Card style={{ width: '400px', padding: '20px' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Register
          </Typography>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off" // Disable autofill
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off" // Disable autofill
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            autoComplete="new-password" // Disable autofill and suggest a new password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleRegister}
          >
            Register
          </Button>
          {/* <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate("/login")}
          >
            Login
          </Button> */}
        </CardContent>
      </Card>
    </div>
    </div>
  );
};

export default RegisterPage;
