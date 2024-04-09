"use client";
import User from "@/@types/User";
import React from "react";
import { Button } from "./button";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import dbConnect from "@/utils/dbConnect";
import UserModel from "@/models/User";
import UserImage from "./UserImage";

type Props = {};

const LikedUsersList = async (props: Props) => {
  await dbConnect();
  const users = (await UserModel.find({})) as User[];

  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  const usersEmail = session?.user?.email;

  const loggedInUser: User = await UserModel.findOne({
    email: usersEmail,
  });

  if (!loggedInUser) {
    return;
  }

  const likedUserIds = await UserModel.aggregate([
    { $match: { email: loggedInUser.email } }, // match loggedInUser
    { $project: { likes: 1, _id: 0 } }, // only project likes field of that user
    { $unwind: "$likes" }, // Unwind the "likes" array to access individual IDs
    { $group: { _id: null, likedUserIds: { $addToSet: "$likes" } } }, // get ids of liked users
  ]);
  if (!likedUserIds) {
    return;
  }
  let allLikedUsers: User[] = [];
  if (likedUserIds.length > 0) {
    const likedUsers = await Promise.all(
      likedUserIds[0].likedUserIds.map(async (likedUserId: User) => {
        return await UserModel.findById(likedUserId).select("-password");
      })
    );
    console.log(likedUsers); // Array of liked user objects
    allLikedUsers = likedUsers;
  }

interface Props {
  users: User[];
}
const LikedUsersList = ({ users }: Props) => {
  return (
    <div style={{ border: "solid black 1px", padding: "0 1rem" }}>
      <h3>Here is a list your liked users</h3>

      <ul>
        {users.map((user) => {
          return (
            <>
              <div
                key={user._id.toString()}
                className="flex justify-center border flex-col rounded-sm p-4 mb-2 mt-4 shadow-md sm:w-full  "
              >
                <h3 className="text-xl font-medium">{`${user.firstName} ${user.lastName}`}</h3>
                <UserImage user={user} />

                <p>About me: {user.aboutYourSelf}</p>
                <p className="text-md font-light">{user.email}</p>
                <p className="text-md font-light">{user.userName}</p>

                <Button
                  onClick={(e) => {
                    console.log("button has been clicked" + e);
                  }}>
                  Message
                </Button>
              </div>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default LikedUsersList;
