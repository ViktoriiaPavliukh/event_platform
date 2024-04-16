import { NextApiRequest, NextApiResponse } from "next";
import { authorize } from "./calendar/quickstart";
import createCalendarEvent from "./calendar/quickstart";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Fetch the auth object
      const auth = await authorize();

      // Assuming req.body contains the event details
      const { event } = req.body;
      if (!event || !auth) {
        return res
          .status(400)
          .json({ error: "Event data and auth are required" });
      }

      // Create the event
      await createCalendarEvent(auth, event);

      // Respond with a success message
      res.status(201).json({ message: "Event created successfully" });
    } catch (error) {
      console.error("Error creating event:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    // Handle unsupported methods
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
