import Image from "next/image";
import image from "../img/full-background.png";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import DateRangePicker from "./DateRangePicker";

export default function Details2() {
  return (
    <>
      <form>
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
                        name="username"
                        id="username"
                        autoComplete="username"
                        className="block rounded-lg bg-white flex-1 border-0  py-1.5 pl-1 text-gray-900 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                        placeholder=""
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
                        autoComplete="email"
                        className="block rounded-lg bg-white flex-1 border-0  py-1.5 pl-1 text-gray-900 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                        placeholder=""
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
                        name="firstname"
                        id="firstname"
                        autoComplete="firstname"
                        className="block rounded-lg flex-1 border-0  py-1.5 pl-1 text-gray-900 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                        placeholder=""
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
                        name="lastname"
                        id="lastname"
                        autoComplete="lastname"
                        className="block rounded-lg flex-1 border-0  py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder=""
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
                      name="birthdate"
                      id="birthdate"
                      autoComplete="birthdate"
                      className="block rounded-lg bg-white flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-3 m-2">
                {/* <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
                <div>
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>Germany</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div> */}
                <div className="sm:col-span-3 mt-2">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Hometown
                  </label>
                  <div>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                      autoComplete="travelingDestination"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block bg-white w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
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
