// "use client";

import { gql, useQuery } from "@apollo/client";
import User from "@/@types/User";
import { getClient } from "@/lib/client";
import dbConnect from "@/utils/dbConnect";
import UserModel from "@/models/User";
import Image from "next/image";

type QueryRes = {
  users: User[];
};

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const GETALLUSERS = gql`
  query getAllUsers {
    email
    userName
    firstName
    lastName
    hometown
  }
`;

const UserCardSC = async ({ searchParams }: Props) => {
  await dbConnect();
  const data = await getClient().query<QueryRes>({
    query: GETALLUSERS,
    variables: {
      email: searchParams.email ? searchParams.email : "",
      userName: searchParams.userName ? searchParams.userName : "",
      firstName: searchParams.firstName ? searchParams.firstName : "",
      lastName: searchParams.lastName ? searchParams.lastName : "",
      hometown: searchParams.hometown ? searchParams.hometown : "",
    },
  });

  const userinfo = data.data.users;
  console.log("userinfo", userinfo);
  return (
    <>
      <div className="user-card bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-col sm:justify-between sm:items-center">
        {/* <div className="user-profile-picture mb-4">
          <Image
            src="user.profilePicture"
            alt={`Profile picture of ${userinfo[0].userName}`}
            className="w-24 h-24 rounded-full"
            width={24}
            height={24}
            loading="lazy"
          />
        </div> */}

        <div className="user-information">
          <div>
            Name:{" "}
            <span id="userName" className="font-bold">
              {userinfo[0].firstName && userinfo[0].lastName}
            </span>
          </div>
          <div>
            Email: <span id="email">{userinfo[0].email}</span>
          </div>
          <div>
            Hometown: <span id="hometown">{userinfo[0].hometown}</span>
          </div>
        </div>
        <div className="user-actions flex pt-4">
          <button
            id="like-btn"
            className="like-btn bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600">
            Like
          </button>
          <button
            id="next-btn"
            className="next-btn bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
            Next
          </button>
        </div>
      </div>
      ;
    </>
  );
};
export default UserCardSC;

// VERSION 2 GOES HERE

// type Props = {};

// const UserCardSC = async (props: Props) => {
//   const users = (await UserModel.find({})) as User[];

//   // const { loading, error, data } = useQuery();

//   return (
//     <div className="users-page flex flex-wrap">
//       {users.map((user) => (
//         <div
//           className="user-card bg-white shadow-md rounded-lg p-4 m-4 w-1/3"
//           key={user._id}
//         >
//           {/* profile picture doesn't exist yet */}
//           <div className="user-profile-picture mb-4">
//             <img
//               src="https://via.assets.so/img.jpg?w=150&h=150&tc=blue&bg=#cecece
// "
//               className="w-32 h-32 rounded-full"
//               alt="Profile Picture"
//             />
//           </div>
//           <div className="user-information">
//             <div>
//               Name:
//               <span id="name" className="font-bold">
//                 {user.firstName && user.lastName}
//               </span>
//             </div>

//             <div>
//               Email: <span id="email">{user.email}</span>
//             </div>
//             <div>
//               Hometown: <span id="hometown">{user.hometown}</span>
//             </div>
//           </div>
//           <div className="user-actions flex pt-4">
//             <button
//               id="like-btn"
//               className="like-btn bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600"
//             >
//               Like
//             </button>
//             <button
//               id="next-btn"
//               className="next-btn bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };
// export default userCardSC;
