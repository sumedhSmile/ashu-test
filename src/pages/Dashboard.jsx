import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Search,
  PlayArrow,
  Person,
  ExitToApp,
  CheckCircle,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import SearchSection from "../components/SearchSection";
import ProfilePage from "./ProfilePage";
import Subscriptions from "./Subscriptions";

const Dashboard = () => {
  const [tabValue, setTabValue] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = () => {
      const userdetailsStore = localStorage.getItem("userdetails");
      if (!userdetailsStore) {
        navigate("/");
      }
    };
    fetchDetails();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "beige",
      }}
    >
      {/* App Bar */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Music Dashboard
          </Typography>
          <IconButton color="inherit">
            <Person />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Search Songs" icon={<Search />} iconPosition="start" />
          <Tab
            label="My Subscriptions"
            icon={<CheckCircle />}
            iconPosition="start"
          />
          <Tab label="Profile" icon={<Person />} iconPosition="start" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ p: 3, flexGrow: 1 }}>
        {tabValue === 0 && <SearchSection />}

        {tabValue === 1 && <Subscriptions />}

        {tabValue === 2 && <ProfilePage />}
      </Box>
    </Box>
  );
};

export default Dashboard;
