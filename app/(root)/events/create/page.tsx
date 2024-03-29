import React from "react";
import { auth } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import EventForm from "@/components/shared/EventForm";
import { Box, Typography } from "@mui/material";

const CreateEvent = () => {
  const { sessionClaims } = auth();
  console.log(sessionClaims);
  const userId = sessionClaims?.userId as string;
  console.log(userId);
  return (
    <>
      <Box sx={{ minHeight: "90vh", padding: { xs: "20px", md: "60px" } }}>
        <Typography variant="h4">Create Event</Typography>
        <EventForm userId={userId} type="Create" />
      </Box>
    </>
  );
};
export default CreateEvent;
