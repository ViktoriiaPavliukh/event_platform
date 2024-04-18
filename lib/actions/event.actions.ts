"use server";
import { revalidatePath } from "next/cache";
import {
  CreateEventParams,
  GetAllEventsParams,
  UpdateEventParams,
  DeleteEventParams,
  GetEventsByUserParams,
  GetRelatedEventsByCategoryParams,
} from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Event from "../database/models/event.model";
import Category from "../database/models/category.model";

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: "i" } });
};

const populateEvent = (query: any) => {
  return query
    .populate({
      path: "organiser",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({ path: "category", model: Category, select: "_id name" });
};
export async function createEvent({ userId, event, path }: CreateEventParams) {
  try {
    await connectToDatabase();
    const organiser = await User.findById(userId);

    if (!organiser) {
      throw new Error("Organiser not found");
    }

    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organiser: userId,
    });

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
}

export async function getEventById(eventId: string) {
  try {
    await connectToDatabase();

    const event = await populateEvent(Event.findById(eventId));

    if (!event) throw new Error("Event not found");

    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    handleError(error);
  }
}

export async function getAllEvents({
  query,
  limit = 6,
  page,
  category,
}: GetAllEventsParams) {
  try {
    await connectToDatabase();

    const titleCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {};
    const categoryCondition = category
      ? await getCategoryByName(category)
      : null;
    const conditions = {
      $and: [
        titleCondition,
        categoryCondition ? { category: categoryCondition._id } : {},
      ],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const events = await populateEvent(eventsQuery);
    const eventsCount = await Event.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// export async function updateEvent({ userId, event, path }: UpdateEventParams) {
//   console.log("userId:", userId);
//   console.log("event:", event);
//   console.log("path:", path);
//   try {
//     console.log("userId:", userId);
//     console.log("event:", event);
//     console.log("path:", path);
//     await connectToDatabase();

//     const eventToUpdate = await Event.findById(event._id);
//     if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
//       throw new Error("Unauthorized or event not found");
//     }

//     const updatedEvent = await Event.findByIdAndUpdate(
//       event._id,
//       { ...event, category: event.categoryId },
//       { new: true }
//     );
//     revalidatePath(path);

//     return JSON.parse(JSON.stringify(updatedEvent));
//   } catch (error) {
//     handleError(error);
//   }
// }
export async function updateEvent({ userId, event, path }: UpdateEventParams) {
  try {
    console.log("Updating event with userId:", userId);
    console.log("Event data:", event);
    console.log("Path:", path);

    await connectToDatabase();

    // Log the event ID being updated
    console.log("Updating event with ID:", event._id);

    // Retrieve the event from the database
    const eventToUpdate = await Event.findById(event._id);

    // Log the retrieved event
    console.log("Retrieved event from database:", eventToUpdate);

    // Check if the event exists and if the user is authorized to update it
    if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
      throw new Error("Unauthorized or event not found");
    }

    // Log the updated event data before saving
    console.log("Updating event data:", event);

    // Update the event in the database
    const updatedEvent = await Event.findByIdAndUpdate(
      event._id,
      { ...event, category: event.categoryId },
      { new: true }
    );

    // Log the updated event after saving
    console.log("Updated event:", updatedEvent);

    // Revalidate the path
    revalidatePath(path);

    // Return the updated event
    return JSON.parse(JSON.stringify(updatedEvent));
  } catch (error) {
    // Log any errors that occur during the update process
    console.error("Error updating event:", error);

    // Handle the error
    handleError(error);
  }
}

export async function deleteEvent({ eventId, path }: DeleteEventParams) {
  try {
    await connectToDatabase();

    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (deletedEvent) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

export async function getRelatedEventsByCategory({
  categoryId,
  eventId,
  limit = 3,
  page = 1,
}: GetRelatedEventsByCategoryParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = {
      $and: [{ category: categoryId }, { _id: { $ne: eventId } }],
    };

    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const events = await populateEvent(eventsQuery);
    const eventsCount = await Event.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

export async function getEventsByUser({
  userId,
  limit = 6,
  page,
}: GetEventsByUserParams) {
  try {
    await connectToDatabase();

    const conditions = { organiser: userId };
    const skipAmount = (page - 1) * limit;

    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const events = await populateEvent(eventsQuery);
    const eventsCount = await Event.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
