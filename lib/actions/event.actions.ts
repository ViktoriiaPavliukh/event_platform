"use server"

import { CreateEventParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Event from "../database/models/event.model";

export async function createEvent({ userId, event, path }: CreateEventParams) {
  try {
    await connectToDatabase();
    const organiser = await User.findById(userId);

    if(!organiser) {
      throw new Error("Organiser not found")
    }

    const newEvent = await Event.create({...event, category: event.categoryId, organiser: userId });

    return  JSON.parse(JSON.stringify(newEvent))
  } catch (error) {
    handleError(error);
  }
}