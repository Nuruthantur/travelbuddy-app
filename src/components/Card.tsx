"use client";
import { useState } from "react";
import TinderCard from "react-tinder-card";
import "./Cards.css";
import User from "@/@types/User";
import dbConnect from "@/utils/dbConnect";
import UserModel from "@/models/User";
import { getServerSession } from "next-auth";
import pushIdToLikesArray from "@/utils/pushIdToLikesArray";
import { useSession } from "next-auth/react";

type Props = {
  person: User;
};

// export const GETALLUSERS = gql`
//   query getAllUsers {
//     id
//     userName
//     email
//     firstName
//     lastName
//     hometown
//   }
// `;

//TODO - remove the current user from the array of cards

const Card = ({ person }: Props) => {
  const session = useSession();
  console.log(session);
  const [likedUsers, setLikedUsers] = useState([]);

  const onSwipe = async (direction: any) => {
    // const currentUser = UserModel.findById({ _id: person._id });

    // console.log(currentUser);
    if (direction === "right") {
      if (typeof session?.data?.user?.email != "string") return;

      try {
        const result = await pushIdToLikesArray(
          person._id,
          session.data?.user?.email
        );
        console.log(result);
      } catch (error) {
        console.log("failed to swipe to right", error);
      }
    }

    if (direction === "left") {
      try {
        console.log("user has swiped left");
        //TODO - do something
      } catch (error) {
        console.log(error);
      }
    }

    console.log("You swiped: " + direction);
  };

  const onCardLeftScreen = (myIdentifier: any) => {
    console.log(myIdentifier + " left the screen");
    //NOTE - What happens with the card after it has left the screen
  };

  //TODO - after all cards have been swiped there should be either a message or a refetch of all cards

  return (
    <TinderCard
      key={person._id}
      className="absolute "
      onSwipe={onSwipe}
      flickOnSwipe={true}
      onCardLeftScreen={() => onCardLeftScreen("fooBar")}
      preventSwipe={["up", "down"]}>
      <div
        className="relative w-[600px] max-w-[85vw] h-[50vh] bg-cover bg-center shadow-[0px_18px_53px_0px_rgba(0,0,0,0.3)] p-5 rounded-[20px];
"
        style={{ backgroundImage: `url(https://placehold.jp/250x250.png)` }}
        // style={{ backgroundImage: `url(${person.userPicture})` }}
      >
        <h3 className="absolute  text-[black]">
          Name: {person.firstName} {person.lastName}
        </h3>
        <br />
        <h3 className="absolute bottom-[10px] text-[black]">
          Email: {person.email}
        </h3>
      </div>
    </TinderCard>
  );
};

export default Card;
