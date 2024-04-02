import { getEventById } from "@/lib/actions/event.actions";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import { Typography, Box, Stack, Button } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Image from "next/image";
import { LocationOn } from "@mui/icons-material";

const EventDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  console.log(id);
  const event = await getEventById(id);

  // const relatedEvents = await getRelatedEventsByCategory({
  //   categoryId: event.category._id,
  //   eventId: event._id,
  //   page: searchParams.page as string,
  // });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
          gap: "20px",
          backgroundColor: "#f8f4f0",
          width: { xs: "90%", md: "70%", lg: "70%" },
          borderRadius: "12px",
        }}
      >
        <Typography variant="h3">{event.title}</Typography>
        <Image
          src={event.imageUrl}
          alt="hero image"
          width={500}
          height={500}
          layout="responsive"
        />
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              display: "flex",
            }}
          >
            {event.isFree ? "Free" : `${event.price} GBP`}
          </Typography>
          <Typography
            sx={{
              display: "flex",
            }}
          >
            {event.category.name}
          </Typography>
        </Stack>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            gap: "20px",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <CalendarMonthIcon />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <Typography>
                {formatDateTime(event.startDateTime).dateOnly} -{" "}
                {formatDateTime(event.startDateTime).timeOnly}
              </Typography>
              <Typography>
                {formatDateTime(event.endDateTime).dateOnly} -{" "}
                {formatDateTime(event.endDateTime).timeOnly}
              </Typography>
            </Box>
          </Stack>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <LocationOn />
            <Typography>{event.location}</Typography>
          </Box>
        </Box>
        <Box>
          <Typography>{event.description}</Typography>
        </Box>
        <Typography>
          {event.organiser.firstName} {event.organiser.lastName}
        </Typography>
        {/* <Button>Buy Ticket</Button> */}
      </Box>
    </Box>
  );
};

export default EventDetails;
