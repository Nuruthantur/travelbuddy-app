import User from "@/@types/User";
import LikedUsersList from "@/components/LikedUsers";
import UserModel from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function likes() {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  const usersEmail = session?.user?.email;
  await dbConnect();

  const loggedInUser: User = await UserModel.findOne({
    email: usersEmail,
  });
  if (!loggedInUser) {
    return;
  }

  const likedUserIds = await UserModel.aggregate([
    { $match: { email: loggedInUser.email } }, // Match the loggedInUser
    { $project: { likes: 1, _id: 0 } }, // Project only the "likes" field
    { $unwind: "$likes" }, // Unwind the "likes" array to access individual IDs
    { $group: { _id: null, likedUserIds: { $addToSet: "$likes" } } }, // Gather unique IDs
  ]);
  if (!likedUserIds) {
    return;
  }
  if (likedUserIds.length > 0) {
    const likedUserIdsArray = likedUserIds[0].likedUserIds;
    console.log(likedUserIdsArray); // Output: Array of unique liked user IDs
  }

  // this would retrieve all users who have liked at least one other user LOL
  // const likedUsers: User[] = await UserModel.find({
  //   users: { $in: [{ likes: "" }] },
  // }).select("-password");

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
