import React, { useEffect, useState } from "react";
import { Typography, Box, Stack, Button, TextField } from "@mui/material";
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
  const [customPrice, setCustomPrice] = useState("0");

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

    let price = event.price;
    if (event.isFree) {
      if (customPrice !== "") {
        price = parseFloat(customPrice);
      } else {
        price = 0;
      }
    }

    const response: CheckoutResponse = await checkoutOrder({
      eventTitle: event.title,
      eventId: event._id,
      price: price,
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
      {event.isFree ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Tickets are free, but event hosts would appreciate your support!
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              type="number"
              label="Enter Amount"
              variant="outlined"
              value={customPrice}
              onChange={(e) => setCustomPrice(e.target.value)}
            />
            <Button
              onClick={onCheckout}
              variant="contained"
              color="primary"
              size="large"
            >
              Get Ticket
            </Button>
          </Stack>
        </Box>
      ) : (
        <Button
          onClick={onCheckout}
          variant="contained"
          color="primary"
          size="large"
        >
          Buy Ticket
        </Button>
      )}
    </Box>
  );
};

export default Checkout;
