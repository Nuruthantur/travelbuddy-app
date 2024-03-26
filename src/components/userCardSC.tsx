"use client";

import { gql, useQuery } from "@apollo/client";
import User from "@/@types/User";
import { getClient } from "@/lib/client";

type QueryRes = {
  users: User[];
};

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const GETALLUSERS = gql`
  query User {
    users {
      userName
      firstName
      lastName
      homeTown
    }
  }
`;

const UserCardSC = async ({ searchParams }: Props) => {
  const data = await getClient().query<QueryRes>({
    query: GETALLUSERS,
    variables: {
      userName: searchParams.userName ? searchParams.userName : "",
      firstName: searchParams.firstName ? searchParams.firstName : "",
      lastName: searchParams.lastName ? searchParams.lastName : "",
      homeTown: searchParams.homeTown ? searchParams.homeTown : "",
    },
  });

  const userinfo = data.data.users;
  console.log("userinfo", userinfo);
  return (
    <>
      <div className="user-card bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-col sm:justify-between sm:items-center">
        <div className="user-profile-picture mb-4">
          <img
            src="user.profilePicture"
            className="w-24 h-24 rounded-full"
            alt="Profile Picture"
          />
        </div>
        <div className="user-actions flex">
          <button
            id="like-btn"
            onClick={() => {
              console.log("button was clicked");
            }}
            className="like-btn bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600"
          >
            Like
          </button>
          <button
            id="next-btn"
            onClick={() => {
              console.log("next button was clicked");
            }}
            className="next-btn bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Next
          </button>
        </div>
        <div className="user-information">
          <div>
            Name:{" "}
            <span id="user-name" className="font-bold">
              Users name goes here
            </span>
          </div>
          <div>
            Age: <span id="user-age">Age</span>
          </div>
          <div>
            Distance: <span id="user-distance">Distance from user?</span>
          </div>
          <div>
            Bio: <span id="user-bio">Bio</span>
          </div>
        </div>
      </div>
      ;
    </>
  );
};
export default UserCardSC;
