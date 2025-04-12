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
import { loginHandler } from "../apis";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : {
          user_name: formData.user_name,
          email: formData.email,
          password: formData.password,
        };

    console.log("Payload:", payload);
    if (isLogin) {
      const response = await loginHandler(payload);
      if (response) {
        navigate("/dashboard");
      } else {
        alert("Invalid Credentials");
      }
    }

    // navigate("/dashboard");
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
            <Grid item>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "primary.main",
                  transition: "0.3s",
                }}
              >
                {isLogin ? "Login" : "Sign Up"}
              </Typography>
            </Grid>

            {/* Username Field (only in Sign Up) */}
            {!isLogin && (
              <Grid item sx={{ width: "100%" }}>
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                />
              </Grid>
            )}

            {/* Email Field */}
            <Grid item sx={{ width: "100%" }}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>

            {/* Password Field */}
            <Grid item sx={{ width: "100%" }}>
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>

            <Grid item sx={{ width: "100%" }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                {isLogin ? "Login" : "Sign Up"}
              </Button>
            </Grid>

            <Grid item>
              <Divider sx={{ width: "100%" }} />
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
                    color: "#1976d2",
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
