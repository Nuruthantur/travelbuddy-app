"use client";

import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "./Navbar";

const DELETE_USER = gql`
  mutation DeleteUser($email: String!) {
    deleteUser(email: $email) {
      message
    }
  }
`;

function page({ data }: { data: any }) {
  const [inputValues, setInputValues] = useState({
    email: data.email,
    userName: data.userName,
    userPicture: data.userPicture,
    firstName: data.firstName,
    lastName: data.lastName,
    birthDate: data.birthDate,
    travelingDates: data.travelingDates,
    travelingDestinations: data.travelingDestinations,
    hobbies: data.hobbies,
    aboutYourself: data.aboutYourself,
  });
  console.log("data set :>> ", data);
  const session = useSession();
  console.log("session:>> ", session);
  const email = session?.data?.user?.email;
  console.log("email yyyy:>> ", email);
  const handleLogOut = () => {
    signOut();
    redirect("/login");
  };
  const [deletedUser] = useMutation(DELETE_USER);
  const handleDeleteUser = () => {
    deletedUser({
      variables: {
        email: email,
      },
    });
    redirect("/login");
  };
  return (
    <>
      <div>
        <div className="text-center bg-zinc-200 p-4  border-b-4 border-white">
          <h2 className="text-xl font-semibold leading-7 mt-4 mb-16 text-gray-900">
            SETTINGS
          </h2>
        </div>
        <div className="flex justify-center ">
          {inputValues.userPicture ? (
            <img className="img" src={inputValues.userPicture} alt="" />
          ) : (
            <UserCircleIcon
              className="userCircle text-white text-center bg-[#9bb6c9] rounded-full border-4 border-white"
              aria-hidden="true"
            />
          )}
        </div>

        <div className="flex justify-center rounded-lg px-6 py-2">
          <div className="text-center">
            <div className="text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative p-2 cursor-pointer rounded-xl bg-white font-semibold text-black focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2"
              >
                {data.userName && data.lastName ? (
                  <Link href="/settings/update">
                    <span className="m-3 text-base">
                      {data.firstName} {data.lastName}
                    </span>
                  </Link>
                ) : (
                  <Link href="/settings/update">
                    <span className="m-3 text-base">{data.email}</span>
                  </Link>
                )}
              </label>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl p-1 pl-5 font-semibold leading-7 mt-7 mb-6 text-gray-900 bg-white">
            PROFILE
          </h2>
          <ul className="m-2 font-semibold">
            <Link href={"/settings/profile"}>
              <li className="text-black text-lg m-3">Your Profile</li>
            </Link>

            <Link href="/settings/update">
              <li className="text-black text-lg m-3">Update Profile</li>
            </Link>
          </ul>
        </div>
        <div>
          <h2 className="text-xl p-1 pl-5 font-semibold leading-7 mt-7 mb-6 text-gray-900 bg-white">
            PREFERNCES
          </h2>
          <ul className="m-2 font-semibold">
            <li className="text-black text-lg m-3">Dark Mode</li>
            <li className="text-black text-lg m-3">Language</li>
          </ul>
        </div>
        <div className="flex flex-col ">
          <div className="flex flex-col w-full">
            <button
              onClick={handleLogOut}
              className="btn btn-active btn-primary mt-6 ml-2 mr-2 text-base font-semibold"
            >
              LOG OUT
            </button>
            <button
              onClick={handleDeleteUser}
              className="btn btn-black mt-2 ml-2 mr-2 text-base font-semibold"
            >
              DELETE ACCOUNT
            </button>
          </div>
        </div>
      </div>
      <Navbar />
    </>
  );
}
export default page;
