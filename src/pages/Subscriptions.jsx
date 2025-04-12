import React, { useEffect, useState } from "react";
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
  Typography,
  Avatar,
} from "@mui/material";
import { getSubscriptionHandler } from "../apis";
function Subscriptions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [subscribedSongs, setSubscribedSongs] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const userdetailsStore = localStorage.getItem("userdetails");
        const email = JSON.parse(userdetailsStore)?.email;
        const response = await getSubscriptionHandler({ email });
        console.log("RESPONSE: ", response);
        setSubscribedSongs(response);
      } catch (error) {
        console.log("Error fetching subscriptions: ", error);
      }
    };
    fetchSubscriptions();
  }, []);

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

  return (
    <Box>
      {subscribedSongs.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No subscriptions yets
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
                    <Avatar sx={{ width: 80, height: 80 }}>
                      <img
                        src={song.img_url}
                        alt={song.title}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </Avatar>
                  </Box>
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
  );
}

export default Subscriptions;
