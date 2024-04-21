import { Typography, Box, Stack, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Search from "@/components/shared/Search";
import CategoryFilter from "@/components/shared/CategoryFilter";
import Collections from "@/components/shared/Collections";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";
  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6,
  });

  return (
    <Box sx={{ px: { xs: "40px" } }}>
      <Box
        sx={{
          display: "flex",
          height: "100%",
          paddingX: { md: "40px" },
          marginBottom: "20px",
          flexDirection: {
            xs: "column",
          },
          justifyContent: "center",
          alignItems: "center",
          gap: "60px",
        }}
      >
        <Typography
          variant="h2"
          color="textSecondary"
          sx={{
            fontSize: { xs: "24px", sm: "30px", md: "50px" },
            paddingTop: "60px",
            textAlign: "center",
          }}
        >
          Craft unforgettable moments, seamlessly: elevate your events with our
          platform
        </Typography>
        <Stack
          sx={{
            display: "flex",
            flexDirection: { sm: "column", md: "row" },
            gap: "30px",
            width: { xs: "fit-content" },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              flexWrap: "wrap",
              gap: "5px",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: "20px",
              maxWidth: "500px",
            }}
          >
            <Image
              src="/assets/images/people.png"
              alt="people"
              width={230}
              height={230}
              priority={true}
            />
            <Image
              src="/assets/images/space.webp"
              alt="space"
              width={230}
              height={230}
              priority={true}
            />
            <Image
              src="/assets/images/hall.webp"
              alt="hall"
              width={230}
              height={230}
              priority={true}
            />
            <Image
              src="/assets/images/car.webp"
              alt="car"
              width={230}
              height={230}
              priority={true}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { xs: "100%" },
              gap: "10px",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                textAlign: { xs: "center", md: "justify" },
              }}
            >
              EventSpot brings your gatherings to life. Whether it's a concert
              under the stars or a workshop that sparks creativity, EventSpot is
              your canvas for memorable experiences.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: { xs: "center", md: "justify" },
              }}
            >
              Seamlessly plan, promote, and manage your events while connecting
              with an eager audience. Attendees, immerse yourself in a world of
              endless discovery, where each event is a chapter waiting to be
              written.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: { xs: "center", md: "justify" },
                mb: "30px",
              }}
            >
              Let EventSpot be your guide as you explore, connect, and create
              unforgettable memories together
            </Typography>
            <Link
              href="/events"
              style={{
                display: "flex",
                justifySelf: "center",
                alignSelf: "center",
              }}
            >
              <Button sx={{ p: "10px 20px" }}> Explore now</Button>
            </Link>
          </Box>
        </Stack>
      </Box>
      <Box
        sx={{
          display: "flex",
          height: "100%",
          py: "60px",
          flexDirection: {
            xs: "column",
            md: "row",
            justifyContent: "center",
            alignItems: "center",
          },
          gap: "20px",
        }}
      >
        <Search />
        <CategoryFilter />
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Collections
          data={events?.data}
          emptyTitle="No events found"
          emptyStateSubtext="Come back later"
          collectionType="All_events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </Box>
    </Box>
  );
}
