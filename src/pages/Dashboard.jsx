import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
  Avatar,
} from "@mui/material";
import {
  Search,
  PlayArrow,
  Person,
  ExitToApp,
  CheckCircle,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Mock data
const mockSongs = [
  { id: 1, title: "Blinding Lights", artist: "The Weeknd" },
  { id: 2, title: "Save Your Tears", artist: "The Weeknd" },
  { id: 3, title: "Stay", artist: "The Kid LAROI, Justin Bieber" },
  { id: 4, title: "Good 4 U", artist: "Olivia Rodrigo" },
  { id: 5, title: "Levitating", artist: "Dua Lipa" },
];

const Dashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [subscribedSongs, setSubscribedSongs] = useState([]);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubscribe = (song) => {
    if (!subscribedSongs.some((s) => s.id === song.id)) {
      setSubscribedSongs([...subscribedSongs, song]);
    }
  };

  const handleUnsubscribe = (songId) => {
    setSubscribedSongs(subscribedSongs.filter((song) => song.id !== songId));
  };

  const handleLogout = () => {
    // In a real app, you would clear auth state here
    navigate("/");
  };

  const filteredSongs = mockSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        {tabValue === 0 && (
          <Box>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search songs or artists..."
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                sx: { borderRadius: 4, backgroundColor: "white" },
              }}
              sx={{ mb: 3 }}
            />

            <List sx={{ width: "100%" }}>
              {filteredSongs.map((song) => (
                <Card
                  key={song.id}
                  variant="outlined"
                  sx={{ mb: 2, borderRadius: 2 }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {song.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {song.artist}
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleSubscribe(song)}
                        disabled={subscribedSongs.some((s) => s.id === song.id)}
                        sx={{ borderRadius: 2, padding: 1 }}
                      >
                        {subscribedSongs.some((s) => s.id === song.id)
                          ? "Subscribed"
                          : "Subscribe"}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </List>
          </Box>
        )}

        {tabValue === 1 && (
          <Box>
            {subscribedSongs.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  No subscriptions yet
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Search for songs and subscribe to them
                </Typography>
              </Box>
            ) : (
              <List sx={{ width: "100%" }}>
                {subscribedSongs.map((song) => (
                  <Card
                    key={song.id}
                    variant="outlined"
                    sx={{ mb: 2, borderRadius: 2 }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {song.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {song.artist}
                          </Typography>
                        </Box>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleUnsubscribe(song.id)}
                          sx={{ borderRadius: 2 }}
                        >
                          Remove
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </List>
            )}
          </Box>
        )}

        {tabValue === 2 && (
          <Box sx={{ maxWidth: 500, mx: "auto", textAlign: "center" }}>
            <Avatar sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}>
              <Person sx={{ fontSize: 50 }} />
            </Avatar>
            <Typography variant="h5" gutterBottom>
              John Doe
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              john.doe@example.com
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
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
