import React from "react";
import {
  Box,
  Typography,
  Stack,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
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

const EventCard = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const { user } = useUser();
  const userId: string =
    typeof user?.publicMetadata.userId === "string"
      ? user.publicMetadata.userId
      : "";

  const isEventCreator =
    event &&
    event.organiser &&
    event.organiser._id &&
    userId === event.organiser._id.toString();

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: { xs: "300px", sm: "300px", md: "300px" },
        height: "400px",
        backgroundColor: "#f8f4f0",
        borderRadius: "12px",
      }}
    >
      <CardActionArea sx={{ height: "100%" }}>
        {event && (
          <Box sx={{ padding: "20px" }}>
            <Link href={`/events/${event._id}`}>
              <Image
                src={event.imageUrl}
                alt="hero image"
                width={300}
                height={300}
                layout="responsive"
                priority={true}
              />
              <CardContent>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {!hidePrice && (
                    <Typography>
                      {event.isFree ? "Free" : `${event.price} GBP`}
                    </Typography>
                  )}
                  <Typography>{event.category.name}</Typography>
                </Stack>

                <Typography>
                  {formatDateTime(event.startDateTime).dateTime}
                </Typography>
                <Link href={`/events/${event._id}`}>
                  <Typography>{event.title}</Typography>
                </Link>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "left",
                    alignItems: "left",
                  }}
                >
                  {/* <Typography>
              {event.organiser.firstName} {event.organiser.lastName}
            </Typography> */}
                  {hasOrderLink && (
                    <Link href={`/orders?eventId=${event._id}`}>
                      <Box sx={{ display: "flex" }}>
                        <Typography>Order Details</Typography>
                        <ArrowOutwardIcon />
                      </Box>
                    </Link>
                  )}
                </Stack>
              </CardContent>
            </Link>
          </Box>
        )}
        {isEventCreator && !hidePrice && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              p: "20px",
              gap: "5px",
              justifyContent: "end",
            }}
          >
            <Link href={`/events/${event._id}/update`}>
              <EditNoteIcon sx={{ paddingLeft: "3px" }} />
            </Link>
            <DeleteModal eventId={event._id} />
          </Box>
        )}
      </CardActionArea>
    </Card>
  );
};

export default EventCard;
