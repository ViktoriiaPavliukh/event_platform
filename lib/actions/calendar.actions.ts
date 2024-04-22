import axios from "axios";

interface Event {
  summary: string;
  description: string;
  start: {
    dateTime: string;
  };
  end: {
    dateTime: string;
  };
}

export async function addEventToGoogleCalendar(
  event: Event,
  accessToken: string,
  userEmail: any
) {
  try {
    const calendarId = userEmail;
    const res = await axios.post(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
      event,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error adding event to Google Calendar:", error);
    throw new Error("Failed to add event to Google Calendar.");
  }
}
