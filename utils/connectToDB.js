/**
 *
 *  This is used to connect to the mongoDB database
 *
 */

import { MongoClient } from "mongodb";

const URI =
  "mongodb+srv://admin:client_reminders_DB_020700@clientreminders.18gqsln.mongodb.net/?retryWrites=true&w=majority";

export async function connectToDB() {
  let cachedClient = null;
  let cachedDb = null;

  if (cachedDb) {
    return cachedDb;
  }

  if (!cachedClient) {
    // Creating the connection
    cachedClient = new MongoClient(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      // Connecting
      await cachedClient.connect();
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to database: " + error);
      throw error;
    }
  }

  cachedDb = cachedClient.db(); // Get the database object

  return cachedDb;
}
