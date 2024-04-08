import User from "@/@types/User";
import React from "react";
import Image from "next/image";
import image from "../img/placeholder.png";

interface UserImageProps {
  user: User;
}

const UserImage: React.FC<UserImageProps> = ({ user }) => {
  const existingUserImage = user?.userPicture;
  console.log("some process", process.env.PUBLIC_URL);
  return (
    <div>
      {existingUserImage ? (
        <Image
          src={existingUserImage}
          alt={`${user.firstName} ${user.lastName}`}
          width={800}
          height={800}
        />
      ) : (
        <Image src={image} alt="Placeholder image" width={800} height={800} />
      )}
    </div>
  );
};

export default UserImage;
