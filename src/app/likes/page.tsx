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
  await dbConnect();

  const usersEmail = session?.user?.email;

  const loggedInUser: User = await UserModel.findOne({
    email: usersEmail,
  });

  if (!loggedInUser) {
    return;
  }

  const likedUserIds = await UserModel.aggregate([
    { $match: { email: loggedInUser.email } }, // match loggedInUser
    { $project: { likes: 1, _id: 0 } }, // only project likes field of that user
    { $unwind: "$likes" }, // Unwind the "likes" array to access individual IDs
    { $group: { _id: "$_id", likedUserIds: { $addToSet: "$likes" } } }, // get ids of liked users
  ]);
  if (!likedUserIds) {
    return;
  }
  let allLikedUsers: User[] = [];
  if (likedUserIds.length > 0) {
    const likedUsers = await Promise.all(
      likedUserIds[0].likedUserIds.map(async (likedUserId: User) => {
        return await UserModel.findById(likedUserId).select("-password");
      })
    );
    console.log("here are the liked users: ", likedUsers); // Array of liked user objects
    allLikedUsers = likedUsers;
  }

  return (
    <>
      <div className="text-black flex justify-center flex-col items-center ">
        <h1>Cards go here </h1>

        <div className="flex  my-3">
          <LikedUsersList users={allLikedUsers} />
        </div>
      </div>
    </>
  );
}
