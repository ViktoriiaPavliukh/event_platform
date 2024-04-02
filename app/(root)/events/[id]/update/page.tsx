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
  console.log(userId);
  const event = await getEventById(id);
  return (
    <>
      <Box>
        <Typography variant="h4">Update Event</Typography>
        <EventForm userId={userId} eventId={event._id} event={event} type="Update" />
      </Box>
      ;
    </>
  );
};
export default UpdateEvent;
