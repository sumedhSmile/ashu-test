import React, { useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  Container,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would validate credentials here
    // For now, just navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: "100%",
          borderRadius: 4,
          boxShadow: "0px 8px 24px rgba(0,0,0,0.1)",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} direction="column" alignItems="center">
            {/* Header */}
            <Grid item>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: isLogin ? "primary.main" : "secondary.main",
                  transition: "0.3s",
                }}
              >
                {isLogin ? "Login" : "Sign Up"}
              </Typography>
            </Grid>

            {/* Email Field */}
            <Grid item sx={{ width: "100%" }}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            {/* Password Field */}
            <Grid item sx={{ width: "100%" }}>
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item sx={{ width: "100%" }}>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: "1.1rem",
                }}
              >
                {isLogin ? "Login" : "Create Account"}
              </Button>
            </Grid>

            {/* Toggle Section */}
            <Grid item>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <span
                  onClick={() => setIsLogin(!isLogin)}
                  style={{
                    color: isLogin ? "#1976d2" : "#9c27b0",
                    cursor: "pointer",
                    fontWeight: 600,
                    textDecoration: "underline",
                  }}
                >
                  {isLogin ? "Sign Up" : "Login"}
                </span>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AuthForm;
