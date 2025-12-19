import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  post: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  comment: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.models.Comment ||
  mongoose.model("Comment", commentSchema);
