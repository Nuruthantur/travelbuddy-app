"use client";

import User from "@/@types/User";
import { gql, useApolloClient, useQuery } from "@apollo/client";
import { getClient } from "@/lib/client";
import dbConnect from "@/utils/dbConnect";

const GET_ALL_USERS = gql`
  query getAllUsers {
    users {
      userName
      firstName
      lastName
      hometown
    }
  }
`;
async function UserCardCC({ onUserSelect }: any) {
  await dbConnect();
  const { loading, error, data } = useQuery(GET_ALL_USERS);
  console.log(loading, error, data);
  const users = data?.getAllUsers.users;
  //   const T = useApolloClient().readQuery<{ users: User[] }
  if (loading) return `Loading...`;
  if (error) return `Error!  ${error.message}`;
  return (
    <div style={{ border: "solid black 1px", padding: "0 1rem" }}>
      {/* <select name="user" onChange={onUserSelect}>
        { users && users.map((user: User) => {
          <option key={user._id} value={user.userName}>
            {user.userName}
          </option>;
        })}
      </select> */}
      <h1>hi mom</h1>
    </div>
  );
}
export default UserCardCC;

{
  /* <>
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
</>; */
}
