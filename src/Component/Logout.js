import React, { useState, useEffect } from 'react';
import { Button, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { PowerSettingsNew } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  button: {
    position: 'relative',
    overflow: 'hidden',
    transition: 'background-color 0.3s ease',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: theme.palette.primary.main,
      opacity: 0,
      transition: 'opacity 0.3s ease',
    },
    '&:hover': {
      backgroundColor: 'transparent',
      '&:before': {
        opacity: 1,
      },
    },
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const LogoutButton = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userData, setUserData] = useState(null); // State to store user data

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(()=>{
      if(!user){
        navigate('/home')
      }
    },[])

  useEffect(() => {
    // Retrieve user data from local storage on component mount
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const logoutUser = async () => {
    try {
      // Refresh the token first
      const refreshResponse = await axios.post('http://localhost:5000/v1/auth/refresh-tokens', {
        refreshToken: userData.refreshToken, // Access refreshToken from user data in local storage
      });

      // Store the updated token in local storage
      const updatedUserData = { ...userData, accessToken: refreshResponse.data.accessToken };
      localStorage.setItem('userData', JSON.stringify(updatedUserData));

      // Logout using the updated token
      const logoutResponse = await axios.post('http://localhost:5000/v1/auth/logout', {
        refreshToken:  " "
      });

      console.log(logoutResponse.data);
      setIsLoggingOut(true);
      navigate('/home');
    } catch (error) {
      console.log(error.response);
      // Handle the error here, display an error message to the user, or perform any other necessary actions.
    }
  };

  return (
    <Box className={classes.container}>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        disabled={isLoggingOut}
        onClick={logoutUser}
      >
        {isLoggingOut ? (
          'Logging Out...'
        ) : (
          <>
            <PowerSettingsNew className={classes.icon} />
            Logout
          </>
        )}
      </Button>
    </Box>
  );
};

export default LogoutButton;
