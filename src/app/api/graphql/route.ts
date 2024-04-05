import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";

import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export type MyContext = {
  session: any;
};


const server = new ApolloServer<MyContext>({
  resolvers,
  typeDefs,
});

const res = { getHeader() {}, setCookie() {}, setHeader() {} };


const handler = startServerAndCreateNextHandler(server, {
  context: async (req, res) => {
    console.log("req :>> ", req);

    const session = await getServerSession();
    // const session = await getServerSession(req, res, authOptions);
    // console.log("session :>> ", session);
    // return { session: null };

    console.log("session okej:>> ", session);
    return { session: session };
  context: async (req, res) => {
    const session = await getServerSession();
    // console.log("req, res", req, res);
    // console.log("current session: ", session?.user?.email);
    // const token = req.headers.authorization || '';
    // try to retrieve a user with the token

    return { session: session };
  },
});

console.log("🚀 Server listening at: ", handler);

export { handler as GET, handler as POST };
// export function GET(req: NextRequest) {
//   console.log("req.cookies GET :>> ", req.cookies);
//   return handler(req);
// }

// export function POST(req: NextRequest) {
//   console.log("req.cookies POST :>> ", req.cookies);
//   return handler(req);
// }
