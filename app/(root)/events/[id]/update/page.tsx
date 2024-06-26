import React from "react";
import { auth } from "@clerk/nextjs";
import EventForm from "@/components/shared/EventForm";
import { Box, Typography } from "@mui/material";
import { getEventById } from "@/lib/actions/event.actions";

type UpdateEventProps = {
  params: {
    id: string;
  };
};

const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const event = await getEventById(id);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "90%",
          margin: "0 auto",
        }}
      >
        <Typography variant="h4">Update Event</Typography>
        <EventForm
          userId={userId}
          eventId={event._id}
          event={event}
          type="Update"
        />
      </Box>
    </>
  );
};
export default UpdateEvent;
