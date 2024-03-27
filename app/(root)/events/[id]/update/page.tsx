import React from "react";
import { auth } from "@clerk/nextjs";
import EventForm from "@/components/ui/shared/EventForm";
import { Box, Typography } from "@mui/material";

const UpdateEvent = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  return (
    <>
      <Box>
        <Typography variant="h4">Update Event</Typography>
        <EventForm userId={userId} type="Update" />
      </Box>
      ;
    </>
  );
};
export default UpdateEvent;
