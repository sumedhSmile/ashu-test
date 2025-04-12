import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Typography,
  Avatar,
} from "@mui/material";
import { Person, ExitToApp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const [userdetails, setUserdetails] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDetails = () => {
      const userdetailsStore = localStorage.getItem("userdetails");
      console.log("FETCHED: ", JSON.parse(userdetailsStore));
      setUserdetails(JSON.parse(userdetailsStore));
    };
    fetchDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userdetails");
    navigate("/");
  };
  return (
    <Box sx={{ maxWidth: 500, mx: "auto", textAlign: "center" }}>
      <Avatar sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}>
        <Person sx={{ fontSize: 50 }} />
      </Avatar>
      <Typography variant="h5" color="text.secondary" gutterBottom>
        {userdetails && userdetails?.username}
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        {userdetails && userdetails?.email}
      </Typography>
      <Divider sx={{ my: 3 }} />
      <Button
        variant="contained"
        color="error"
        startIcon={<ExitToApp />}
        onClick={handleLogout}
        sx={{ borderRadius: 2 }}
      >
        Logout
      </Button>
    </Box>
  );
}

export default ProfilePage;
