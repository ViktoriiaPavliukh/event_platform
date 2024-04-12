import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest,
  res: NextApiResponse) {
  // Extract necessary data from request body (e.g., event details, access token)
  const { event, accessToken } = req.body;

  // Create OAuth2 client
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  // Create Calendar API client
  const calendar = google.calendar({ version: "v3", auth });

  try {
    // Insert event into Google Calendar
    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: {
        summary: event.summary,
        description: event.description,
        start: { dateTime: event.start },
        end: { dateTime: event.end },
        // Add more event properties as needed
      },
    });

    // Send success response
    res.status(200).json(response.data);
  } catch (error) {
    // Send error response
    console.error("Error adding event to Google Calendar:", error);
    res.status(500).json({ error: "Failed to add event to Google Calendar" });
  }
}

// import { NextApiRequest, NextApiResponse } from "next";
// import { google } from "googleapis";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") {
//     return res.status(405).send({ message: "Only POST requests allowed" });
//   }

//   try {
//     const { accessToken, event } = req.body;
//     if (
//       !accessToken ||
//       !event ||
//       !event.summary ||
//       !event.start ||
//       !event.end
//     ) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }
//     const auth = new google.auth.OAuth2();
//     auth.setCredentials({ access_token: accessToken });

//     const calendar = google.calendar({ version: "v3", auth });

//     const response = await calendar.events.insert({
//       calendarId: "primary",
//       requestBody: {
//         summary: event.summary,
//         description: event.description,
//         start: {
//           dateTime: event.start,
//           timeZone: "Europe/London", // For UK timezone
//         },
//         end: {
//           dateTime: event.end,
//           timeZone: "Europe/London", // For UK timezone
//         },
//         // Additional event properties like 'location' can be added here
//       },
//     });

//     return res.status(200).json(response.data);
//   } catch (error) {
//     if (error instanceof Error) {
//       // Check if error is an instance of Error
//       console.error("Error adding event to calendar:", error);
//       return res.status(500).json({ error: error.message });
//     } else {
//       // Handle other types of errors
//       return res.status(500).json({ error: "An unknown error occurred" });
//     }
//   }
// }
