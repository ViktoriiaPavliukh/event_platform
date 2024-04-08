"use client";
import React, { useEffect, useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import Collections from "@/components/shared/Collections";
import { getEventsByUser } from "@/lib/actions/event.actions";
import { getOrdersByUser } from "@/lib/actions/order.actions";
import { IOrder } from "@/lib/database/models/order.model";
import { IEvent } from "@/lib/database/models/event.model";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { SearchParamProps } from "@/types";

const Profile = ({ searchParams }: SearchParamProps) => {
  const { user } = useUser();
  const userId =
    typeof user?.publicMetadata.userId === "string"
      ? user.publicMetadata.userId
      : "";

  const [orderedEvents, setOrderedEvents] = useState<IEvent[]>([]);
  const [organizedEvents, setOrganizedEvents] = useState<any>(null);
  const [orderedEventsTotalPages, setOrderedEventsTotalPages] =
    useState<number>(0);
  const [organizedEventsTotalPages, setOrganizedEventsTotalPages] =
    useState<number>(0);

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  useEffect(() => {
    const fetchOrders = async () => {
      if (userId) {
        const orders = await getOrdersByUser({ userId, page: ordersPage });
        const events = orders?.data.map((order: IOrder) => order.event) || [];
        setOrderedEvents(events);
        setOrderedEventsTotalPages(orders?.totalPages || 1);
      }
    };

    fetchOrders();
  }, [userId, ordersPage]);

  useEffect(() => {
    const fetchEvents = async () => {
      if (userId) {
        const events = await getEventsByUser({ userId, page: eventsPage });
        setOrganizedEvents(events || null);
        setOrganizedEventsTotalPages(events?.totalPages || 1);
      }
    };

    fetchEvents();
  }, [userId, eventsPage]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          px: { xs: "10px", md: "40px" },
          gap: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: { xs: "center", md: "space-between" },
            alignItems: "center",
            px: 2,
            gap: "20px",
          }}
        >
          <Typography variant="h6" align="center">
            My Tickets
          </Typography>
          <Button
            component={Link}
            href="/#events"
            variant="contained"
            sx={{ textAlign: "center" }}
          >
            Explore More Events
          </Button>
        </Box>
        <Collections
          data={orderedEvents}
          emptyTitle="No event tickets purchased yet"
          emptyStateSubtext="No worries - plenty of exciting events to explore!"
          collectionType="My_tickets"
          limit={3}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={orderedEventsTotalPages}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: { xs: "center", md: "space-between" },
            alignItems: "center",
            px: 2,
            gap: "20px",
          }}
        >
          <Typography variant="h6" align="center">
            Events Organised
          </Typography>
          <Button component={Link} href="/events/create" variant="contained">
            Create New Event
          </Button>
        </Box>

        <Collections
          data={organizedEvents?.data}
          emptyTitle="No events have been created yet"
          emptyStateSubtext="Go create some now"
          collectionType="Events_Organised"
          limit={3}
          page={eventsPage}
          urlParamName="eventsPage"
          totalPages={organizedEventsTotalPages}
        />
      </Box>
    </>
  );
};

export default Profile;
