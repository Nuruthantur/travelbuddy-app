"use client";
import User from "@/@types/User";
import { gql, useQuery } from "@apollo/client";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
} from "react";

const getAllUsers = gql`
query Users {
  getAllUsers {
    aboutYourSelf
    email
    hobbies
    firstName
    id
    lastName
    travelingDates
    travelingDestinations
    userName
    birthDate
  }
}
`;
export default function TestComponent() {

  const { loading, error, data } = useQuery(getAllUsers);
  console.log(" loading :>> ", loading);
  console.log(" data :>> ", data);
  console.log(" error :>> ", error);
  return (
    <div
      style={{ border: "solid black 1px", padding: "0 1rem" }}
      className="text-black"
    >
      <h1>here is a list of all users</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <ul>
        {data?.getAllUsers.map(
          (user: {
            id: Key | null | undefined;
            userName:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | Promise<AwaitedReactNode>
              | null
              | undefined;
            email:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | Promise<AwaitedReactNode>
              | null
              | undefined;
          }) => {
            return (
              <>
                <div key={user.id}>
                  <li>{user.userName}</li>
                  <li>{user.email}</li>
                </div>
              </>
            );
          }
        )}
      </ul>
    </div>
  );
}
