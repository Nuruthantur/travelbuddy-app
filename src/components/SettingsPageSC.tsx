import dbConnect from "@/utils/dbConnect";
import SettingsPageCC from "./SettingsPageCC";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UserModel from "@/models/User";

export default async function SettingsPageSC() {
  await dbConnect();
  const session = await getServerSession();
  // console.log("session settings :>> ", session);
  if (!session) {
    redirect("/login");
  }
  const email = session?.user?.email;
  // console.log("email set :>> ", email);

  const data = await UserModel.findOne({ email: email });
  if (!data) {
    redirect("/login");
  }
  // console.log("data settings:>> ", data);

  return <SettingsPageCC data={JSON.parse(JSON.stringify(data))} />;
}
