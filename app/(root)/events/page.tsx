import { Typography, Box, Stack, Button } from "@mui/material";
import Search from "@/components/shared/Search";
import CategoryFilter from "@/components/shared/CategoryFilter";
import styles from "./../page.module.css";
import Collections from "@/components/shared/Collections";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";

export default async function EventList({ searchParams }: SearchParamProps) {
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
    <Box
      sx={{
        px: { xs: "40px", md: "60px" },
        maxWidth: "1200px",
        margin: "0 auto",
        minHeight: "90vh",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        color="textSecondary"
        sx={{ textTransform: "uppercase", pt: "20px" }}
      >
        All Events
      </Typography>
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
