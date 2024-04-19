"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import EventForm from "@/components/shared/EventForm";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormHelperText,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useUser } from "@clerk/nextjs";

const CreateEvent = () => {
  const { user } = useUser();
  const userId: string =
    typeof user?.publicMetadata.userId === "string"
      ? user.publicMetadata.userId
      : "";
  const theme = useTheme();
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handlePasswordSubmit = () => {
    if (password === "staff") {
      setIsAuthenticated(true);
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "80vh",
          padding: { xs: "20px", md: "60px" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "40px",
        }}
      >
        <Typography variant="h4">Create Event</Typography>
        {!isAuthenticated ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              textAlign: "center",
              border: "2px solid",
              borderColor: theme.palette.primary.light,
              backgroundColor: "#FFF",
              padding: { xs: "20px", md: "40px" },
              borderRadius: "12px",
              maxWidth: "800px",
            }}
          >
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Welcome to the event creation page. Please note that only staff
              members are allowed to add events to this platform. If you're not
              a staff member, you can explore all events on the platform by
              clicking the button below.
            </Typography>
            <Button variant="outlined" href="/" sx={{ minWidth: "260px" }}>
              Explore All Events
            </Button>

            {userId ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ paddingTop: "20px" }}
                >
                  To proceed, please enter the password in the designated field
                  below.
                </Typography>
                <TextField
                  label="Enter Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    minWidth: "260px",
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handlePasswordSubmit();
                    }
                  }}
                />
                {error && <FormHelperText error>{error}</FormHelperText>}
                <Button
                  variant="contained"
                  onClick={handlePasswordSubmit}
                  sx={{ minWidth: "260px" }}
                >
                  Submit
                </Button>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ paddingTop: "20px" }}
                >
                  Thank you for your cooperation in maintaining the integrity of
                  our event listings.
                </Typography>
              </Box>
            ) : (
              <Typography variant="body1" color="textSecondary">
                Please log in to continue.
              </Typography>
            )}
          </Box>
        ) : (
          <>
            <EventForm userId={userId} type="Create" />
          </>
        )}
      </Box>
    </>
  );
};

export default CreateEvent;
