"use client";
import React, { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { IEvent } from "@/lib/database/models/event.model";
import { loadStripe } from "@stripe/stripe-js";
import { checkoutOrder } from "@/lib/actions/order.actions";

interface CheckoutResponse {
  sessionId: string;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Checkout = ({ event, userId }: { event: IEvent; userId: string }) => {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  const onCheckout = async () => {
    const stripe = await stripePromise;
    if (!stripe) {
      console.error("Stripe is not initialized.");
      return;
    }

    const response: CheckoutResponse = await checkoutOrder({
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId,
    });

    const { error } = await stripe.redirectToCheckout({
      sessionId: response.sessionId,
    });

    if (error) {
      console.error("Error redirecting to checkout:", error);
    }
  };

  return (
    <Box>
      <Button
        onClick={onCheckout}
        variant="contained"
        color="primary"
        size="large"
      >
        {event.isFree ? "Get Ticket" : "Buy Ticket"}
      </Button>
    </Box>
  );
};

export default Checkout;
