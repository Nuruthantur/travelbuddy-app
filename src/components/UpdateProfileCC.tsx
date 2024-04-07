"use client";

import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import Image from "next/image";
import image from "../img/full-background.png";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import DateRangePicker from "./DateRangePicker";
import { useSession } from "next-auth/react";

// const UPDATE_USER_INFORMATION = gql`
//   mutation UpdateUserInformation(
//     $input: UpdateUserInformation!
//     $email: String!
//   ) {
//     updateUserInformation(input: $input, email: $email) {
//       email
//       userName
//       firstName
//       lastName
//       birthDate
//       travelingDates
//       travelingDestination
//       hobbies
//       aboutYourself
//     }
//   }
// `;

// export default function UpdateProfile() {
//   const session = useSession();
//   console.log("session update :>> ", session);
//   const loggedInEmail = session?.data?.user?.email;
//   console.log("loggedInEmail :>> ", loggedInEmail);
//   const [updateUser, { loading, error, data }] = useMutation(
//     UPDATE_USER_INFORMATION
//   );
//   console.log("data :>> ", data);

//   const [userName, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [birthDate, setBirthDate] = useState("");
//   // const [city, setCity] = useState("");
//   const [travelingDates, setTravelingDates] = useState("");
//   const [hobbies, setHobbies] = useState("");
//   const [travelingDestination, setTravelingDestination] = useState("");
//   const [aboutYourself, setAboutYourself] = useState("");
//   console.log(
//     "email, userName, firstName, lastName :>> ",
//     email,
//     userName,
//     firstName,
//     lastName
//   );

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     const setters: {
//       [key: string]: React.Dispatch<React.SetStateAction<string>>;
//     } = {
//       username: setUserName,
//       email: setEmail,
//       firstname: setFirstName,
//       lastname: setLastName,
//       birthdate: setBirthDate,
//       travelingDates: setTravelingDates,
//       hobbies: setHobbies,
//       travelingDestination: setTravelingDestination,
//       aboutYourself: setAboutYourself,
//     };
//     const setter = setters[name];
//     if (setter) {
//       setter(value);
//     }
//   };

//   const handleSubmit = () => {
//     updateUser({
//       variables: {
//         input: {
//           email: email,
//           userName: userName,
//           firstName: firstName,
//           lastName: lastName,
//           birthDate: birthDate,
//           travelingDates: travelingDates,
//           travelingDestination: travelingDestination,
//           hobbies: hobbies,
//           aboutYourself: aboutYourself,
//         },
//         email: loggedInEmail,
//       },
//     })
//       .then(() => {
//         console.log("User information updated successfully.");
//         // Reset form fields after successful submission
//       })
//       .catch((error) => {
//         console.error("Error updating user information:", error);
//       });
//   };

// const handleChangeUser = () => {
//   updateUser({
//     variables: {
//       input: {
//         firstName: "",
//         lastName: "",
//       },
//       email: loggedInEmail,
//     },
//   });
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

export default function UpdateProfile() {
  const session = useSession();
  console.log("session update :>> ", session);
  const loggedInEmail = session?.data?.user?.email;
  const [updateUser, { data }] = useMutation(UPDATE_USER_INFORMATION);
  console.log("data.updateUserInformation :>> ", data);

  const [inputValues, setInputValues] = useState({
    email: "",
    userName: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    travelingDates: "",
    travelingDestinations: "",
    hobbies: "",
    aboutYourself: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await updateUser({
        variables: {
          email: loggedInEmail,
          input: inputValues,
        },
      });
      console.log("User information updated successfully.");
      // Reset form fields after successful submission
      setInputValues({
        email: "",
        userName: "",
        firstName: "",
        lastName: "",
        birthDate: "",
        travelingDates: "",
        travelingDestinations: "",
        hobbies: "",
        aboutYourself: "",
      });
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  return (
    <>
      {/* <button onClick={handleChangeUser} className="text-black">
        Update User
      </button> */}

      <form onSubmit={handleSubmit}>
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
                        placeholder=""
                        onChange={handleInputChange}
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
                        placeholder=""
                        onChange={handleInputChange}
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
                        className="block rounded-lg flex-1 border-0 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                        placeholder=""
                        onChange={handleInputChange}
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
                        className="block rounded-lg flex-1 border-0  py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder=""
                        onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder=""
                      onChange={handleInputChange}
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
                    <DateRangePicker />
                  </div>
                </div>
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
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder=""
                      onChange={handleInputChange}
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
                    placeholder=""
                    onChange={handleInputChange}
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
        <Image src={image} alt="travel" style={{ width: "100px" }} />
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
