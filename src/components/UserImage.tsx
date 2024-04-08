import User from "@/@types/User";
import React from "react";
import Image from "next/image";
import image from "../img/placeholder.png";

interface UserImageProps {
  user: User;
}

const UserImage: React.FC<UserImageProps> = ({ user }) => {
  const userImage = user?.userPicture; // Access the userImage property from the user object

  return (
    <div>
      {userImage ? (
        <Image
          src={userImage}
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
