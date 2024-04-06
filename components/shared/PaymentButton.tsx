"use client";
import React from "react";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { Typography, Box, Button } from "@mui/material";
import Link from "next/link";
import { IEvent } from "@/lib/database/models/event.model";
import Checkout from "./Checkout";

const PaymentButton = ({ event }: { event: IEvent }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const hasEventFinished = new Date(event.endDateTime) < new Date();
  console.log(userId);
  return (
    <Box>
      {hasEventFinished ? (
        <Typography>Sorry, tickets are no longer available.</Typography>
      ) : (
        <>
          <SignedOut>
            <Button>
              <Link href="/sign-in">Get Tickets</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Checkout event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </Box>
  );
};

export default PaymentButton;
