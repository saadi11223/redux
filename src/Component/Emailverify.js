// import React, { useState} from "react";
// import axios from 'axios';
// import { Card, CardContent, TextField, Button, Typography } from '@mui/material';
// import Header from './Header';
// import { useNavigate, useLocation } from 'react-router-dom';
// function Emailverify() {
//   const [email, setEmail] = useState('');
//   const [isEmailVerified, setIsEmailVerified] = useState(false);
//   const [verificationSent, setVerificationSent] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const URLToken = new URLSearchParams(location.search).get("token");
//   // console.log("URLToken ", URLToken)
//   // debugger;
//   const user = JSON.parse(localStorage.getItem("user"));
//   const handleSendVerificationEmail = async () => {

//     try {
//       // if (!user) return;
//       const response = await axios.post(
//         'http://localhost:5000/v1/auth/send-verification-email',email,
//         {
//           headers: {
//             Authorization: `Bearer ${user.tokens.access.token}`,
//           },
//         }
//       );
//       // navigate('/login');
//       const data = response.data;
//       console.log("data ",data)


//       // setIsEmailVerified(response.data.isVerified);
//     } catch (error) {
//       console.log(' email verification status:', error);
//     }
//   };

//   return (
    
//     <div>

//     <Header/>
//     <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
//       <Card style={{ width: '400px', margin: 'auto' }}>
//         <CardContent>
//           <Typography variant="h5" gutterBottom textAlign="center">
//             Email Verify
//           </Typography>
//           <form>
//             <TextField
//               label="Email"
//               fullWidth
//               variant="outlined"
//               size="small"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               autoComplete="off"
//             />
//             {/* Optional: Show a message for invalid email format */}
//             {/* {!isValidEmail(email) && <Typography color="error">Invalid email format</Typography>} */}
//             <Button
//               variant="contained"
//               color="primary"
//               fullWidth
//               onClick={ handleSendVerificationEmail}
//               // disabled={!isValidEmail(email)}
//             >
//               Email verification
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//       </div>
      
//     </div>
//   );
// }
// export default Emailverify;
// EmailVerify.js

import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';
import Header from './Header';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setEmailVerified, setEmailVerificationError } from '../Slices/emailVerifySlice';
import axios from 'axios';
function EmailVerify() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const URLToken = new URLSearchParams(location.search).get('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();

  const handleSendVerificationEmail = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/v1/auth/send-verification-email',
        email,
        {
          headers: {
            Authorization: `Bearer ${user.tokens.access.token}`,
          },
        }
      );

      if (response.data && response.data.success) {
        dispatch(setEmailVerified()); // Dispatch email verification success
      } else {
        dispatch(setEmailVerificationError('Email verification failed.')); // Dispatch email verification failure
      }
    } catch (error) {
      console.log('Email verification status:', error);
      dispatch(setEmailVerificationError('Email verification failed.'));
    }
  };

  return (
    <div>
      <Header />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
        }}
      >
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
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSendVerificationEmail}
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

export default EmailVerify;
