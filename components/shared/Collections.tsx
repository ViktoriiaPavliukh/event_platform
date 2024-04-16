"use client";
import React, { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useGoogleOAuth } from "@react-oauth/google";
import { IEvent } from "@/lib/database/models/event.model";
import { Box, Typography, List, ListItem, Button } from "@mui/material";
import Card from "./Card";
import Pagination from "./Pagination";
import { addEventToGoogleCalendar } from "../../lib/actions/calendar.actions";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type CollectionProps = {
  data: IEvent[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  collectionType?: "Events_Organised" | "My_tickets" | "All_events";
};

interface CalendarEvent {
  summary: string;
  description?: string;
  start: {
    dateTime: string;
  };
  end: {
    dateTime: string;
  };
}

const Collections: React.FC<CollectionProps> = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
}) => {
  const navigation = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const user = useUser();
  let userEmail = user.user?.emailAddresses[0].emailAddress;
  console.log(userEmail);

  // const addEvent = useGoogleLogin({
  //   onSuccess: (response) => {
  //     setAccessToken(response.access_token);
  //     addEventToGoogleCalendar(
  //       {
  //         summary: "Test Event",
  //         description: "This is a test event.",
  //         start: {
  //           dateTime: "2024-08-28T09:00:00-07:00",
  //         },
  //         end: {
  //           dateTime: "2024-08-28T17:00:00-07:00",
  //         },
  //       },
  //       accessToken
  //     );
  //   },
  //   onError: (error) => console.error(error),
  // });
  const login = useGoogleLogin({
    onSuccess: (response) => {
      setAccessToken(response.access_token);
    },
    onError: (error) => console.error(error),
  });

  const addEvent = (event: IEvent) => {
    if (!accessToken) {
      login();
    } else {
      // Check if startDateTime is a valid Date object
      if (typeof event.startDateTime === "string") {
        // Try parsing the startDateTime string into a Date object
        const parsedStartDate = new Date(event.startDateTime);

        // Check if parsing was successful
        if (isNaN(parsedStartDate.getTime())) {
          console.error("Invalid startDateTime format");
          return;
        }

        // Replace event.startDateTime with the parsed Date object
        event.startDateTime = parsedStartDate;
      } else if (!(event.startDateTime instanceof Date)) {
        console.error("startDateTime is not a valid Date object");
        return;
      }

      // Check if endDateTime is a valid Date object
      if (typeof event.endDateTime === "string") {
        // Try parsing the endDateTime string into a Date object
        const parsedEndDate = new Date(event.endDateTime);

        // Check if parsing was successful
        if (isNaN(parsedEndDate.getTime())) {
          console.error("Invalid endDateTime format");
          return;
        }

        // Replace event.endDateTime with the parsed Date object
        event.endDateTime = parsedEndDate;
      } else if (!(event.endDateTime instanceof Date)) {
        console.error("endDateTime is not a valid Date object");
        return;
      }

      // Proceed with adding event to Google Calendar
      addEventToGoogleCalendar(
        {
          summary: event.title,
          description: event.description || "",
          start: {
            dateTime: event.startDateTime.toISOString(),
          },
          end: {
            dateTime: event.endDateTime.toISOString(),
          },
        },
        accessToken, userEmail
      );
    }
  };

  return (
    <Box
      sx={{
        width: "90%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <>
        {data && data.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <List
              component="ul"
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px 30px",
              }}
            >
              {data.map((event) => {
                const hasOrderLink = collectionType === "Events_Organised";
                const hidePrice = collectionType === "My_tickets";

                return (
                  <ListItem
                    component="li"
                    key={event?._id}
                    sx={{
                      display: "flex",
                      width: "300px",
                      gap: "20px",
                      flexDirection: "column",
                    }}
                  >
                    <Card
                      event={event}
                      hasOrderLink={hasOrderLink}
                      hidePrice={hidePrice}
                    />
                    {collectionType === "My_tickets" && (
                      <Button onClick={() => addEvent(event)}>
                        Add Event to Google Calendar
                      </Button>
                    )}
                  </ListItem>
                );
              })}
            </List>
            {totalPages > 1 && (
              <Pagination
                urlParamName={urlParamName}
                page={page}
                totalPages={totalPages}
              />
            )}
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              padding: "50px",
              borderRadius: "8px",
              backgroundColor: "#f8f4f0",
            }}
          >
            <Typography variant="h5">{emptyTitle}</Typography>
            <Typography variant="body1">{emptyStateSubtext}</Typography>
          </Box>
        )}
      </>
    </Box>
  );
};

export default Collections;

// "use client";

// import React, { useState, useEffect } from "react";
// import { useGoogleLogin } from "@react-oauth/google";
// import { IEvent } from "@/lib/database/models/event.model";
// import { Box, Typography, List, ListItem, Button } from "@mui/material";
// import Card from "./Card";
// import Pagination from "./Pagination";
// import Loading from "./Loading";
// import fetch from "node-fetch";

// type CollectionProps = {
//   data: IEvent[];
//   emptyTitle: string;
//   emptyStateSubtext: string;
//   limit: number;
//   page: number | string;
//   totalPages?: number;
//   urlParamName?: string;
//   collectionType?: "Events_Organised" | "My_tickets" | "All_events";
// };

// const Collections = ({
//   data,
//   emptyTitle,
//   emptyStateSubtext,
//   page,
//   totalPages = 0,
//   collectionType,
//   urlParamName,
// }: CollectionProps) => {
//   const [accessToken, setAccessToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   console.log(accessToken);

//   useEffect(() => {
//     if (data && data.length > 0) {
//       setLoading(false);
//     }
//   }, [data]);

//   const login = useGoogleLogin({
//     onSuccess: (response) => {
//       setAccessToken(response.access_token);
//     },
//     onError: (error) => console.error(error),
//   });

//   useEffect(() => {
//     if (accessToken) {
//       setLoading(false);
//     }
//   }, [accessToken]);

//   const addEventToGoogleCalendar = async (event: IEvent) => {
//     try {
//       if (!accessToken) {
//         await login(); // Wait for login process to complete
//         console.log(accessToken);
//         return; // Return if accessToken is still not set
//       }

//       console.log(event);
//       const response = await fetch("/api/calendar/handler", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`, // Include access token in header
//         },
//         body: JSON.stringify({
//           event: {
//             summary: event.title,
//             description: event.description,
//             start: new Date(event.startDateTime).toISOString(),
//             end: new Date(event.endDateTime).toISOString(),
//           },
//         }),
//       });

//       // Check if response is successful
//       if (!response.ok) {
//         throw new Error("Failed to add event to Google Calendar");
//       }

//       const responseData = await response.json();
//       console.log("Event added:", responseData);
//       // Handle success (e.g., show a confirmation message to the user)
//     } catch (error) {
//       console.error("Error adding event to Google Calendar:", error);
//       // Handle error (e.g., display an error message to the user)
//     }
//   };

//   return (
//     <Box
//       sx={{
//         width: "90%",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       {loading ? (
//         <Loading /> // Show loading indicator if data is being fetched
//       ) : (
//         <>
//           {data && data.length > 0 ? (
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 flexDirection: "column",
//               }}
//             >
//               {" "}
//               <List
//                 component="ul"
//                 sx={{
//                   display: "flex",
//                   flexWrap: "wrap",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   gap: "20px 30px",
//                 }}
//               >
//                 {data.map((event) => {
//                   const hasOrderLink = collectionType === "Events_Organised";
//                   const hidePrice = collectionType === "My_tickets";

//                   return (
//                     <ListItem
//                       component="li"
//                       key={event?._id}
//                       sx={{
//                         display: "flex",
//                         width: "300px",
//                         gap: "20px",
//                         flexDirection: "column",
//                       }}
//                     >
//                       <Card
//                         event={event}
//                         hasOrderLink={hasOrderLink}
//                         hidePrice={hidePrice}
//                       />
//                       {collectionType === "My_tickets" && (
//                         <Button
//                           variant="contained"
//                           // onClick={() => addEventToGoogleCalendar(event)}
//                           onClick={() => login()}
//                         >
//                           Add to Google Calendar
//                         </Button>
//                       )}
//                     </ListItem>
//                   );
//                 })}
//               </List>
//               {totalPages > 1 && (
//                 <Pagination
//                   urlParamName={urlParamName}
//                   page={page}
//                   totalPages={totalPages}
//                 />
//               )}
//             </Box>
//           ) : (
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 gap: "20px",
//                 padding: "50px",
//                 borderRadius: "8px",
//                 backgroundColor: "#f8f4f0",
//               }}
//             >
//               <Typography variant="h5">{emptyTitle}</Typography>
//               <Typography variant="body1">{emptyStateSubtext}</Typography>
//             </Box>
//           )}
//         </>
//       )}
//     </Box>
//   );
// };

// export default Collections;
