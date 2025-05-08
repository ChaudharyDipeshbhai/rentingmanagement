const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const dotenv = require("dotenv");
const dialogflow = require("@google-cloud/dialogflow");
const path = require("path");

// Correct path for videoRoutes.js (ensure it exists in the correct directory)
const videoRoutes = require('./videoRoutes');  // Ensure this path is correct

// Load environment variables
dotenv.config();

// Mapbox token
const MAPBOX_TOKEN = "pk.eyJ1IjoiaGV0a290aGFyaTIwMDUiLCJhIjoiY201ZjM4NXl3MmEyYzJrcjczbWc3a243NCJ9.yUinVTqWdA4XnlpH45TpBQ"; // Replace with your Mapbox token

// Firebase Admin SDK setup
const serviceAccount = require("./firebase-adminsdk.json"); // Replace with your Firebase Admin SDK JSON file
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/api', videoRoutes); // Mount videoRoutes

// Dialogflow setup
const projectId = "apartment-bot-denb"; // Replace with your Dialogflow project ID
const keyFilePath = path.join(__dirname, "path-to-your-service-account.json"); // Replace with your Dialogflow service account JSON
const sessionClient = new dialogflow.SessionsClient({ keyFilename: keyFilePath });

// Chat endpoint to handle messages from frontend
app.post("/chat", async (req, res) => {
  const { message } = req.body;
  const sessionId = "unique-session-id"; // Use a unique session ID per user
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: "en-US",
      },
    },
  };

  try {
    const [response] = await sessionClient.detectIntent(request);
    const responseText = response.queryResult.fulfillmentText;
    res.json({ response: responseText || "I didn't quite get that." });
  } catch (error) {
    console.error("Dialogflow error:", error);
    res.status(500).json({ response: "Error processing your request." });
  }
});

// Mapbox Geocoding API for place suggestions
app.get("/api/suggestions", async (req, res) => {
  const query = req.query.query;

  if (!query) return res.status(400).json({ error: "Query parameter is required" });

  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${MAPBOX_TOKEN}`
    );
    res.json(response.data.features);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
});

// Mapbox Directions API for routes
app.get("/api/route", async (req, res) => {
  const { startLng, startLat, endLng, endLat } = req.query;

  if (!startLng || !startLat || !endLng || !endLat) {
    return res.status(400).json({ error: "All coordinates are required" });
  }

  try {
    const response = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${startLng},${startLat};${endLng},${endLat}?geometries=geojson&access_token=${MAPBOX_TOKEN}`
    );
    res.json(response.data.routes[0].geometry);
  } catch (error) {
    console.error("Error fetching route:", error);
    res.status(500).json({ error: "Failed to fetch route" });
  }
});

// Apartment management APIs
app.get("/api/apartments", async (req, res) => {
  const status = req.query.status;
  let query = db.collection("apartments");

  if (status) query = query.where("status", "==", status);

  try {
    const snapshot = await query.get();
    const apartments = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(apartments);
  } catch (error) {
    res.status(500).json({ error: "Error fetching apartments" });
  }
});

app.post("/api/apartments", async (req, res) => {
  const { price, status, amenities } = req.body;
  try {
    const newApartment = await db.collection("apartments").add({ price, status, amenities });
    res.status(201).json({ id: newApartment.id });
  } catch (error) {
    res.status(500).json({ error: "Error adding apartment" });
  }
});

app.put("/api/apartments/:id", async (req, res) => {
  const { id } = req.params;
  const { price, status, amenities } = req.body;

  try {
    await db.collection("apartments").doc(id).update({ price, status, amenities });
    res.json({ message: "Apartment updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating apartment" });
  }
});

// Assign tenant to apartment
app.put("/api/assign-tenant", async (req, res) => {
  const { apartmentId, tenantId } = req.body;

  try {
    await db.collection("apartments").doc(apartmentId).update({ tenantId });
    await db.collection("tenants").doc(tenantId).update({ apartmentId });
    res.json({ message: "Tenant assigned successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error assigning tenant" });
  }
});

// Fetch tenants
app.get("/api/tenants", async (req, res) => {
  try {
    const snapshot = await db.collection("tenants").get();
    const tenants = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(tenants);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tenants" });
  }
});

// User registration
app.post("/register", async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await admin.auth().createUser({ email, password });
    await db.collection("users").doc(user.uid).set({ email, role });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Fetch user data
app.get("/user/:uid", async (req, res) => {
  try {
    const doc = await db.collection("users").doc(req.params.uid).get();
    if (!doc.exists) return res.status(404).json({ error: "User not found" });
    res.json(doc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Root endpoint
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
