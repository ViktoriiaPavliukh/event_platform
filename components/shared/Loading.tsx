import React from "react";
import { Typography, Box, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: "20px",
      }}
    >
      <CircularProgress />
      <Typography>Loading...</Typography>
    </Box>
  );
};

export default Loading;
