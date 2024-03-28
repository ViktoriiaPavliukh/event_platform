import React from "react";
import { auth } from "@clerk/nextjs";
import EventForm from "@/components/ui/shared/EventForm";
import { Box, Typography } from "@mui/material";

const CreateEvent = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
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
