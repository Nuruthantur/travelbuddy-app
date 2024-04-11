"use client";

import React, { ChangeEvent, ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import image from "../img/full-background.png";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import DateRangePicker from "./DateRangePicker";
import { useSession } from "next-auth/react";
import { gql, useMutation } from "@apollo/client";
import { redirect } from "next/navigation";
import Navbar from "./Navbar";
import getBase64 from "@/utils/imagetobase64";

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
  const handleChangeInput = (event: {
    target: { name: any; checked: any; value: any };
  }) => {
    const fieldName = event.target.name;
    let fieldValue;
    if (fieldName === "agreeToTerms") {
      fieldValue = event.target.checked;
    } else {
      fieldValue = event.target.value;
    }
    setInputValues({ ...inputValues, [fieldName]: fieldValue });
  };
  const handleDateChange = (newDate: string) => {
    setInputValues({
      ...inputValues,
      travelingDates: newDate,
    });
  };
  const [profilePicture, setProfilePicture] = useState(inputValues.userPicture);
  // console.log("formData.userPicture :>> ", inputValues.userPicture);

  useEffect(() => {
    setProfilePicture(inputValues.userPicture);
  }, [inputValues.userPicture]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e target", e.target.files?.[0]);
    const file = e.target.files?.[0];
    if (file) {
      const base64 = (await getBase64(file)) as string;
      // console.log("base64", base64);
      handleChangeInput({
        target: {
          name: "userPicture",
          value: base64,
          checked: undefined,
        },
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ fontSize: "19px" }}>
        <div className="col-span-full">
          <div className="text-center bg-zinc-200 p-4  border-b-4 border-white">
            <h2 className="text-xl font-semibold leading-7 mt-4 mb-16 text-gray-900">
              Update Profile
            </h2>
          </div>
          {/* {profilePicture ? (
            <img src={profilePicture} alt="" />
          ) : ( */}
          <div className="flex justify-center ">
            {inputValues.userPicture ? (
              <img className="img" src={inputValues.userPicture} alt="" />
            ) : (
              <UserCircleIcon
                className="text-white text-center bg-[#9bb6c9] rounded-full border-4 border-white"
                aria-hidden="true"
              />
            )}
          </div>
          {/* )} */}

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
                    name="userPicture"
                    type="file"
                    className="sr-only"
                    onChange={handleFileSelect}
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
                <label
                  htmlFor="hobbies"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Hobbies
                </label>
                <div className="flex rounded-md shadow-sm ring-2 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="hobbies"
                    id="hobbies"
                    className="block bg-white rounded-lg flex-1 border-0 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                    // value={inputValues.hobbies}
                    placeholder={inputValues.hobbies}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
              </div>
              <div className="sm:col-span-3 m-2">
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

              <div className="sm:col-span-3 m-2">
                <label
                  htmlFor="travelingDestination"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Traveling Destination
                </label>
                <div className="flex rounded-md shadow-sm ring-2 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="travelingDestination"
                    id="travelingDestination"
                    className="block bg-white rounded-lg flex-1 border-0 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                    // value={inputValues.travelingDestinations}
                    placeholder={inputValues.travelingDestinations}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
              </div>

              <div className="col-span-full m-2">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  About Yourself
                </label>
                <div className="flex rounded-md shadow-sm ring-2 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="about"
                    name="aboutYourself"
                    // rows={3}
                    className="block bg-white rounded-lg flex-1 border-0 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                    // value={inputValues.aboutYourself}
                    placeholder={inputValues.aboutYourself}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex p-2 flex-col border-b border-gray-900/10 pb-4">
          <div className="flex justify-between mb-20">
            <button
              type="button"
              className="rounded-md bg-[#64748b] px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-[#cbd5e1] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              // onClick={redirect("/dashboard")}
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
        </div>
      </form>
      <Navbar />
    </>
  );
}

export default UpdateProfileCC;
