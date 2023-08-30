// import React, { useState } from 'react';
// import { Card, CardContent, TextField, Button, Typography } from '@mui/material';
// import Header from './Header';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function Forgetpasssword() {
//   const [email, setEmail] = useState('');
//   const navigate = useNavigate();
//   const [resetStatus, setResetStatus] = useState('');
//   const user = JSON.parse(localStorage.getItem("user"));

//   // Helper function to validate email format
//   // const isValidEmail = (email) => {
//   //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   //   return emailRegex.test(email);
//   // };

//   const handlereset = async () => {
//     try {
//       const response = await axios.post(
//         'http://localhost:5000/v1/auth/forgot-password',{ email } // Include the email in the request body
        
//       );
      
//       console.log('Request Data:', { email });
//       navigate('/reset-password');
//       console.log("response ",response)
//       // ... (Handle the response and navigation logic if needed)
//     } catch (error) {
//       console.log(error.response);
//       // Handle error or display error message to the user
//     }
//   };

//   return (
//     <div>

//   <Header/>
//   <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
    
//     <Card style={{ width: '400px', margin: 'auto' }}>
//       <CardContent>
//         <Typography variant="h5" gutterBottom textAlign="center">
//           Change Password
//         </Typography>
//         <form>
//           <TextField
//             label="Email"
//             fullWidth
//             variant="outlined"
//             size="small"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             autoComplete="off"
//           />
//           {/* Optional: Show a message for invalid email format */}
//           {/* {!isValidEmail(email) && <Typography color="error">Invalid email format</Typography>} */}
//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             onClick={handlereset}
//             // disabled={!isValidEmail(email)}
//           >
//             Reset Password
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//     </div>
    
//   </div>
//   );
// }
import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// import { sendResetPasswordRequest } from './forgotPasswordSlice';
import { sendResetPasswordRequest } from '../Slices/forgotPasswordSlice';
import Header from './Header';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  // Selectors to access the forgotPassword state
  const isLoading = useSelector((state) => state.forgotPassword.isLoading);
  const isSuccess = useSelector((state) => state.forgotPassword.isSuccess);
  const isError = useSelector((state) => state.forgotPassword.isError);
  const errorMessage = useSelector((state) => state.forgotPassword.errorMessage);

  const handleReset = () => {
    // Dispatch the sendResetPasswordRequest action
    dispatch(sendResetPasswordRequest(email));
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
              Reset Password
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
                onClick={handleReset}
                disabled={isLoading || isSuccess}
              >
                {isLoading ? 'Sending...' : 'Reset Password'}
              </Button>
            </form>
            {isError && <div style={{ color: 'red' }}>{errorMessage}</div>}
            {isSuccess && <div style={{ color: 'green' }}>Reset request sent successfully.</div>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
