import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { Card, CardContent, TextField } from '@mui/material';
import axios from "axios";
import { useNavigate} from "react-router-dom"; // Import Link from react-router-dom


function Header() {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Check if the user is authenticated
  const isAuthenticated = !!JSON.parse(localStorage.getItem('user'));

  const handleRegister = () => {
    // Handle registration here
    // For simplicity, I'm just logging the registration attempt
    console.log('Register button clicked');
  };

  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  const logoutUser = async () => {
    try {
      const response = await axios.post('http://localhost:5000/v1/auth/logout', {
        refreshToken: user.tokens.refresh.token, 
      });
      const data=response
      console.log("data",data)
      localStorage.removeItem('user');
      // console.log()


      setIsLoggingOut(true);
      navigate('/login');
    } catch (error) {
      console.log(error.response);
      // Handle the error here, display an error message to the user, or perform any other necessary actions.
    }
  };

  return (
    <div>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              aria-label="user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenUserMenu}
              color="inherit"
              sx={{ display: { xs: 'flex', md: 'none' } }}
            >
              <PersonIcon />
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1 }} />
            {isEmailVerified ? (
                    <MenuItem >
                      <Link to="/send-verification-email" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Email Verify
                      </Link>
                    </MenuItem>
                  ) : (
                    <MenuItem >
                      <Link to="/send-verification-email" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Verify Email
                      </Link>
                    </MenuItem>
                  )}

            {isAuthenticated ? (
              <div>
                {/* Show the Logout button if the user is authenticated */}
                <Button color="inherit" href="/" onClick={logoutUser}>
                  Logout
                </Button>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenUserMenu}
                  color="inherit"
                >
                  <PersonIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      {setting}
                    </MenuItem>
                  ))}
             
                </Menu>
              </div>
            ) : (
              <div>
                {/* Show the Register button if the user is not authenticated */}
                <Tooltip title="Register">
                  <Button color="inherit" href="/register">
                    Register
                  </Button>
                </Tooltip>
                <Tooltip title="Login">
                  <Button color="inherit" href="/login">
                    Login
                  </Button>
                </Tooltip>
              </div>
            )}

            {/* Add the settings menu in the main Toolbar */}
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  {page}
                </MenuItem>
              ))} */}
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>

      <img
        src="/Images/Js.jpg"
        alt="Image"
        style={{ width: '100%', height: '50%' }}
      />

      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
        {/* <Card style={{ width: '400px', padding: '20px' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Register Now 
            </Typography>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              // Add more TextField properties as needed
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              // Add more TextField properties as needed
            />
            <TextField
              label="Password"
              fullWidth
              margin="normal"
              type="password"
              // Add more TextField properties as needed
            />
            <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
              Register
            </Button>
            {/* <Button variant="contained" color="primary" fullWidth onClick={() => console.log('Login button clicked')}>
              Login
            </Button> */}
          {/* </CardContent> */}
        {/* </Card> */} */
      </div>
    </div>
  );
}

export default Header;
