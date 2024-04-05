"use client";

import { gql, useMutation } from "@apollo/client";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      message
    }
  }
`;

const page = async ({ userId }) => {
  const session = getServerSession();
  // console.log("session settings :>> ", session);
  const [deleteUser] = useMutation(DELETE_USER);
  const handleDeleteUser = async () => {
    try {
      const { data } = await deleteUser({
        variables: { id: userId },
      });
      alert(data.deleteUser.message);
      // Handle any other logic after deletion if needed
    } catch (error) {
      // Handle errors if any
      console.error("Error deleting user:", error);
    }
  };
  console.log("userEmail :>> ", userId);
  return (
    <div className="col-span-full">
      <h2 className="text-2xl text-center mt-7 p-1 font-semibold leading-7 text-gray-900 bg-white">
        SETTINGS
      </h2>
      <div className="text-center bg-zinc-200 p-10 border-b-4 border-white "></div>
      <div className="flex justify-center ">
        <UserCircleIcon
          style={{ width: "130px", marginTop: "-63px" }}
          className="text-white text-center bg-[#9bb6c9] rounded-full border-4 border-white"
          aria-hidden="true"
        />
      </div>

      <div className="flex justify-center rounded-lg px-6 py-3">
        <div className="text-center">
          <div className="text-sm leading-6 text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative p-2 cursor-pointer rounded-xl bg-white font-semibold text-black focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2"
            >
              <Link href="/settings/update">
                <span className="m-3 text-base">EDIT PROFILE</span>
              </Link>
            </label>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-2xl p-1 pl-5 font-semibold leading-7 mt-20 mb-6 text-gray-900 bg-white">
          PREFERNCES
        </h2>
        <ul className="m-2 font-semibold">
          <li className="text-black text-xl m-3">Dark Mode</li>
          <li className="text-black text-xl m-3">Language</li>
        </ul>
      </div>
      <div className="flex flex-col static">
        <div className="flex flex-col absolute bottom-0 w-full">
          <button className="btn btn-active btn-primary mt-6 ml-2 mr-2 text-base font-semibold">
            SIGN OUT
          </button>
          <button
            onClick={handleDeleteUser}
            className="btn btn-error mt-2 ml-2 mr-2 mb-3 text-base font-semibold"
          >
            DELETE ACCOUNT
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
