import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, unique: true },
    authType: { type: String, required: true, enum: ["credentials", "google"] },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    birthDate: { type: Date, required: false },
    aboutYourSelf: { type: String, required: false },
    travelingDates: { type: String, required: false },
    travelingDestinations: { type: String, required: false },
    hobbies: { type: String, required: false },
    userPicture: { type: String, required: false },
    hometown: { type: String, required: false },
    public_id: { type: String, required: false },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true }
);

let UserModel: any;

try {
  UserModel = mongoose.model("user");
  UserModel = mongoose.model("user");
} catch {
  UserModel = mongoose.model("user", userSchema);
  UserModel = mongoose.model("user", userSchema);
}
// try {
//   UserModel = mongoose.model("user");
// } catch {
//   UserModel = mongoose.model("user", userSchema);
// }

export default UserModel;

// import mongoose, { Schema } from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     //define the structure of your documents within a MongoDB collection
//     userName: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     birthDate: { type: Date, required: true },
//     profilePicture: { type: String, required: false },
//     public_id: { type: String, required: false },
//     hometown: { type: Date, required: true },
//     travelDates: { type: Date, required: true },
//     likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
//     requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
//     connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
//   },
//   { timestamps: true }
// ); //store the timestamps of when the document was created and last updated.

// const UserModel = mongoose.model("user", userSchema); //creates a model from the schema. Name should be singularized.
// //A model is a class with which you construct documents.
