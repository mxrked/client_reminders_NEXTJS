/**
 *
 *  This is used to add the clients.json data to the database
 *
 */

import fs from "fs";
import path from "path";
import { connectToDB } from "@/utils/connectToDB";
import { startMonitoringJSONFile } from "./updateClientsDataToDB";

export default async function clientsDataToDB(req, res) {
  startMonitoringJSONFile();

  const JSON_FILE = path.join(
    __dirname,
    "../../../../public/data/json/clients.json"
  );

  try {
    // Read data from the JSON file
    const CLIENTS_DATA = JSON.parse(fs.readFileSync(JSON_FILE, "utf-8"));

    // Get all client_ID values from the JSON data
    const clientIDsInJSON = CLIENTS_DATA.map((client) => client.client_ID);

    // Establish a connection to MongoDB using your existing function
    const db = await connectToDB();

    // Specify the collection where you want to insert the data
    const collection = db.collection("clients");

    let insertedCount = 0;

    // Iterate through CLIENTS_DATA and insert only if it doesn't already exist
    for (const client of CLIENTS_DATA) {
      const existingClient = await collection.findOne({
        client_ID: client.client_ID,
      });

      if (!existingClient) {
        await collection.insertOne(client);
        insertedCount++; // Increment the count for each inserted document
      }
    }

    // Delete documents in the database that have client_ID not in the JSON data
    const deleteResult = await collection.deleteMany({
      client_ID: { $nin: clientIDsInJSON },
    });

    res.status(200).json({
      message: `${insertedCount} clients inserted.`,
      deletedCount: deleteResult.deletedCount,
    });
  } catch (error) {
    console.error("Error inserting client data:", error);
    res.status(500).json({ message: "Failed to insert client data" });
  }
}
