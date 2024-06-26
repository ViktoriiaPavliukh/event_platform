import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
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
  const theme = useTheme();
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
  const [isHovered, setIsHovered] = useState(false);
  const isEventOverdue = new Date(event.endDateTime) < new Date();

  return (
    <Card
      sx={{
        display: "flex",
        position: "relative",
        zIndex: "0",
        flexDirection: "column",
        gap: "10px",
        width: { xs: "300px", sm: "300px", md: "300px" },
        backgroundColor: isEventOverdue ? "#f5f5f5" : "#f8f4f0",
        borderRadius: "12px",
        filter: isEventOverdue ? "brightness(0.8)" : "none",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardActionArea
        component={Link}
        href={
          hasOrderLink ? `/orders?eventId=${event._id}` : `/events/${event._id}`
        }
        sx={{
          minHeight: "450px",
          paddingBottom: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {event && (
          <Box
            sx={{
              padding: "20px",
              color: "#585858",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src={event.imageUrl}
                alt="hero image"
                width={260}
                height={200}
                style={{ borderRadius: "6px" }}
                priority={true}
              />
            </Box>
            <CardContent
              sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {!hidePrice && (
                  <Typography
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      padding: "5px 10px",
                      borderRadius: "6px",
                    }}
                  >
                    {event.isFree ? "Free" : `£${event.price}`}
                  </Typography>
                )}
                {event.category.name ? (
                  <Typography
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      padding: "5px 10px",
                      borderRadius: "6px",
                    }}
                  >
                    {event.category.name}
                  </Typography>
                ) : null}
              </Stack>
              <Typography sx={{ py: "5px" }}>
                {formatDateTime(event.startDateTime).dateTime}
              </Typography>
              <Typography sx={{ fontWeight: "600" }}>{event.title}</Typography>
              {hasOrderLink && (
                <Stack
                  component="div"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifySelf: "baseline",
                    alignSelf: "left",
                    justifyContent: "baseline",
                    alignItems: "baseline",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "fit-content",
                      padding: "5px 10px",

                      position: "absolute",
                      bottom: "20px",
                      right: "20px",
                    }}
                  >
                    <Typography sx={{ textWrap: "nowrap" }}>
                      Order Details
                    </Typography>
                    <ArrowOutwardIcon
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: "6px",
                        ml: "5px",
                      }}
                    />
                  </Box>
                </Stack>
              )}
            </CardContent>
          </Box>
        )}
      </CardActionArea>
      {isEventCreator && !hidePrice && (
        <Box
          sx={{
            position: "absolute",
            top: "26px",
            right: "24px",
            zIndex: "10",
            display: "flex",
            flexDirection: "column",
            p: "5px",
            gap: "5px",
            justifyContent: "end",
            alignItems: "end",
            background: theme.palette.primary.main,
            borderRadius: "6px",
          }}
        >
          <Link href={`/events/${event._id}/update`}>
            <EditNoteIcon sx={{ paddingLeft: "3px", color: "#585858" }} />
          </Link>
          <DeleteModal eventId={event._id} />
        </Box>
      )}
    </Card>
  );
};

export default EventCard;
