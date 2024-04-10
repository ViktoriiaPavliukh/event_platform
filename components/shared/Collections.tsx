"use client";
import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { IEvent } from "@/lib/database/models/event.model";
import { Box, Typography, List, ListItem, Button } from "@mui/material";
import Card from "./Card";
import Pagination from "./Pagination";

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
  const login = useGoogleLogin({
    onSuccess: (response) => {
      console.log(response);
      setAccessToken(response.access_token);
    },
    onError: (error) => console.error(error),
  });
  console.log(accessToken);
  return (
    <>
      {data && data.length > 0 ? (
        <Box>
          {" "}
          <List
            component="ul"
            sx={{
              display: "flex",
              width: "100%",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
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
                    width: "fit-content",
                    flexDirection: "column",
                    gap: "20px",
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
  );
};

export default Collections;
