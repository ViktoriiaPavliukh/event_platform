// api.test.js

import { connectToDatabase } from "../lib/database/index";
import mongoose from "mongoose";
const { MongoClient } = require("mongodb");
import { CreateCategoryParams, CreateEventParams } from "../types";
require("dotenv").config({ path: ".env.local" });

const TEST_DB = process.env.TEST_MONGODB_URI;

describe("Database Connection", () => {
  test("should connect to the database", async () => {
    const db = await connectToDatabase();
    expect(db).toBeTruthy();
  });
});

describe("insert", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(TEST_DB);
    db = await connection.db("Test-Event");
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await db.collection("users").deleteMany({});
    await db.collection("categories").deleteMany({});
    await db.collection("events").deleteMany({});
  });

  it("should insert a doc into collection", async () => {
    const users = db.collection("users");

    const mockUser = {
      clerkId: "1",
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "johndoe@example.com",
      photo: "https://example.com/photo.jpg",
    };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ clerkId: "1" });
    expect(insertedUser).toEqual(mockUser);
  });

  it("should insert mock categories into collection", async () => {
    const categories = db.collection("categories");

    const mockCategories: CreateCategoryParams[] = [
      { categoryName: "Technology" },
      { categoryName: "Fashion" },
      { categoryName: "Food" },
      { categoryName: "Travel" },
      { categoryName: "Sports" },
    ];

    mockCategories.sort((a, b) => a.categoryName.localeCompare(b.categoryName));

    await Promise.all(
      mockCategories.map(async (category: CreateCategoryParams) => {
        await categories.insertOne(category);
      })
    );

    const insertedCategories = await categories.find().toArray();
    // Sort insertedCategories alphabetically by categoryName
    insertedCategories.sort((a, b) =>
      a.categoryName.localeCompare(b.categoryName)
    );

    expect(insertedCategories.length).toBe(mockCategories.length);
    insertedCategories.forEach((insertedCategory, index) => {
      const expectedCategory = mockCategories[index];
      expect(insertedCategory.categoryName).toEqual(
        expectedCategory.categoryName
      );
    });
  });
  
  // it("should insert mock events into collection", async () => {
  //   const events = db.collection("events");

  //   const mockEvents: CreateEventParams[] = [
  //     {
  //       userId: "1",
  //       event: {
  //         title: "Sample Event 1",
  //         description: "Description of Sample Event 1",
  //         location: "Sample Location 1",
  //         imageUrl: "https://example.com/image1.jpg",
  //         startDateTime: new Date("2024-04-20T10:00:00Z"),
  //         endDateTime: new Date("2024-04-20T12:00:00Z"),
  //         categoryId: "categoryId1",
  //         price: "50",
  //         isFree: false,
  //         url: "https://example.com/event1",
  //       },
  //       path: "/events/1",
  //     },
  //     {
  //       userId: "2",
  //       event: {
  //         title: "Sample Event 2",
  //         description: "Description of Sample Event 2",
  //         location: "Sample Location 2",
  //         imageUrl: "https://example.com/image2.jpg",
  //         startDateTime: new Date("2024-04-21T09:00:00Z"),
  //         endDateTime: new Date("2024-04-21T11:00:00Z"),
  //         categoryId: "categoryId2",
  //         price: "0",
  //         isFree: true,
  //         url: "https://example.com/event2",
  //       },
  //       path: "/events/2",
  //     },
  //     // Add more mock events as needed
  //   ];

  //   await Promise.all(
  //     mockEvents.map(async (event: CreateEventParams) => {
  //       await events.insertOne(event);
  //     })
  //   );

  //   const insertedEvents = await events.find().toArray();
  //   expect(insertedEvents.length).toBe(mockEvents.length);
  //   insertedEvents.forEach((insertedEvent, index) => {
  //     const expectedEvent = mockEvents[index];
  //     expect(insertedEvent).toEqual(expectedEvent);
  //   });
  // });
});
