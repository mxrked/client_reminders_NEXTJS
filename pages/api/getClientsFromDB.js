/**
 *
 *  This is used to get clients from the database.
 *
 */

import { connectToDB } from "@/utils/connectToDB";
import clientsDataToDB from "./clientsDataToDB";

export default async function getClientsFromDB(req, res) {
  try {
    // await clientsDataToDB(req, res);

    // Establish a connection to MongoDB using your existing function
    const db = await connectToDB();

    // Specify the collection where client data is stored
    const collection = db.collection("clients");

    // Fetch all clients from the collection
    const clients = await collection.find().toArray();

    res.status(200).json(clients);
  } catch (error) {
    console.error("Error fetching client data:", error);
    res.status(500).json({ message: "Failed to fetch client data" });
  }
}
