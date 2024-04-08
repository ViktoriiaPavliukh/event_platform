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

const Profile = () => {
  const { user } = useUser();
  const userId =
    typeof user?.publicMetadata.userId === "string"
      ? user.publicMetadata.userId
      : "";

  const [orderedEvents, setOrderedEvents] = useState<IEvent[]>([]); // Use IEvent instead of IOrder
  const [organizedEvents, setOrganizedEvents] = useState<any>(null);
  const [ordersPage, setOrdersPage] = useState<number>(1);
  const [eventsPage, setEventsPage] = useState<number>(1);

  useEffect(() => {
    const fetchOrders = async () => {
      if (userId) {
        const orders = await getOrdersByUser({ userId, page: ordersPage });
        const events = orders?.data.map((order: IOrder) => order.event) || []; // Extract event information from orders
        setOrderedEvents(events); // Set the mapped events
      }
    };

    fetchOrders();
  }, [userId, ordersPage]);

  useEffect(() => {
    const fetchEvents = async () => {
      if (userId) {
        const events = await getEventsByUser({ userId, page: eventsPage });
        setOrganizedEvents(events || null);
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
          totalPages={2}
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
          totalPages={2}
        />
      </Box>
    </>
  );
};

export default Profile;

