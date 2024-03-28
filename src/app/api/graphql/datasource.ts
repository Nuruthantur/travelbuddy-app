import UserModel from "@/models/User";
import { MongoDataSource } from "apollo-datasource-mongodb";
import { ObjectId } from "mongodb";

interface UserDocument {
  _id: ObjectId;
  email: string;
  password: string;
  userName: string;
}

export default class Users extends MongoDataSource<UserDocument> {
  async getAllUsers() {
    try {
      return await UserModel.find();
    } catch (error) {
      throw new Error("failed to fetch users");
    }
  }

  async createUser({ input }: any) {
    try {
      return await UserModel.create({ ...input });
    } catch (error) {
      throw new Error("failed to create user");
    }
  }
}
