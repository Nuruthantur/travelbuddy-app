import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession(); //in server component
  if (!session) {
    redirect("/");
  }
  return <div>dashboard</div>;
};

export default Dashboard;