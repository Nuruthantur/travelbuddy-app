"use server";
import UserModel from "@/models/User";
import mongoose, { Schema } from "mongoose";
import dbConnect from "./dbConnect";

async function pushIdToLikesArray(otherUserId: string, me: string) {
  console.log(otherUserId, me);
  try {
    await dbConnect();
    const addUserToLikes = await UserModel.findOneAndUpdate(
      { email: me },
      {
        $push: { likes: otherUserId },
      },
      { new: true }
    );
    console.log("ID successfully pushed to user array", addUserToLikes);
    return JSON.parse(JSON.stringify(addUserToLikes));
  } catch (error) {
    console.error(error);
  }
}

export default pushIdToLikesArray;
