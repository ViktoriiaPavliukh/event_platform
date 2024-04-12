import React from "react";
import { google } from "googleapis";
import { IEvent } from "@/lib/database/models/event.model";

const addToCalendar = async (event: IEvent) => {
  try {
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const redirectUris = ["http://localhost:3000/api/auth/callback"];

    const oAuth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUris[0]
    );

    // if (!accessToken) {
    //   console.error("Missing access token. User needs to sign in with Google.");
    //   return; // Exit if no access token available
    // }

    // oAuth2Client.setCredentials({ access_token: accessToken });

    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

    const eventObject = {
      summary: event.title,
      description: event.description,
      start: {
        dateTime: event.startDateTime.toISOString(),
      },
      end: {
        dateTime: event.endDateTime.toISOString(),
      },
      // Consider adding location and other relevant properties if available
    };

    // const response = await calendar.events.insert({
    //   calendarId: "primary", // Change to specific calendar ID if needed
    //   resource: eventObject,
    // });

    // console.log(`Event added to calendar: ${response.data.htmlLink}`);
    // Handle success (e.g., show a confirmation message to the user)
  } catch (error) {
    console.error("Error adding event to calendar:", error);
    // Handle errors (e.g., display an error message to the user)
  }
};

export default addToCalendar;
