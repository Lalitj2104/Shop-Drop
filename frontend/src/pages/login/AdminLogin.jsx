import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import { HiddenInput } from "../../components/Styles/StyledInputs";
import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { UsernameValidator } from "../../components/utils/Validator";
import { Tabs, Tab } from "@mui/material";

const AdminLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const ifLogin = () => setIsLogin((prev) => !prev);
  const name = useInputValidation("");
  const username = useInputValidation("", UsernameValidator);
  const password = useStrongPassword();
  const email = useInputValidation("");
  const avatar = useFileHandler("single");

  const [tabValue, setTabValue] = useState('User'); // Add this line

  const handleLogin = (e) => {
    e.preventDefault();
  };
  const handleSignUp = (e) => {
    e.preventDefault();
  };

  const handleChange = (event, newValue) => { // Add this function
    setTabValue(newValue);
  };

  return (
    <Container
      component={"main"}
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isLogin ? (
          <>
            <Tabs
              value={tabValue} // Update this line
              onChange={handleChange} // Update this line
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
              <Tab value="User" label="User" />
              <Tab value="Retailer" label="Retailer" />
            </Tabs>
            <Typography variant="h4">Login</Typography>
            <form onSubmit={handleLogin}>
              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
              />
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Login
              </Button>
              <Typography textAlign={"center"} m={"1rem"}>
                OR
              </Typography>
              <Button
                variant="text"
                color="secondary"
                fullWidth
                onClick={ifLogin}
              >
                Create Account
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography variant="h4">Sign Up</Typography>
            <form onSubmit={handleSignUp}>
              
              <TextField
                required
                fullWidth
                label="FirmName"
                margin="normal"
                variant="outlined"
                value={name.value}
                onChange={name.changeHandler}
              />
              <TextField
                required
                fullWidth
                label="Gst Number"
                margin="normal"
                variant="outlined"
                value={name.value}
                onChange={name.changeHandler}
              />
              <TextField
                required
                fullWidth
                label="Email"
                type="email"
                margin="normal"
                variant="outlined"
                value={email.value}
                onChange={email.changeHandler}
              />
              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler}
              />
              {username.error && (
                <Typography color="error" variant="caption">
                  {username.error}
                </Typography>
              )}
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler}
              />
              {password.error && (
                <Typography color="error" variant="caption">
                  {password.error}
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Sign Up
              </Button>
              <Typography textAlign={"center"} m={"1rem"}>
                OR
              </Typography>
              <Button
                variant="text"
                color="secondary"
                fullWidth
                onClick={ifLogin}
              >
                Login
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default AdminLogin;
