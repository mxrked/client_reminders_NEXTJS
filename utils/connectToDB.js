/**
 *
 *  This is used to connect to the mongoDB database
 *
 */

import { MongoClient } from "mongodb";

const URI =
  "mongodb+srv://admin:client_reminders_DB_020700@clientreminders.18gqsln.mongodb.net/?retryWrites=true&w=majority";

let cachedClient = null;

export async function connectToDB() {
  if (!cachedClient) {
    try {
      // Creating the connection
      const client = new MongoClient(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      // Connecting
      await client.connect();
      console.log("Connected to MongoDB");
      cachedClient = client; // Cache the client object
    } catch (error) {
      console.error("Error connecting to database: " + error);
      throw error;
    }
  }

  return cachedClient.db(); // Get the database object
}
