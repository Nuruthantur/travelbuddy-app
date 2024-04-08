"use client";
import User from "@/@types/User";
import dbConnect from "@/utils/dbConnect";
import UserModel from "@/models/User";
import React from "react";
import { Button } from "./Button";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// type Props = {};
interface LikedUsersListProps {
  allLikedUsers: User[];
}
const LikedUsersList: React.FC<LikedUsersListProps> = ({ allLikedUsers }) => {
  return (
    <div style={{ border: "solid black 1px", padding: "0 1rem" }}>
      <h3>Here is a list your liked users</h3>
      <ul>
        {allLikedUsers.map((user) => {
          return (
            <>
              <div
                key={user._id.toString()}
                className="flex justify-center border flex-col rounded-sm p-4 mb-2 mt-4 shadow-md sm:w-full  ">
                <h3 className="text-xl font-medium">{`${user.firstName} ${user.lastName}`}</h3>
                <p>About me: {user.aboutYourSelf}</p>
                <p className="text-md font-light">{user.email}</p>
                <p className="text-md font-light">{user.userName}</p>

                <Button>Message</Button>
              </div>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default LikedUsersList;
