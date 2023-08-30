import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Header from "./Header";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import Link from react-router-dom

export default function Home() {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/v1/users", 

      {
        headers: {
          Authorization: `Bearer ${user.tokens.access.token}`,
        },
      });
      const data = response.data.results;
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddUser = () => {
    navigate("/crud");
  };

  // Create a new function to handle view user
  const handleViewUser = (id) => {
    navigate(`/view/${id}`);
  };
  const handleEditUser = (id) => {
    
    if (user && user.user.role === "admin") 
    {
      navigate(`/edit/${id}`);
    }
  };


  // const handleDeleteUser = (id) => {
  //   navigate(`/delete/${id}`);
  // };
  // debugger;
  const handleDeleteUser = async (id) => {
    if ( 
      user && user.user.role == 'admin')
    try {
      const response = await axios.delete(`http://localhost:5000/v1/users/${id}`, {
        headers: {
          Authorization: `Bearer ${user.tokens.access.token}`,
        },
      });
      console.log("User deleted successfully");
      // Now, fetch updated user data after deletion
      fetchUserData();
    } catch (error) {
      console.log(error);
    }
  };
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
      <Header />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1 }}>
        <Button variant="contained" color="primary" onClick={handleAddUser} style={{ color: "white" }}>
          Add New User
        </Button>
        {/* <Button variant="contained" color="primary" onClick={logoutUser} style={{ color: "white" }}>
          Logout
        </Button> */}

        <TableContainer>
          {/* ... (table code) */}
          <TableBody>
            {userData.map((i, index) => (
              <TableRow key={index} style={{ backgroundColor: "grey" }}>
                <TableCell style={{ color: "white" }}>{index + 1}</TableCell>
                <TableCell style={{ color: "white" }}>{i.name}</TableCell>
                <TableCell style={{ color: "white" }}>{i.email}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Visibility />}
                    style={{ color: "white" }}
                    onClick={() => handleViewUser(i.id)}
                  >
                    View
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Edit />}
                    style={{ color: "white" }}
                    onClick={() => handleEditUser(i.id)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<Delete />}
                    style={{ color: "white" }}
                    onClick={() => handleDeleteUser(i.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableContainer>
      </div>
    </div>
  );
}