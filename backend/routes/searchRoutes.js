import express from "express";
import Chunk from "../models/Chunk.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const query = req.query.query;

    if (!query) {
      return res.status(400).json({ error: "Query missing" });
    }

    const results = await Chunk.find({
      text: { $regex: query, $options: "i" },
    }).limit(20);

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Search failed" });
  }
});

export default router;