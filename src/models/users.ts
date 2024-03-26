import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    birthDate: { type: Date, required: false },
    aboutYourself: { type: String, required: false },
    travelingDates: { type: String, required: false },
    travelingDestinations: { type: String, required: false },
    hobbies: { type: String, required: false },
    // profilePicture: { type: String, required: false },
    // public_id: { type: String, required: false },
    // hometown: { type: Date, required: true },
    // travelDates: { type: Date, required: true },
    // likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    // requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    // connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true }
);

const UserModel = mongoose.models.user || mongoose.model("user", userSchema);

export default UserModel;
