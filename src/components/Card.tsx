"use client";
import TinderCard from "react-tinder-card";
import "./Cards.css";
import User from "@/@types/User";
import pushIdToLikesArray from "@/utils/pushIdToLikesArray";
import { useSession } from "next-auth/react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import UserModal from "./UserModal";

type Props = {
  user: User;
};

const Card: React.FC<Props> = ({ user }: Props) => {
  const session = useSession();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.addEventListener("click", closeModalOnClickOutside);
  };
  // const testingDocument = document;
  // console.log(testingDocument);

  const closeModalOnClickOutside = () => {
    setIsModalOpen(false);
    document.removeEventListener("click", closeModalOnClickOutside);
  };

  const onSwipe = async (direction: any) => {
    if (direction === "right") {
      if (typeof session?.data?.user?.email != "string") return;

      try {
        const result = await pushIdToLikesArray(
          user._id,
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
  // const MyComponent = user?.userPicture;
  //TODO - after all cards have been swiped there should be either a message or a refetch of all cards

  return (
    <>
      <TinderCard
        key={user._id}
        className="absolute h-10 pressable "
        onSwipe={onSwipe}
        flickOnSwipe={true}
        onCardLeftScreen={() => onCardLeftScreen("Card")}
        preventSwipe={["up", "down"]}>
        <div
          className="flex flex-col relative w-[600px] max-w-[85vw] h-[50vh] bg-cover bg-center p-5 rounded-[20px] text-white;
"
          style={{
            backgroundImage: user.userPicture
              ? `url(${user.userPicture})`
              : "url(https://placehold.jp/250x250.png)",
          }}

          // style={{
          //   background: "none",
          //   backgroundColor: "blue",
          // }}
        >
          <button onClick={openModal}>
            <InformationCircleIcon className="h-10 w-10 text-black-100 text-black" />
          </button>

          <div>
            <h3 className="absolute  text-black"></h3>
          </div>
          <h3 className="absolute bottom-[10px] text-[black]">
            Name: {user.firstName} {user.lastName}
          </h3>
        </div>
      </TinderCard>
      <UserModal
        user={user}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        closeModalOnClickOutside={closeModalOnClickOutside}
      />
    </>
  );
};

export default Card;
