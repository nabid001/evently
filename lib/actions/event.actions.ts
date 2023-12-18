"use server";

import { connectToDatabase } from "../mongodb/database";
import Event from "../mongodb/models/event.model";
import User from "../mongodb/models/user.model";
import { handleError } from "../utils";
import { CreateEventParams } from "@/types";

export const createEvent = async ({
  event,
  userId,
  path,
}: CreateEventParams) => {
  try {
    await connectToDatabase();

    const organizer = await User.findById(userId);

    if (!organizer) {
      throw new Error("Organizer not found");
    }

    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: userId,
    });

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
};
