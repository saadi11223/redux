// import React, { useEffect, useState } from "react";
// import {
//   Button,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Card,
//   CardContent,
//   // TextField,
//   // Button,
//   Typography,
// } from "@mui/material";
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';
// import Header from "./Header";

// export default function Crud() {

//   const [showFields, setShowFields] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");
//   // const [users, setUsers] = useState([]);
//   const navigate = useNavigate();
//   const getToken = JSON.parse(localStorage.getItem('user'));
  
//   console.log("getToken",getToken)

//   useEffect(()=>{
//           if(!getToken){
//             navigate('/Login')
//           }
//         },[])
//   const handleCreateUser = async () => {
//     try {
//         const response = await axios.post(
//         "http://localhost:5000/v1/users",
//         {
//           name: name,
//           email: email,
//           password: password,
//           role: role,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${getToken.tokens.access.token}`, // Include the encoded authentication token in the request headers
//           },
//         }
//       );

//       console.log("User created:", response.data);
//       navigate('/home')
//       // Handle success or display success message to the user
//     }  
//     catch (error) {
//       if (error.response) {
//         console.log("Error creating user:", error.response);
//       } else {
//         console.log("Error creating user:", error);
//       }
//       // Handle error or display error message to the user
//     }
//   };
//   const handleClickCreateUser = () => {
//     setShowFields(true);
//   };

//   return (
//     <div>
//       <Header />
     
//       <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
      
//         {showFields ? (
//           <Card  style={{ width: '400px', padding: '20px' }}>
//           {/* <Button
//               variant="contained"
//               color="primary"
//               onClick={handleCreateUser}
//               style={{ marginTop: "20px" }}
//             >
//               Create User
//             </Button> */}
//           <CardContent>
//           <Typography variant="h5" gutterBottom  textAlign={"center"}>
//             Create a New User
//           </Typography>
//             {/* TextField components inside the Card */}
//             <TextField
//               label="Name"
//               fullWidth
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               autoComplete="off"
//             />
//             <TextField
//               label="Email"
//               fullWidth
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               autoComplete="off"
//             />
//             <TextField
//               label="Password"
//               fullWidth
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               autoComplete="off"
//               type="password"
//             />
//             <TextField
//               label="Role"
//               fullWidth
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               autoComplete="off"
//             />
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleCreateUser}
//               style={{ marginTop: "20px" }}
//             >
//               Create User
//             </Button>
//             </CardContent>
//           </Card>
//         ) : (
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleClickCreateUser}
//           >
//             Create User
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Button, TextField, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { createUserSuccess, createUserFailure } from "../Slices/userSlice" // Import your Redux actions
import { fetchUserData } from "../Slices/userSlice"; // Import your Redux actions

export default function Crud() {
  const [showFields, setShowFields] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  const getTokenFromLocalStorage = localStorage.getItem("user");
  const getToken = getTokenFromLocalStorage
    ? JSON.parse(getTokenFromLocalStorage)
    : null;
console.log("userdata ",userData)
  const handleCreateUser = async () => {
    try {
      const token = getToken?.tokens?.access?.token;

      if (!token) {
        console.log("Token is not available.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/v1/users",
        {
          name: name,
          email: email,
          password: password,
          role: role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("User created:", response.data.message);
      navigate("/home");
      dispatch(createUserSuccess());

      setName("");
      setEmail("");
      setPassword("");
      setRole("");
      setShowFields(false);
    } catch (error) {
      console.log("Error creating user:", error);
      dispatch(createUserFailure(error));
    }
  };

  const handleClickCreateUser = () => {
    setShowFields(true);
  };

  return (
    <div>
      <Header />
      <div>
        {showFields ? (
          <Card style={{ width: "400px", padding: "20px" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom textAlign={"center"}>
                Create a New User
              </Typography>
              <TextField
                label="Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="off"
              />
              <TextField
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
              <TextField
                label="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
                type="password"
              />
              <TextField
                label="Role"
                fullWidth
                value={role}
                onChange={(e) => setRole(e.target.value)}
                autoComplete="off"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateUser}
                style={{ marginTop: "20px" }}
              >
                Create User
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickCreateUser}
          >
            Create User
          </Button>
        )}
      </div>
    </div>
  );
}
