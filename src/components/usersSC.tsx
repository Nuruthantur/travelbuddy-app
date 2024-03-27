import { User } from "@/@types/User";
import dbConnect from "@/utils/dbConnect";
import React from "react";
import UserModel from "@/models/User";

type Props = {};

const UsersSC = async (props: Props) => {
  await dbConnect();
  const users = (await UserModel.find({})) as User[];
  console.log(users);
  return (
    <div style={{ border: "solid black 1px", padding: "0 1rem" }}>
      <h3>This is a test component on the server side</h3>
      <ul>
        {users.map((user) => {
          return (
            <>
              <div key={user._id.toString()}>
                <li>{user.firstName}</li>
                <li>{user.lastName}</li>
                <li>{user.email}</li>
                <li>{user.password}</li>
                <li>{user.userName}</li>
              </div>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default UsersSC;
