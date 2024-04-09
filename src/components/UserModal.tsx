"user client";
import User from "@/@types/User";
import { SetStateAction } from "react";
import UserImage from "./UserImage";

type Props = {
  user: User;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
  closeModalOnClickOutside: () => void;
};

const UserModal: React.FC<Props> = ({
  user,
  isModalOpen,
  setIsModalOpen,
  closeModalOnClickOutside,
}) => {
  //   const closeModalOnClickOutside = (event: MouseEvent) => {
  //     closeModal();
  //   };

  const closeModal = () => {
    console.log("button has been clicked!");
    setIsModalOpen(false);
    document.removeEventListener("click", closeModalOnClickOutside);
  };
  if (!isModalOpen) {
    return null;
  }

  return (
    <div className=" fixed flex items-center justify-center z-10 ">
      <div className="flex flex-col justify-center items-start bg-white rounded-lg p-6 h-1/2 ">
        <div className="flex self-center ">
          <UserImage user={user} />
        </div>
        <h2 className="text-lg ">Username: {user.userName}</h2>
        <h2 className="mt-4 text-lg">
          Full name: {user.firstName}
          {user.lastName}
        </h2>
        <h2 className="mt-4 text-lg">
          Some info about yourself:{" "}
          {user.aboutYourSelf ? user.aboutYourSelf : "not provided"}
        </h2>
        <h2 className="mt-4 text-lg">
          Hobbies:{" "}
          {user.hobbies ? user.hobbies : "I don't have any hobbies (ಥ◡ಥ)"}
        </h2>
        <h2 className="mt-4 text-lg">
          Hometown: {user.hometown ? user.hometown : "unknown"}
        </h2>

        <button
          className=" flex self-center mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium text-lg"
          onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default UserModal;
