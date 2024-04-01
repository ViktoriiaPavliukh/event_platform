"use client";
import React from "react";
import { IEvent } from "@/lib/database/models/event.model";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import Card from "./Card";

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
  return (
    <>
      {data.length > 0 ? (
        <Box>
          {" "}
          <List component="ul">
            {data.map((event) => {
              const hasOrderLink = collectionType === "Events_Organised";
              const hidePrice = collectionType === "My_tickets";

              return (
                <ListItem component="li" key={event._id}>
                  <Card
                    event={event}
                    hasOrderLink={hasOrderLink}
                    hidePrice={hidePrice}
                  />
                </ListItem>
              );
            })}
            {/* <ListItem component="li">
              <ListItemText primary="Item 1" />
            </ListItem>
            <ListItem component="li">
              <ListItemText primary="Item 2" />
            </ListItem>
            <ListItem component="li">
              <ListItemText primary="Item 3" />
            </ListItem> */}
          </List>
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
