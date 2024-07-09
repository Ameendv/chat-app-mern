import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [{ type: mongoose.Types.ObjectId, ref: "Message", default: [] }],
  },
   { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
