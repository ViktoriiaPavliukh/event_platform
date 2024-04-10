import { google } from "googleapis";
import { Request, Response } from "express";

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);

const scopes = ["https://www.googleapis.com/auth/calendar"];

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: "offline",

  // If you only need one scope you can pass it as a string
  scope: scopes,
});

export const redirectToGoogleOAuth = (req: Request, res: Response) => {
  res.redirect(url);
};

export const handleGoogleOAuthCallback = async (
  req: Request,
  res: Response
) => {
  const code = req.query.code as string;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    // You can save the tokens to a database or use them to make API requests
    console.log("Tokens:", tokens);
    res.send("Authorization successful!");
  } catch (error) {
    console.error("Error exchanging code for tokens:", error);
    res.status(500).send("Error occurred during authorization process.");
  }
};

// // Create an OAuth2 client
// const oAuth2Client = new google.auth.OAuth2(
//   CLIENT_ID,
//   CLIENT_SECRET,
//   REDIRECT_URI
// );

// // Set the OAuth2 credentials
// oAuth2Client.setCredentials({
//   access_token: USER_ACCESS_TOKEN,
//   refresh_token: USER_REFRESH_TOKEN,
//   // Optionally, you can also set expiry_date and token_type
// });

// // Create a new calendar instance
// const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

// // Define event data
// const event = {
//   summary: "Event Title",
//   location: "Event Location",
//   description: "Event Description",
//   start: {
//     dateTime: "2022-04-10T09:00:00",
//     timeZone: "America/New_York",
//   },
//   end: {
//     dateTime: "2022-04-10T17:00:00",
//     timeZone: "America/New_York",
//   },
// };

// // Add the event to Google Calendar
// calendar.events.insert(
//   {
//     calendarId: "primary",
//     resource: event,
//   },
//   (err, res) => {
//     if (err) {
//       console.error("Error adding event:", err);
//       return;
//     }
//     console.log("Event added:", res.data);
//   }
// );
