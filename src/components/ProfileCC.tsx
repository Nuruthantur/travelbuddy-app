"use client";

import React, { ChangeEvent, ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import image from "../img/full-background.png";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import DateRangePicker from "./DateRangePicker";
import { useSession } from "next-auth/react";
import { gql, useMutation } from "@apollo/client";
import { redirect } from "next/navigation";
import Link from "next/link";
import Navbar from "./Navbar";

// type Props = {
//   handleSubmit: any;
//   handleInputChange: any;
// };
const UPDATE_USER_INFORMATION = gql`
  mutation UpdateUserInformation(
    $input: UpdateUserInformation!
    $email: String!
  ) {
    updateUserInformation(input: $input, email: $email) {
      email
      userName
      firstName
      lastName
      birthDate
      travelingDates
      travelingDestinations
      hobbies
      aboutYourSelf
    }
  }
`;

function UpdateProfileCC({ data }: { data: any }) {
  console.log("data :>> ", data);
  const session = useSession();
  console.log("session update :>> ", session);
  const loggedInEmail = session?.data?.user?.email;
  const [updateUser] = useMutation(UPDATE_USER_INFORMATION);

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

  return (
    <>
      <div className="text-black text-lg text-violet-800">
        <div className="col-span-full">
          <div className="text-center bg-zinc-200 p-4  border-b-4 border-white">
            <h2 className="text-xl font-semibold leading-7 mt-4 mb-16 text-gray-900">
              Your Profile
            </h2>
          </div>
          <div className="flex justify-center ">
            {inputValues.userPicture ? (
              <img
                style={{
                  borderRadius: "50%",
                  width: "130px",
                  height: "130px",
                  marginTop: "-63px",
                  border: "4px solid white",
                }}
                src={inputValues.userPicture}
                alt=""
              />
            ) : (
              <UserCircleIcon
                style={{ width: "130px", marginTop: "-63px" }}
                className="text-white text-center bg-[#9bb6c9] rounded-full border-4 border-white"
                aria-hidden="true"
              />
            )}
          </div>

          <div className="flex justify-center rounded-lg px-6 py-3">
            <div className="text-center">
              <div className="text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative p-2 cursor-pointer rounded-xl bg-white font-semibold text-black focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2"
                >
                  <Link href={"/settings?view=update"}>
                    <span className="m-3">Update Profile</span>
                  </Link>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="border-b border-gray-900/10 pb-4">
            <div className="mt-4">
              <div className=" gap-2">
                <div className="sm:col-span-4 m-2">
                  <label
                    htmlFor="username"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Username
                  </label>
                  <p className="border-2 border-dashed border-gray-300 p-1">
                    {data.userName}
                  </p>
                </div>
                <div className="sm:col-span-4 m-2">
                  <label
                    htmlFor="email"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Email
                  </label>
                  <p className="border-2 border-dashed border-gray-300 p-1">
                    {data.email}
                  </p>
                </div>
                <div className="sm:col-span-4 m-2">
                  <label
                    htmlFor="firstname"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    First Name
                  </label>
                  <p className="border-2 border-dashed border-gray-300 p-1">
                    {data.firstName}
                  </p>
                </div>
                <div className="sm:col-span-4 m-2">
                  <label
                    htmlFor="lastname"
                    className="block  text-lg font-medium leading-6 text-gray-900"
                  >
                    Last Name
                  </label>
                  <p className="border-2 border-dashed border-gray-300 p-1">
                    {data.lastName}
                  </p>
                </div>
              </div>

              <div className="sm:col-span-4 m-2">
                <label
                  htmlFor="username"
                  className="block text-lg font-medium leading-6 text-gray-900"
                >
                  Date of Birth
                </label>
                <div>
                  <p className="border-2 border-dashed border-gray-300 p-1">
                    {data.birthDate}
                  </p>
                </div>
              </div>

              <div className="sm:col-span-3 m-2">
                <label
                  htmlFor="hobbies"
                  className="block text-lg font-medium leading-6 text-gray-900"
                >
                  Hobbies
                </label>
                <p className="border-2 border-dashed border-gray-300 p-1">
                  {data.hobbies}
                </p>
              </div>
              <div className="sm:col-span-3 m-2">
                <label
                  htmlFor="travelingDates"
                  className=" block text-lg font-medium leading-6 text-gray-900"
                >
                  Traveling Dates
                </label>
                <p className="border-2 border-dashed border-gray-300 p-1">
                  {data.travelingDates}
                </p>
              </div>

              <div className="sm:col-span-3 m-2">
                <label
                  htmlFor="travelingDestination"
                  className="block text-lg font-medium leading-6 text-gray-900"
                >
                  Traveling Destination
                </label>
                <p className="border-2 border-dashed border-gray-300 p-1">
                  {data.travelingDestinations}
                </p>
              </div>

              <div className="col-span-full m-2 mb-20">
                <label
                  htmlFor="about"
                  className="block text-lg font-medium leading-6 text-gray-900"
                >
                  About Yourself
                </label>
                <p className="border-2 border-dashed border-gray-300 p-1">
                  {data.aboutYourself}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </>
  );
}

export default UpdateProfileCC;
