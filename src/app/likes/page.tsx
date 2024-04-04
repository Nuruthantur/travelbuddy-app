import Card from "@/components/Card";
import LikedUsersList from "@/components/LikedUsers";
import UserCardCC from "@/components/UserCardCC";
import TestComponent from "@/components/testComponentCC";
import UserCardSC from "@/components/userCardSC";
import UsersSC from "@/components/usersSC";
import UserModel from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import { User, getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function likes() {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  await dbConnect();
  const likedUsers: User[] = await UserModel.find().select("-password");
  console.log(likedUsers);
  return (
    <>
      <div className="text-black flex justify-center flex-col items-center ">
        <h1>Cards go here </h1>

        <div className="flex  my-3">
          <LikedUsersList />
        </div>
      </div>
    </>
  );
}
