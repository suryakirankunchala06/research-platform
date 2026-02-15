import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  const { question } = req.body;

  try {
    // TEMP dynamic response
    const answer = `You asked about "${question}". This is a generated response.`;

    res.json({ answer });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Chat failed" });
  }
});

export default router;