"use client";
import User from "@/@types/User";
import React from "react";
import { Button } from "./Button";
import UserImage from "./UserImage";

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
                className="flex justify-center border flex-col rounded-sm p-4 mb-2 mt-4 shadow-md sm:w-full  ">
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
