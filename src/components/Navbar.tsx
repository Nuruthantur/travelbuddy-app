"use client";
import React, { useState } from "react";
import Link from "next/link";
import { CiSettings } from "react-icons/ci";
import { CiHome } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { RiUserAddLine } from "react-icons/ri";
import { signOut, useSession } from "next-auth/react";
import { sign } from "crypto";
import ToggleMode from "./ToggleMode";

const Navbar = () => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
    setShowDropdown(false);
  };
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setShowUserDropdown(false);
  };

  const { data: session }: any = useSession();

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 ">
      {session && (
        <>
          {session.user?.email}
          <button
            onClick={() => {
              signOut();
            }}
            className="p-2 px-5 -mt-1 bg-blue-800 rounded-full"
          >
            Logout
          </button>
        </>
      )}
      <Link
        href="/login"
        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        Login
      </Link>
      <Link
        href="/signup"
        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        Signup
      </Link>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div
          className="hidden w-full md:block md:w-auto"
          id="navbar-multi-level"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <div>
                <Link href="/">
                  <CiHome />{" "}
                </Link>
              </div>
            </li>
            <li>
              <div className="flex gap-10">
                <Link href="/dashboard">
                  <CiHeart />
                </Link>
              </div>
            </li>
            <li className="relative">
              <button
                onClick={toggleUserDropdown}
                className="flex items-center justify-between w-full py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                <RiUserAddLine />{" "}
              </button>
              {showUserDropdown && (
                <div
                  id="dropdownNavbar"
                  className="z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow absolute right-0 mt-2 w-44 dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownLargeButton"
                  >
                    <li>
                      <Link
                        href="/"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Connections
                      </Link>
                    </li>
                    <li aria-labelledby="dropdownNavbarLink">
                      <button
                        id="doubleDropdownButton"
                        type="button"
                        className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Requests
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center justify-between w-full py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                <CiSettings />{" "}
              </button>
              {showDropdown && (
                <div
                  id="dropdownNavbar"
                  className="z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow absolute right-0 mt-2 w-44 dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownLargeButton"
                  >
                    <li>
                      <Link
                        href="/"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Edit Profile
                      </Link>
                    </li>
                    <li aria-labelledby="dropdownNavbarLink">
                      <ToggleMode />
                    </li>
                    <li>
                      <Link
                        href="/"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                  <div className="py-1">
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Delete Account
                    </Link>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
