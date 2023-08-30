import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
  Link,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import authService from '../services/authService';
import {
  AlternateEmail,
  Lock,
  Facebook,
  Twitter,
  Instagram,
  VpnKey,
} from "@mui/icons-material";
import Header from "./Header";
import { useNavigate } from "react-router-dom"; // Updated import

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 400,
    margin: "auto",
    padding: 20,
    animation: "fadeIn 1s",
  },
  "@keyframes fadeIn": {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },
}));

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use useNavigate to get the navigation function

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const user = await authService.login(username, password);
      // Handle successful login, update state or dispatch an action
      navigate('/crud'); // Use navigate function for navigation
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error);
    }
  };

  const classes = useStyles();

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
        <Card style={{ width: "400px", padding: "20px" }}>
          <CardContent>
            <Typography variant="h5" gutterBottom textAlign={"center"}>
              Login Page
            </Typography>
            <form>
              <TextField
                className={classes.formField}
                label="Email"
                fullWidth
                variant="outlined"
                size="small"
                value={username}
                onChange={handleUsernameChange}
                autoComplete="off"
                InputProps={{
                  startAdornment: <AlternateEmail />,
                }}
              />
              <TextField
                className={classes.formField}
                label="Password"
                fullWidth
                variant="outlined"
                size="small"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                autoComplete="off"
                InputProps={{
                  startAdornment: <Lock />,
                }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleLogin}
              >
                Login
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/forgot-password" variant="body2" startIcon={<VpnKey />}>
                    Forgot Password?
                  </Link>
                </Grid>
              </Grid>
            </form>
            <Grid container className={classes.socialIcons}>
              <Grid item>
                <Link href="#">
                  <Facebook className={classes.socialIcon} />
                </Link>
              </Grid>
              <Grid item>
                <Link href="#">
                  <Twitter className={classes.socialIcon} />
                </Link>
              </Grid>
              <Grid item>
                <Link href="#">
                  <Instagram className={classes.socialIcon} />
                </Link>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
