import React from "react";
import SettingsPageCC from "../../components/SettingsPageCC";
import ProfileCC from "../../components/ProfileCC";
import dbConnect from "@/utils/dbConnect";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UserModel from "@/models/User";
import UpdateProfileCC from "@/components/UpdateProfileCC";

export default async function SettingsPage(props: any) {
  const view = props.searchParams.view;
  console.log("view :>> ", view);

  await dbConnect();
  const session = await getServerSession();
  console.log("session settings :>> ", session);
  if (!session) {
    redirect("/login");
  }
  const email = session?.user?.email;
  console.log("email set :>> ", email);

  const data = await UserModel.findOne({ email: email });
  if (!data) {
    redirect("/login");
  }
  // console.log("data settings:>> ", data);
  if (view === "update") {
    return <UpdateProfileCC data={JSON.parse(JSON.stringify(data))} />;
  } else if (view === "profile") {
    return <ProfileCC data={JSON.parse(JSON.stringify(data))} />;
  } else return <SettingsPageCC data={JSON.parse(JSON.stringify(data))} />;
}
