import React, { useState} from "react";
import axios from 'axios';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';
import Header from './Header';
import { useNavigate, useLocation } from 'react-router-dom';
function VerifiedEmail() {
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [email, setEmail] = useState('')
    const location = useLocation();
    const URLToken = new URLSearchParams(location.search).get("token");
  
    const handleSendVerificationEmail = async () => {
      try {
        const response = await axios.post(
          `http://localhost:5000/v1/auth/verify-email?token=${URLToken}`
        );
  
        if (response.data && response.data.success) {
          setIsEmailVerified(true);
        } else {
          setIsEmailVerified(false);
        }
      } catch (error) {
        console.log("Email verificatioaaaqwstatus:", error);
        setIsEmailVerified(false);
      }
    };
    
    return (
      
      <div> 
  
      <Header/>
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
        
        <Card style={{ width: '400px', margin: 'auto' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom textAlign="center">
              Email Verify
            </Typography>
            <form>
              <TextField
                label="Email"
                fullWidth
                variant="outlined"
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
              {/* Optional: Show a message for invalid email format */}
              {/* {!isValidEmail(email) && <Typography color="error">Invalid email format</Typography>} */}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={ handleSendVerificationEmail}
                // disabled={!isValidEmail(email)}
              >
                Email verification
              </Button>
            </form>
          </CardContent>
        </Card>
        </div>
        
      </div>
    );
  }
  

export default VerifiedEmail