"use client";

import User from "@/@types/User";
import { gql, useQuery } from "@apollo/client";

export default function TestComponentCC() {
  const getAllUsers = gql`
    query Users {
      users {
        _id
        userName
        email
      }
    }
  `;
  const { loading, error, data } = useQuery(getAllUsers);
  console.log(loading, error, data);
  return (
    <div style={{ border: "solid black 1px", padding: "0 1rem" }}>
      <h1>here is a list of all users</h1>
      <ul>
        {data?.users.map((user: User) => {
          return (
            <>
              <div key={user._id}>
                <li>{user.userName}</li>
                <li>{user.email}</li>
              </div>
            </>
          );
        })}
      </ul>
    </div>
  );
}
