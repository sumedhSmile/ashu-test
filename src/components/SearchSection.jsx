import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import axios from "axios";

const SearchSection = () => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [songs, setSongs] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSearch = async () => {
    setSubmitted(true);

    try {
      // Prepare your request body
      const requestBody = {
        title: title.trim(),
        artist: artist.trim(),
        year: year.toString().trim(),
        album: album.trim(),
      };

      const response = await axios.post(
        "https://90lzb0z3hl.execute-api.ap-southeast-2.amazonaws.com/version_1/query_music",
        requestBody
      );
      console.log("response: ", response.data.results);
      // Make the API call using Axios or your preferred HTTP library
      // Assuming response data is the array of songs
      setSongs(response.data.results);
    } catch (error) {
      setSongs([]);

      console.error("Error fetching songs:", error);
    }
  };
  return (
    <Box>
      {/* Search Grid */}
      <Grid
        container
        spacing={2}
        style={{ backgroundColor: "white", padding: 15, borderRadius: 5 }}
      >
        <Grid xs={12} sm={6} md={5}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <TextField
            label="Year"
            variant="outlined"
            fullWidth
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <TextField
            label="Artist"
            variant="outlined"
            fullWidth
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <TextField
            label="Album"
            variant="outlined"
            fullWidth
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSearch}
            sx={{ height: "100%" }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>

      {/* Results */}

      <Box mt={4}>
        {!submitted ? (
          <Typography style={{ color: "black" }} variant="h6" align="center">
            No search yet
          </Typography>
        ) : songs.length === 0 ? (
          <Typography style={{ color: "black" }} variant="h6" align="center">
            No results found
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {songs.map((song) => (
              <Grid item xs={12} sm={6} md={4} key={song.id}>
                <Card>
                  <CardContent>
                    <img
                      src={song.img_url}
                      style={{ width: "100%", height: "auto" }}
                    />
                    <Typography variant="h6">{song.title}</Typography>
                    <Typography color="textSecondary">{song.artist}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default SearchSection;
