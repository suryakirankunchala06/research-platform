import express from "express";

const router = express.Router();

// TEMP: simulate real search
router.get("/", async (req, res) => {
  const q = req.query.q;

  try {
    // For now, just return mock but different from static
    const results = [
      { text: `Result 1 related to "${q}"` },
      { text: `Result 2 related to "${q}"` },
      { text: `Result 3 related to "${q}"` },
    ];

    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Search failed" });
  }
});

export default router;