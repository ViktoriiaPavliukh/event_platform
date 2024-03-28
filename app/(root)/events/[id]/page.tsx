import { getEventById } from "@/lib/actions/event.actions";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import { Typography, Box, Button } from "@mui/material";
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
    <>
      <Typography>{event.title}</Typography>
      <Image
        src={event.imageUrl}
        alt="hero image"
        width={500}
        height={500}
        className="h-full min-h-[300px] object-cover object-center"
      />
      <Typography>{event.isFree ? "Free" : `${event.price}`}</Typography>
      <Typography>{event.category.name}</Typography>
      <Typography>
        {event.organiser.firstName} {event.organiser.lastName}
      </Typography>
      <Box>
        <CalendarMonthIcon />
        <Typography>
          {formatDateTime(event.startDateTime).dateOnly} -{" "}
          {formatDateTime(event.startDateTime).timeOnly}
        </Typography>
        <Typography>
          {formatDateTime(event.endDateTime).dateOnly} -{" "}
          {formatDateTime(event.endDateTime).timeOnly}
        </Typography>
      </Box>
      <Box>
        <LocationOn />
        <Typography>{event.location}</Typography>
      </Box>
      <Box><Typography>{event.description}</Typography></Box>
      {/* <Button>Buy Ticket</Button> */}
    </>
  );
};

export default EventDetails;
