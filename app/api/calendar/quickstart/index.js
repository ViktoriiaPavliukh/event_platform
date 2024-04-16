/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint-disable camelcase */
// [START calendar_quickstart]
const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");

// If modifying these scopes, delete token.json.
const SCOPES = [
  "https://www.googleapis.com/auth/calendar.events",
  "https://www.googleapis.com/auth/calendar",
];

// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "../../../../calendar.json");

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
export async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

// /**
//  * Lists the next 10 events on the user's primary calendar.
//  * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
//  */
// async function listEvents(auth) {
//   const calendar = google.calendar({ version: "v3", auth });
//   const res = await calendar.events.list({
//     calendarId: "primary",
//     timeMin: new Date().toISOString(),
//     maxResults: 10,
//     singleEvents: true,
//     orderBy: "startTime",
//   });
//   const events = res.data.items;
//   if (!events || events.length === 0) {
//     console.log("No upcoming events found.");
//     return;
//   }
//   console.log("Upcoming 10 events:");
//   events.forEach((event, i) => {
//     const start = event.start.dateTime || event.start.date;
//     console.log(`${start} - ${event.summary}`);
//   });
// }

async function checkCalendarAccess(auth, calendarId) {
  const calendar = google.calendar({ version: "v3", auth });
  try {
    const response = await calendar.calendarList.get({ calendarId });
    console.log(response);
    const accessRole = response.data.accessRole;
    console.log(`Access role for calendar ${calendarId}: ${accessRole}`);
    return accessRole;
  } catch (error) {
    console.error("Error checking calendar access:", error.message);
    throw error;
  }
}

/**
 * Creates a new event on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */

export default async function createCalendarEvent(auth, event) {
  const calendarId = "primary"; // Calendar ID
  try {
    const accessRole = await checkCalendarAccess(auth, calendarId);
    if (accessRole === "writer" || accessRole === "owner") {
      const calendar = google.calendar({ version: "v3", auth });
      const insertedEvent = await calendar.events.insert({
        auth: auth,
        calendarId: calendarId,
        resource: event,
      });
      console.log("Event created: %s", insertedEvent.data.htmlLink);
    } else {
      console.log("User does not have write access to the calendar.");
    }
  } catch (error) {
    console.error("Error creating event:", error.message);
    throw error;
  }
}

// async function createEvent(auth) {
//   const calendarId = "primary"; // Calendar ID
//   try {
//     const accessRole = await checkCalendarAccess(auth, calendarId);
//     if (accessRole === "writer" || accessRole === "owner") {
//       const event = {
//         summary: "Google I/O 2024",
//         location: "800 Howard St., San Francisco, CA 94103",
//         description: "A chance to hear more about Google's developer products.",
//         start: {
//           dateTime: "2024-06-28T17:00:00+01:00", // Adjusted start time for London timezone
//           timeZone: "Europe/London",
//         },
//         end: {
//           dateTime: "2024-06-29T01:00:00+01:00", // Adjusted end time for London timezone
//           timeZone: "Europe/London",
//         },
//         recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
//         attendees: [
//           { email: "lpage@example.com" },
//           { email: "sbrin@example.com" },
//         ],
//         reminders: {
//           useDefault: false,
//           overrides: [
//             { method: "email", minutes: 24 * 60 },
//             { method: "popup", minutes: 10 },
//           ],
//         },
//       };

//       const calendar = google.calendar({ version: "v3", auth });
//       calendar.events.insert(
//         {
//           auth: auth,
//           calendarId: calendarId,
//           resource: event,
//         },
//         function (err, event) {
//           if (err) {
//             console.error("Error creating event:", err);
//             return;
//           }
//           console.log("Event created: %s", event.data.htmlLink);
//         }
//       );
//     } else {
//       console.log("User does not have write access to the calendar.");
//     }
//   } catch (error) {
//     console.error("Error creating event:", error.message);
//   }
// }

authorize()
  .then((auth) => {
    // listEvents(auth);
    // createEvent(auth);
    createCalendarEvent(auth);
  })
  .catch(console.error);
