import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import dbConnect from "@/utils/dbConnect";
import Card from "@/components/Card";
import User from "@/@types/User";
import UserModel from "@/models/User";
import Navbar from "@/components/Navbar";
import ToggleMode from "@/components/ToggleMode";

const Dashboard = async () => {
  const session = await getServerSession(); //in server component
  if (!session) {
    redirect("/login");
  }
  await dbConnect();

  const loggedInUserEmail = session?.user?.email;

  const loggedInUser: User = await UserModel.findOne({
    email: loggedInUserEmail,
  });

  if (!loggedInUser) {
    return;
  }
  // using the find() method instead of the aggregate
  // const people: User[] = await UserModel.find({
  //   $or: [
  //     { email: { $ne: loggedInUser.email } },
  //     { _id: { $ne: loggedInUser._id } },
  //   ],
  // });;

  const users: User[] = await UserModel.aggregate([
    { $match: { email: { $ne: loggedInUser.email } } }, // all users but logged in user
  ]);

  return (
    <div>
      <div className="flex justify-center my-3">
        <h1>Cards</h1>

        {users.map((user: User) => (
          <Card key={user.email} user={JSON.parse(JSON.stringify(user))} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
