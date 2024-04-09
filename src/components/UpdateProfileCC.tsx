"use client";

import React, { ChangeEvent, ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import image from "../img/full-background.png";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import DateRangePicker from "./DateRangePicker";
import { useSession } from "next-auth/react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

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
    firstName: data.firstName,
    lastName: data.lastName,
    birthDate: data.birthDate,
    travelingDates: data.travelingDates,
    travelingDestinations: data.travelingDestinations,
    hobbies: data.hobbies,
    aboutYourself: data.aboutYourself,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (value === "") {
      return setInputValues({ ...inputValues, [name]: data[name] });
    }
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("inputValues :>> ", inputValues);
    try {
      await updateUser({
        variables: {
          email: loggedInEmail,
          input: inputValues,
        },
      });
      console.log("User information updated successfully.");
      const inputs = document.querySelectorAll("input");
      inputs.forEach((input) => {
        input.value = "";
      });
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  const handleDateChange = (newDate: string) => {
    setInputValues({
      ...inputValues,
      travelingDates: newDate,
    });
  };
  //?----------------------------------------------------------------

  return (
    <>
      <form onSubmit={handleSubmit} style={{ fontSize: "19px" }}>
        <div className="col-span-full">
          <div className="text-center bg-zinc-200 p-4  border-b-4 border-white">
            <h2 className="text-xl font-semibold leading-7 mt-4 mb-16 text-gray-900">
              Your Profile
            </h2>
          </div>
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
                  <span className="m-3">Change Photo</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                  />
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
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Username
                  </label>
                  <div>
                    <div className="flex rounded-md shadow-sm ring-2 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="userName"
                        id="username"
                        className="block rounded-lg bg-white flex-1 border-0  py-1.5 pl-1 text-gray-900 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                        // value={inputValues.userName}
                        placeholder={inputValues.userName}
                        onChange={(e) => handleInputChange(e)}
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-4 m-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email
                  </label>
                  <div>
                    <div className="flex rounded-md shadow-sm ring-2 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="block rounded-lg bg-white flex-1 border-0  py-1.5 pl-1 text-gray-900 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                        // value={inputValues.email}
                        placeholder={inputValues.email}
                        onChange={(e) => handleInputChange(e)}
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-4 m-2">
                  <label
                    htmlFor="firstname"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First Name
                  </label>
                  <div>
                    <div className="flex rounded-md shadow-sm ring-2 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="firstName"
                        id="firstname"
                        className="block bg-white rounded-lg flex-1 border-0 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                        // value={inputValues.firstName}
                        placeholder={inputValues.firstName}
                        onChange={(e) => handleInputChange(e)}
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-4 m-2">
                  <label
                    htmlFor="lastname"
                    className="block  text-sm font-medium leading-6 text-gray-900"
                  >
                    Last Name
                  </label>
                  <div>
                    <div className="flex rounded-md shadow-sm ring-2 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="lastName"
                        id="lastname"
                        className="block bg-white rounded-lg flex-1 border-0  py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        // value={inputValues.lastName}
                        placeholder={inputValues.lastName}
                        onChange={(e) => handleInputChange(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4 m-2">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Date of Birth
                </label>
                <div>
                  <div className="flex rounded-md shadow-sm ring-2 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="date"
                      name="birthDate"
                      id="birthdate"
                      className="block rounded-lg bg-white flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      // value={inputValues.birthDate}
                      placeholder={inputValues.birthDate}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-3 m-2">
                <div className="sm:col-span-3 mt-2">
                  <label
                    htmlFor="hobbies"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Hobbies
                  </label>
                  <div>
                    <input
                      type="text"
                      name="hobbies"
                      id="hobbies"
                      className="block w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      // value={inputValues.hobbies}
                      placeholder={inputValues.hobbies}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </div>
                </div>
                <div className="sm:col-span-3 mt-2">
                  <label
                    htmlFor="travelingDates"
                    className=" block text-sm font-medium leading-6 text-gray-900"
                  >
                    Traveling Dates
                  </label>
                  <div>
                    <DateRangePicker
                      defaultDates={
                        inputValues.travelingDates
                          ? inputValues.travelingDates
                          : undefined
                      }
                      handleChange={handleDateChange}
                    />
                  </div>
                </div>
                {/* <div className="sm:col-span-3 mt-2">
                  <label
                    htmlFor="travelingDates"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Traveling Dates
                  </label>
                  <div>
                    Render CustomDateRangePicker with appropriate props
                    <DateRangePicker
                      selectedRange={inputValues.travelingDates}
                      handleSelect={(range) => {
                        setInputValues({
                          ...inputValues,
                          travelingDates: `${range.startDate.toDateString()} - ${range.endDate.toDateString()}`,
                        });
                      }}
                      placeholder={inputValues.travelingDates}
                    />{" "}
                    
                  </div>
                </div> */}

                <div className="sm:col-span-3 mt-2">
                  <label
                    htmlFor="travelingDestination"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Traveling Destination
                  </label>
                  <div>
                    <input
                      type="text"
                      name="travelingDestination"
                      id="travelingDestination"
                      className="block w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      // value={inputValues.travelingDestinations}
                      placeholder={inputValues.travelingDestinations}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full m-2">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  About Yourself
                </label>
                <div>
                  <input
                    id="about"
                    name="aboutYourself"
                    // rows={3}
                    className="block bg-white w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    // value={inputValues.aboutYourself}
                    placeholder={inputValues.aboutYourself}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-between p-2 gap-x-6 border-b border-gray-900/10 pb-4">
          <button
            type="button"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-[#7676e1] px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
      <div className="details flex items-center justify-center mt-6 mb-3">
        <Image src={image} alt="travel" style={{ width: "100px" }} priority />
        <div>
          <p
            style={{
              marginLeft: "20px",
              color: "white",
            }}
          >
            Travel Buddy
          </p>
        </div>
      </div>
    </>
  );
}

export default UpdateProfileCC;
