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

const getCategoryHierarchy = async (categoryId) => {
  const categories = await Category.aggregate([
    {
      $graphLookup: {
        from: 'categories', // The same collection
        startWith: '$_id',
        connectFromField: '_id',
        connectToField: 'parentId',
        as: 'subcategories',
        restrictSearchWithMatch: { _id: mongoose.Types.ObjectId(categoryId) },
      },
    },
  ]);

  return categories.flatMap(cat => [cat._id, ...cat.subcategories.map(sub => sub._id)]);
};


