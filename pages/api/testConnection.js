/**
 *
 *  This is used to test the database connection
 *
 */

import { connectToDB } from "@/utils/connectToDB";

export default async function handler(req, res) {
  try {
    // Attempt to connect to the MongoDB database
    const DB = await connectToDB();
    console.log("MongoDB connection test successful");

    // Perform additional database operations if needed
    // ...

    res.status(200).json({ message: "MongoDB connection test successful" });
  } catch (error) {
    console.error("MongoDB connection test failed:", error);
    res.status(500).json({ message: "MongoDB connection test failed" });
  }
}
