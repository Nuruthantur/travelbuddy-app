import dbConnect from "@/utils/dbConnect";
import UserModel from "@/models/User";
import { MyContext } from "./route";
import { GraphQLError } from "graphql";

//TODO - write a query that gives back the session of the user as getMe()
type param = {
  input: {
    email: string;
    password: string;
    userName: string;
  };
};

type updateUserInformation = {
  input: any;
  id: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  hometown: string;
  birthDate: Date;
  hobbies: string;
  aboutYourSelf: string;
  travelingDates: string;
  travelingDestinations: string;
};
type updateUserTravelingDates = {
  travelingDates?: string;
};

const resolvers = {
  Query: {
    getAllUsers: async (_: any, __: any, context: any) => {
      console.log("context :>> ", context);
      try {
        await dbConnect();
        const users = await UserModel.find({});
        return users;
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch users");
      }
    },
    users: async (parent: any, args: any, contextValue: MyContext) => {
      await dbConnect();
      // if (!contextValue.session || !contextValue.session.roles.includes('premiumUser')) return null;
      // return contextValue.models.User.getAll();
    },
    getUsersById: async (parent: any, args: { id: any }, contextValue: any) => {
      console.log("params :>> ", args);
      const user = UserModel.findById(args.id);
      console.log("user :>> ", user);
      return user;
    },
    testFunction: async (_: any, args: any, context: any) => {
      console.log(context);
      const { session } = context;
      console.log(session);
      session.something = "hello";
      return session.something;
    },
    getMe: async (_: any, args: param, context: MyContext) => {
      await dbConnect();
      if (!context.session) return null;
      console.log("this is the context session: ", context.session);
      // throw new Error("Not authenticated")
      // else return context.session.user;
      // const user = await UserModel.findById({});
      // return user;
    },
  },
  Mutation: {
    updateUserInformation: async (
      _: undefined,
      params: updateUserInformation
      // contextValue: MyContext
    ) => {
      console.log("params :>> ", params);
      // try {
      //   if (!contextValue.session) {
      //     return new GraphQLError("User is not authenticated to do that", {
      //       extensions: {
      //         code: "UNAUTHENTICATED",
      //         http: { status: 401 },
      //       },
      //     });
      //   }
      console.log("params.email :>> ", params.email);
      await dbConnect();
      const updatedUser = await UserModel.findOneAndUpdate(
        { email: params.email },

        // TODO - do this with the token and not the id (or get the session of a user from next auth)
        {
          $set: {
            firstName: params.input.firstName,
            lastName: params.input.lastName,
            userName: params.input.userName,
            email: params.input.email,
            hobbies: params.input.hobbies,
            birthDate: params.input.birthDate,
            aboutYourSelf: params.input.aboutYourSelf,
            travelingDates: params.input.travelingDates,
            travelingDestinations: params.input.travelingDestinations,
            userPicture: params.input.userPicture,
          },
        },
        { new: true }
      );
      console.log("updatedUser :>> ", updatedUser);
      return updatedUser;
      // if you want to check with message also change in the typeDefs to message instead of :User
      // return { message: "User Information updated" };
      // } catch (error) {
      //   console.log(error);
      // }
    },
    updateUserTravelingDates: async (
      _: undefined,
      args: updateUserTravelingDates,
      context: MyContext
    ) => {
      try {
        if (!context.session) {
          return new GraphQLError("User not logged in", {
            extensions: {
              code: "UNAUTHENTICATED",
              http: { status: 401 },
            },
          });
        }
        await dbConnect();
        const updatedUserWithNewTravelingDates =
          await UserModel.findByIdAndUpdate(
            {
              travelingDates: args.travelingDates,
            },
            { new: true }
          );
        // return updatedUserWithNewTravelingDates;
        return { message: "Travel dates successfully updated" };
      } catch (err) {
        console.log(err);
      }
    },
    signup: async (_: undefined, params: param) => {
      console.log(params);
      try {
        const userAlreadyExists = await UserModel.findOne({
          email: params.input.email,
        });
        if (userAlreadyExists) {
          throw new Error("User already exists");
        }
        await dbConnect();
        const newUser = await UserModel.create(params.input);
        return newUser;
      } catch (error) {
        console.log(error);
      }
    },
    deleteUser: async (_: undefined, params: any, context: any) => {
      console.log("params :>> ", params);
      await dbConnect();
      const deletedUser = await UserModel.findOneAndDelete({
        email: params.email,
      });
      return { message: `User ${deletedUser?.email} has been removed` };
      // return deletedUser;
      // search for messages of this user and delete them
    },
  },
};

export default resolvers;
