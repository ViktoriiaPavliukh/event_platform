"use client";
import React, { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { IEvent } from "@/lib/database/models/event.model";
import { Box, Typography, List, ListItem, Button } from "@mui/material";
import Card from "./Card";
import Pagination from "./Pagination";
import Loading from "./Loading";

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

const Collections = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
}: CollectionProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (data && data.length > 0) {
      setLoading(false);
    }
  }, [data]);

  const login = useGoogleLogin({
    onSuccess: (response) => {
      setAccessToken(response.access_token);
    },
    onError: (error) => console.error(error),
  });

  // console.log(accessToken);
  // const addEventToGoogleCalendar = async (event: IEvent) => {
  //   try {
  //     login();
  //     console.log(event);
  //     const response = await fetch("/api/calendar/handler", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${accessToken}`, // Include access token in header
  //       },
  //       body: JSON.stringify({
  //         event: {
  //           summary: event.title,
  //           description: event.description,
  //           start: new Date(event.startDateTime).toISOString(),
  //           end: new Date(event.endDateTime).toISOString(),
  //         },
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to add event to Google Calendar");
  //     }

  //     const data = await response.json();
  //     console.log("Event added:", data);
  //     // Handle success (e.g., show a confirmation message to the user)
  //   } catch (error) {
  //     console.error("Error adding event to Google Calendar:", error);
  //     // Handle error (e.g., display an error message to the user)
  //   }
  // };
  return (
    <Box
      sx={{
        width: "90%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? (
        <Loading /> // Show loading indicator if data is being fetched
      ) : (
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
              {" "}
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
                        // flexGrow: 1,
                        // height: "400px",
                        flexDirection: "column",
                      }}
                    >
                      <Card
                        event={event}
                        hasOrderLink={hasOrderLink}
                        hidePrice={hidePrice}
                      />
                      {collectionType === "My_tickets" && (
                        <Button variant="contained" onClick={() => login()}>
                          Add to Google Calendar
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
      )}
    </Box>
  );
};

export default Collections;
