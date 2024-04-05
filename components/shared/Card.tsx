import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Link from "next/link";
import Image from "next/image";
import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import DeleteModal from "./DeleteModal";

type CardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const { user } = useUser();
  const userId: string =
    typeof user?.publicMetadata.userId === "string"
      ? user.publicMetadata.userId
      : "";

  const isEventCreator = userId === event.organiser._id.toString();
  return (
    <Box
      sx={{
        display: "flex",
        gap: "10px",
        width: { xs: "300px", sm: "350px" },
        height: "400px",
        padding: "20px",
        backgroundColor: "#f8f4f0",
        borderRadius: "12px",
      }}
    >
      <Link href={`/events/${event._id}`}>
        {!hidePrice && (
          <Box>
            <Image
              src={event.imageUrl}
              alt="hero image"
              width={300}
              height={300}
              layout="responsive"
              priority={true}
            />
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {" "}
              <Typography>
                {event.isFree ? "Free" : `${event.price}`}
              </Typography>
              <Typography>{event.category.name}</Typography>
            </Stack>
          </Box>
        )}
        <Typography>{formatDateTime(event.startDateTime).dateTime}</Typography>
        <Typography>{event.title}</Typography>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "left",
            alignItems: "left",
          }}
        >
          <Typography>
            {event.organiser.firstName} {event.organiser.lastName}
          </Typography>
          {hasOrderLink && (
            <Link href={`/orders?eventId=${event._id}`}>
              <Box sx={{ display: "flex" }}>
                <Typography>Order Details</Typography>
                <ArrowOutwardIcon />
              </Box>
            </Link>
          )}
        </Stack>
      </Link>
      {isEventCreator && !hidePrice && (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Link href={`/events/${event._id}/update`}>
            <EditNoteIcon sx={{ paddingLeft: "3px" }} />
          </Link>
          <DeleteModal eventId={event._id} />
        </Box>
      )}
    </Box>
  );
};

export default Card;
