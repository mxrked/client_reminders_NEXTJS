/**
 *
 *  This is used to update the clients.json data to the database
 *
 */

import fs from "fs";
import path from "path";
import { connectToDB } from "@/utils/connectToDB";

// Function to update client data in the database
async function updateClientDataInDB(newClientData) {
  const db = await connectToDB();
  const collection = db.collection("clients");

  for (const newClient of newClientData) {
    // Update the database record based on a unique identifier (e.g., client_ID)
    await collection.updateOne(
      { client_ID: newClient.client_ID },
      { $set: newClient }
    );
  }
}

// Function to start monitoring the JSON file for changes
export async function startMonitoringJSONFile() {
  const JSON_FILE = path.join(
    __dirname,
    "../../../../public/data/json/clients.json"
  );

  fs.watchFile(JSON_FILE, async () => {
    try {
      // Read the updated data from the JSON file
      const updatedClientData = JSON.parse(fs.readFileSync(JSON_FILE, "utf-8"));

      // Update the MongoDB database with the new data
      await updateClientDataInDB(updatedClientData);

      console.log("Client data updated in the database.");
    } catch (error) {
      console.error("Error updating client data:", error);
    }
  });
}
