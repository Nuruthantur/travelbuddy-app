// "use client";
import { useState } from "react";
import TinderCard from "react-tinder-card";
import "./Cards.css";
import User from "@/@types/User";
import { gql } from "@apollo/client";
import dbConnect from "@/utils/dbConnect";
import { getClient } from "@/lib/client";

type QueryRes = {
  users: User[];
};

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};
export const GETALLUSERS = gql`
  query getAllUsers {
    email
    userName
    firstName
    lastName
    homeTown
  }
`;
const Card1 = async ({ searchParams }: Props) => {
  await dbConnect();

  const people = await getClient().query<QueryRes>({
    query: GETALLUSERS,
    variables: {
      userName: searchParams.userName ? searchParams.userName : "",
      firstName: searchParams.firstName ? searchParams.firstName : "",
      lastName: searchParams.lastName ? searchParams.lastName : "",
      homeTown: searchParams.homeTown ? searchParams.homeTown : "",
    },
  });

  //   const [people, setPeople] = useState([
  //     {
  //       name: "Oliver Mayer",
  //       id: "Oliver",
  //       url: "https://via.assets.so/img.jpg?w=250&h=250&tc=blue&bg=#cecece",
  //     },
  //     {
  //       name: "Steve Jobs",
  //       id: "Steve",
  //       url: "https://via.assets.so/img.jpg?w=250&h=250&tc=blue&bg=#cecece",
  //     },
  //     {
  //       name: "Tom Turbo>",
  //       id: "Tom",
  //       url: "https://via.assets.so/img.jpg?w=250&h=250&tc=blue&bg=#cecece",
  //     },
  //   ]);

  const onSwipe = (direction: any) => {
    console.log("You swiped: " + direction);
  };

  const onCardLeftScreen = (myIdentifier: any) => {
    console.log(myIdentifier + " left the screen");
  };

  return (
    <div>
      <div className="flex justify-center my-3">
        <h1>Tinder Cards in React</h1>

        {/* {data?.users.map((person: User) => ( */}
        {people.map((person: User) => (
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
              style={{ backgroundImage: `url(${person.userPicture})` }}>
              <h3 className="absolute bottom-[10px] text-[white]">
                {person.firstName} {person.lastName}
              </h3>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
};

export default Card1;
