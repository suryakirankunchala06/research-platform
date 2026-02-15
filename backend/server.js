import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import uploadRoutes from "./routes/uploadRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS
app.use(cors({
  origin: "*",
}));

// Body limits
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Routes
app.use("/api/upload", uploadRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/chat", chatRoutes);

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});