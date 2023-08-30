// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Card, CardContent, Typography,Grid,CardMedia } from '@mui/material';
// import { useParams } from 'react-router-dom';
// import CardActions from '@mui/material/CardActions';
// // import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';


// export default function View() {
//     const [userData, setUserData] = useState('');
//     const user = JSON.parse(localStorage.getItem("user"));
//     useEffect(() => {
//       fetchUserData();
//     }, []);

//    const params = useParams()
//    const id = params.id;

//     const fetchUserData = async () => {
//         try {
//           const response = await axios.get(`http://localhost:5000/v1/users/${id}`, {
//             headers: {
//               Authorization: `Bearer ${user.tokens.access.token}`,
//             },
//           });
//           const data = response.data;
//           setUserData(data);
//           console.log("data", data);
//         } catch (error) {
//           console.log(error);
//         }
//       };
//       // const UserCard = ({ userData }) => {
       
//       return (
//         // <Grid container justifyContent="center" >
// <Card>
//   <CardContent style={{ textAlign: 'center' }}>
//     <Typography gutterBottom variant="h5" component="div">
//       {/* Content */}
//     </Typography>
//     <Typography variant="body2" color="text.secondary">
//       {userData.name}
//     </Typography>
//     <Typography variant="body2" color="text.secondary">
//       {userData.email}
//     </Typography>
//   </CardContent>
//   <CardActions>
//     {/* Actions */}
//   </CardActions>
// </Card>

// // </Grid>
//       );
//     }
//     // <div >
//     //   <Card>
//     //     <CardContent>
//     //       {userData && (
//     //         <>
//     //           <Typography variant="h5" component="h2">
//     //             {userData.name}
//     //           </Typography>
//     //           <Typography color="textSecondary" gutterBottom>
//     //             {userData.email}
//     //           </Typography>
//     //         </>
//     //       )}
//     //     </CardContent>
//     //   </Card>
//     // </div>
  
  
  
import React, { useEffect,useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDataSuccess, fetchUserDataFailure } from "../Slices/userSlice"; // Import your Redux actions

export default function View() {
  const [userData, setUserData] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    fetchUserData();
  }, []);

  const params = useParams();
  const id = params.id;

  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/v1/users/${id}`, {
        headers: {
          Authorization: `Bearer ${user.tokens.access.token}`,
        },
      });
      const data = response.data;
      setUserData(data);
      console.log("data", data);
      dispatch(fetchUserDataSuccess(data)); // Dispatch the data to Redux
    } catch (error) {
      console.log(error);
      dispatch(fetchUserDataFailure(error)); // Dispatch the error to Redux
    }
  };

  return (
    <div>
      <Header />
      <div>
        <Card>
          <CardContent style={{ textAlign: "center" }}>
            <Typography gutterBottom variant="h5" component="div">
              {userData.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {userData.email}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
