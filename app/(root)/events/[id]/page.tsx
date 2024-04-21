import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/lib/actions/event.actions";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import { Typography, Box, Stack } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Image from "next/image";
import Link from "next/link";
import { LocationOn } from "@mui/icons-material";
import Collections from "@/components/shared/Collections";
import PaymentButton from "../../../../components/shared/PaymentButton";

const shortenUrl = (url: string): string => {
  if (url.length <= 30) return url;
  return url.substring(0, 30) + "...";
};

const EventDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const event = await getEventById(id);

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  });

  const shortenedUrl = shortenUrl(event.url);

  return (
    <>
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
                backgroundColor: "#d3cbc5",
                padding: "5px 10px",
                borderRadius: "6px",
              }}
            >
              {event.isFree ? "Free" : `£${event.price}`}
            </Typography>
            <Typography
              sx={{
                display: "flex",
                backgroundColor: "#d3cbc5",
                padding: "5px 10px",
                borderRadius: "6px",
              }}
            >
              {event.category.name}
            </Typography>
          </Stack>
          <Typography
            color="textSecondary"
            variant="h3"
            sx={{ textAlign: "center" }}
          >
            {event.title}
          </Typography>
          <Box
            sx={{
              width: { xs: "100%", md: "80%", lg: "70%" },
            }}
          >
            <Image
              src={event.imageUrl}
              alt="hero image"
              width={500}
              height={500}
              layout="responsive"
              style={{ borderRadius: "12px" }}
            />
          </Box>
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
                color: "GrayText",
              }}
            >
              <CalendarMonthIcon />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  justifyContent: "start",
                  alignItems: "start",
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
                color: "GrayText",
              }}
            >
              <LocationOn />
              <Typography>{event.location}</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <Typography sx={{textAlign: "justify"}}>{event.description}</Typography>
            {event.url && (
              <Link href={event.url} passHref>
                <Typography color="textSecondary" title={event.url}>
                  {shortenedUrl}
                </Typography>
              </Link>
            )}
          </Box>
          <PaymentButton event={event} />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          py: "40px",
          gap: "20px",
        }}
      >
        <Typography
          variant="h6"
          color="textSecondary"
          sx={{ textTransform: "uppercase" }}
        >
          Related Events
        </Typography>
        <Collections
          data={relatedEvents?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_events"
          limit={3}
          page={Number(searchParams?.page) || 1}
          totalPages={relatedEvents?.totalPages}
        />
      </Box>
    </>
  );
};

export default EventDetails;
