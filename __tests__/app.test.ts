import { MongoClient, Db, ObjectId } from "mongodb";
import { connectToDatabase } from "../lib/database/index";
import {
  CreateCategoryParams,
  CreateEventParams,
  CreateOrderParams,
  DeleteEventParams,
} from "../types";
import Order from "../lib/database/models/order.model";
require("dotenv").config({ path: ".env.local" });

const TEST_DB = process.env.TEST_MONGODB_URI || "";

async function createEvent(db: Db): Promise<any> {
  const events = db.collection("events");
  const mockEvent: CreateEventParams = {
    userId: "1",
    event: {
      title: "Sample Event",
      description: "Description of Sample Event",
      location: "Sample Location",
      imageUrl: "https://example.com/image.jpg",
      startDateTime: new Date("2024-04-20T10:00:00Z"),
      endDateTime: new Date("2024-04-20T12:00:00Z"),
      categoryId: "categoryId",
      price: "50",
      isFree: false,
      url: "https://example.com/event",
    },
    path: "/events/1",
  };
  const result = await events.insertOne(mockEvent.event);
  const insertedEvent = await events.findOne({ _id: result.insertedId });
  return insertedEvent;
}

async function createUser(db: Db): Promise<any> {
  const users = db.collection("users");
  const mockUser = {
    clerkId: "1",
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    email: "johndoe@example.com",
    photo: "https://example.com/photo.jpg",
  };
  const result = await users.insertOne(mockUser);
  const insertedUser = await users.findOne({ _id: result.insertedId });
  return insertedUser;
}

describe("Database Connection", () => {
  test("should connect to the database", async () => {
    const db = await connectToDatabase();
    expect(db).toBeTruthy();
  });
});

describe("insert", () => {
  let connection: MongoClient;
  let db: Db;

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
    await db.collection("orders").deleteMany({});
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
        const { _id, ...categoryWithoutId } = category;
        await categories.insertOne(categoryWithoutId);
      })
    );

    const insertedCategories = await categories.find().toArray();
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

  it("should insert mock events into collection", async () => {
    const events = db.collection("events");

    const mockEvents: CreateEventParams[] = [
      {
        userId: "1",
        event: {
          title: "Sample Event 1",
          description: "Description of Sample Event 1",
          location: "Sample Location 1",
          imageUrl: "https://example.com/image1.jpg",
          startDateTime: new Date("2024-04-20T10:00:00Z"),
          endDateTime: new Date("2024-04-20T12:00:00Z"),
          categoryId: "categoryId1",
          price: "50",
          isFree: false,
          url: "https://example.com/event1",
        },
        path: "/events/1",
      },
    ];

    await Promise.all(
      mockEvents.map(async (event: CreateEventParams) => {
        await events.insertOne(event.event);
      })
    );

    const insertedEvents = await events.find().toArray();
    expect(insertedEvents.length).toBe(mockEvents.length);
    insertedEvents.forEach((insertedEvent, index) => {
      const expectedEvent = mockEvents[index].event;
      expect(insertedEvent).toEqual(expect.objectContaining(expectedEvent));
    });
  });

  it("should create a new order", async () => {
    const createdEvent = await createEvent(db);
    const createdBuyer = await createUser(db);

    const orderParams: CreateOrderParams = {
      stripeId: "mockStripeId",
      eventId: createdEvent._id.toString(),
      buyerId: createdBuyer._id.toString(),
      totalAmount: "100",
      createdAt: new Date(),
    };

    const createdOrder = await Order.create(orderParams);

    expect(createdOrder).toBeTruthy();
    expect(createdOrder.stripeId).toEqual(orderParams.stripeId);
    expect(createdOrder.totalAmount).toEqual(orderParams.totalAmount);
    expect(createdOrder.createdAt).toEqual(orderParams.createdAt);
  });
});
