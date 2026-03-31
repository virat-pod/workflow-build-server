import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  content: { type: String, required: true },
  xp: { type: Number, default: 10 },
  completed: { type: Boolean, default: false },
  from_user: {type: String, required: true},
}, { timestamps: true });

export default mongoose.model("Todo", todoSchema);