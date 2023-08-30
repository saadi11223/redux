// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Button,
// } from "@mui/material";
// import { useNavigate, useParams } from "react-router-dom";
// import Header from "./Header";

// function Edit() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [role, setRole] = useState(" ");
//   const user = JSON.parse(localStorage.getItem("user"));
//   const navigate = useNavigate();
//   const params = useParams();
//   const id = params.id;

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/v1/users/${id}`, {
//         headers: {
//           Authorization: `Bearer ${user.tokens.access.token}`,
//         },
//       });

//       const data = response.data;
//       setName(data.name);
//       setEmail(data.email);
//       setRole(data.role);
//       console.log("data", data);
//       // console.log("Set Name",setName)
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   async function Update(e) {
//     e.preventDefault();
//     const updatedUserData = {
//       name: name,
//       email: email,
//       role: setRole,
//     };

//     try {
//       const response = await axios.patch(
//         `http://localhost:5000/v1/users/${id}`,
//         updatedUserData,
//         {
//           headers: {
//             Authorization: `Bearer ${user.tokens.access.token}`,
//           },
        
//         }
//       );
//       const data = response.data;
//       console.log("data", data);
//       navigate("/home");
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <div >
//     <Header/>
//     <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
//     <Card style={{ width: '400px', padding: '20px' }}>
//       <CardContent>
//         <Typography variant="h5" gutterBottom>
//           Edit Profile
//         </Typography>
//         <form noValidate autoComplete="off">
//           <TextField
//             label="Name"
//             variant="outlined"
//             fullWidth
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <TextField
//             label="Email"
//             variant="outlined"
//             fullWidth
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           {/* Add more TextField components or any other form elements here */}
          
//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             onClick={Update}
//           >
//             Update User
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//     </div>
//     </div>
//   );
// }

// export default Edit;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDataSuccess, fetchUserDataFailure } from "../Slices/userSlice"; 

function Edit() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(" ");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/v1/users/${id}`, {
        headers: {
          Authorization: `Bearer ${user.tokens.access.token}`,
        },
      });

      const data = response.data;
      setName(data.name);
      setEmail(data.email);
      setRole(data.role);
      console.log("data", data);
      dispatch(fetchUserDataSuccess(data)); // Dispatch the data to Redux
    } catch (error) {
      console.log(error);
      dispatch(fetchUserDataFailure(error)); // Dispatch the error to Redux
    }
  };

  async function Update(e) {
    e.preventDefault();
    const updatedUserData = {
      name: name,
      email: email,
      role: setRole,
    };

    try {
      const response = await axios.patch(
        `http://localhost:5000/v1/users/${id}`,
        updatedUserData,
        {
          headers: {
            Authorization: `Bearer ${user.tokens.access.token}`,
          },
        }
      );
      const data = response.data;
      console.log("data", data);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Header />
      <div>
        <Card style={{ width: "400px", padding: "20px" }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Edit Profile
            </Typography>
            <form noValidate autoComplete="off">
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* Add more TextField components or any other form elements here */}

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={Update}
              >
                Update User
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Edit;
