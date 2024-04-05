import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";

import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

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
    const currentSession = await getServerSession(authOptions);
    // const currentSession = await getServerSession(req.headers.cookie);
    console.log("currentsession", currentSession);
    return { session: currentSession };
  },
});
console.log("🚀 Server listening at: ", handler);

export { handler as GET, handler as POST };
