"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { auth } from "@clerk/nextjs";
import { getEventsByUser } from "@/lib/actions/event.actions";
import { Event } from "@/types";
import Collections from "@/components/shared/Collections";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useUserId } from "../../../components/shared/UserIdProvider";

interface EventsData {
  data: any;
  totalPages: number;
}

const Profile = () => {
  const { user } = useUser();
  const [organisedEvents, setOrganisedEvents] = useState<EventsData | null>(
    null
  );

  const userId =
    typeof user?.publicMetadata.userId === "string"
      ? user.publicMetadata.userId
      : "";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (userId) {
          const events = await getEventsByUser({ userId, page: 1 });
          setOrganisedEvents(events || null);
          console.log(events);
        } else {
          console.log("User ID is empty");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [userId]);

  return (
    <>
      <Box>
        <Typography>My tickets</Typography>
        <Button>
          <Link href="/events">Explore more events</Link>
        </Button>
      </Box>
      <Box>
        <Typography>Events Organised</Typography>
        <Button>
          <Link href="/events/create">Create New Event</Link>
        </Button>
      </Box>
      <Box>
        <Collections
          data={organisedEvents?.data || []}
          emptyTitle="No events have been created yet"
          emptyStateSubtext="Create some events now"
          collectionType="Events_Organised"
          limit={6}
          page={1}
          urlParamName="eventsPage"
          totalPages={2}
        />
      </Box>
    </>
  );
};

export default Profile;

// "use client";
// import React from "react";
// import { Box, Typography, Button } from "@mui/material";
// import { auth } from "@clerk/nextjs";
// import { getEventsByUser } from "@/lib/actions/event.actions";
// import Collections from "@/components/shared/Collections";
// import { useUser } from "@clerk/nextjs";
// import Link from "next/link";
// import { useUserId } from "../../../components/shared/UserIdProvider";

// const Profile = async () => {
//   const { user } = useUser();
//   console.log(user?.publicMetadata.userId);
//   const userId =
//     typeof user?.publicMetadata.userId === "string"
//       ? user.publicMetadata.userId
//       : "";
//   console.log(userId);
//   // const userId: string =
//   //   typeof user?.publicMetadata.userId === "string"
//   //     ? user.publicMetadata.userId
//   //     : "";

//   // console.log(user);
//   // const { sessionClaims } = auth();
//   // console.log(sessionClaims);
//   // const userId = sessionClaims?.userId as string;
//   // console.log("1", userId);
//   const organisedEvents = await getEventsByUser({ userId, page: 1 });
//   console.log(organisedEvents);
//   return (
//     <>
//       <Box>
//         <Typography>My tickets</Typography>
//         <Button>
//           <Link href="/events">Explore more events</Link>
//         </Button>
//       </Box>
//       <Box>
//         {/* <Collections
//           data={events?.data}
//           emptyTitle="No event tickets purchased yet"
//           emptyStateSubtext="Explore plenty of exciting events"
//           collectionType="My_tickets"
//           limit={3}
//           page={1}
//           urlParamName="ordersPage"
//           totalPages={2}
//         /> */}
//       </Box>
//       <Box>
//         <Typography>Events Organised</Typography>
//         <Button>
//           <Link href="/events/create">Create New Event</Link>
//         </Button>
//       </Box>
//       <Box>
//         <Collections
//           data={organisedEvents?.data}
//           emptyTitle="No events have been created yet"
//           emptyStateSubtext="Create some events now"
//           collectionType="Events_Organised"
//           limit={6}
//           page={1}
//           urlParamName="eventsPage"
//           totalPages={2}
//         />
//       </Box>
//     </>
//   );
// };

// export default Profile;
