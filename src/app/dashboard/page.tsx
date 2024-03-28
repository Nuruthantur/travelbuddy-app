import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession(); //in server component
  if (!session) {
    redirect("/");
  }
  return <div>dashboard //TODO - create cards that show the other user</div>;
};

export default Dashboard;
