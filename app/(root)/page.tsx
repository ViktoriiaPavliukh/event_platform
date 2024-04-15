import { Typography, Box, Stack, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Search from "@/components/shared/Search";
import CategoryFilter from "@/components/shared/CategoryFilter";
import styles from "./../page.module.css";
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
    <>
      <Box
        sx={{
          display: "flex",
          height: "100%",
          paddingX: "60px",
          marginBottom: "20px",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          justifyContent: "center",
          alignItems: "center",
          gap: "60px",
        }}
      >
        <Stack
          sx={{ display: "flex", flexDirection: { sm: "column" }, gap: "20px" }}
        >
          <Typography
            variant="h1"
            sx={{ fontSize: { lg: "50px", xs: "30px" } }}
          >
            Craft unforgettable moments, seamlessly: elevate your events with
            our platform
          </Typography>
          <Typography variant="body1">
            Where Moments Unfold: EventSpot brings your gatherings to life.
            Whether it's a concert under the stars or a workshop that sparks
            creativity, EventSpot is your canvas for memorable experiences.
            Seamlessly plan, promote, and manage your events while connecting
            with an eager audience. Attendees, immerse yourself in a world of
            endless discovery, where each event is a chapter waiting to be
            written. Let EventSpot be your guide as you explore, connect, and
            create unforgettable memories together
          </Typography>
          <Link href="/">
            <Button>Explore now</Button>
          </Link>
        </Stack>
        <Image
          src="/assets/images/people.png"
          alt="big event"
          width={500}
          height={500}
          priority={true}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          height: "100%",
          p: "60px",
          flexDirection: {
            xs: "column",
            md: "row",
            justifyContent: "center",
            alignItems: "center",
          },
          gap: "40px",
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
    </>
    // <main className={styles.main}>
    //   {/* <ButtonContained /> */}
    // </main>
  );
}
