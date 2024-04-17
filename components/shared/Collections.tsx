"use client";
import React, { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleIcon from "@mui/icons-material/Google";
import { IEvent } from "../../lib/database/models/event.model";
import { Box, Typography, List, ListItem, Button } from "@mui/material";
import Card from "./Card";
import Pagination from "./Pagination";
import { addEventToGoogleCalendar } from "../../lib/actions/calendar.actions";
import { useUser } from "@clerk/nextjs";
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

const Collections: React.FC<CollectionProps> = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const user = useUser();
  let userEmail = user.user?.emailAddresses[0].emailAddress;

  useEffect(() => {
    setLoading(false);
  }, [data]);

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
      if (typeof event.startDateTime === "string") {
        const parsedStartDate = new Date(event.startDateTime);
        if (isNaN(parsedStartDate.getTime())) {
          console.error("Invalid startDateTime format");
          return;
        }
        event.startDateTime = parsedStartDate;
      } else if (!(event.startDateTime instanceof Date)) {
        console.error("startDateTime is not a valid Date object");
        return;
      }
      if (typeof event.endDateTime === "string") {
        const parsedEndDate = new Date(event.endDateTime);
        if (isNaN(parsedEndDate.getTime())) {
          console.error("Invalid endDateTime format");
          return;
        }
        event.endDateTime = parsedEndDate;
      } else if (!(event.endDateTime instanceof Date)) {
        console.error("endDateTime is not a valid Date object");
        return;
      }
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
        accessToken,
        userEmail
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          {data && data.length > 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                maxWidth: "1000px",
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
                        position: "relative",
                      }}
                    >
                      <Card
                        event={event}
                        hasOrderLink={hasOrderLink}
                        hidePrice={hidePrice}
                      />
                      {collectionType === "My_tickets" && (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "right",
                            alignItems: "center",
                            width: "100%",
                            height: "40px",
                            py: "20px",
                            marginTop: "20px",
                            position: "absolute",
                            right: "20px",
                            bottom: "26px",
                            gap: "15px",
                          }}
                        >
                          <Button
                            onClick={() => addEvent(event)}
                            aria-label="Add to Google Calendar"
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              position: "relative",
                              py: "5px",
                              maxWidth: "260px",
                              "&:hover .show-text": {
                                display: "block",
                                visibility: "visible",
                              },
                            }}
                          >
                            <GoogleIcon />
                            <Typography
                              className="show-text"
                              sx={{
                                display: "none",
                                visibility: "hidden",
                                transition: "all 0.5s ease",
                              }}
                            >
                              Add to Google Calendar
                            </Typography>
                          </Button>
                        </Box>
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
                textAlign: "center",
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
