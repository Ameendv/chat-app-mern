import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    userName: { type: String, required: true, default: "" },
    password: { type: String, required: true, minlength: 6 },
    gender: { type: String, required: true, enum: ["male", "female"] },
    profilePic: { type: String, default: "" },
  },
   { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const User = mongoose.model("User", userSchema);

export default User;
