import mongoose from "mongoose";

const chunkSchema = new mongoose.Schema({
  text: String,
});

export default mongoose.model("Chunk", chunkSchema);