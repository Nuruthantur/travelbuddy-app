import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import dbConnect from "@/utils/dbConnect";
import Card from "@/components/Card";
import User from "@/@types/User";
import UserModel from "@/models/User";

const Dashboard = async () => {
  const session = await getServerSession(); //in server component
  if (!session) {
    redirect("/login");
  }

  await dbConnect();
  // in the find() do logic to not get me and user that are not liked yet
  const people: User[] = await UserModel.find().select("-password");
  // console.log(people);
  return (
    <div>
      <div className="flex justify-center my-3">
        <h1>Cards</h1>

        {people.map((person: User) => (
          <Card
            key={person.email}
            person={JSON.parse(JSON.stringify(person))}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
