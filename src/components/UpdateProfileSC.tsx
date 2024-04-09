import UpdateProfileCC from "./UpdateProfileCC";
import dbConnect from "@/utils/dbConnect";
import UserModel from "@/models/User";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function UpdateProfileSC() {
  await dbConnect();
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  const email = session?.user?.email;
  console.log("email :>> ", email);

  const data = await UserModel.findOne({ email: email });
  if (!data) {
    redirect("/login");
  }
  console.log("data :>> ", data);

  return <UpdateProfileCC data={JSON.parse(JSON.stringify(data))} />;
}
