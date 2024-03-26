import UserModel from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";

import { NextRequest, NextResponse } from "next/server";

const POST = async (request: NextRequest) => {
  const { email, password, userName } = await request.json();
  await connect();
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return new NextResponse("Email already registered", {
      status: 400,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new UserModel({
    email,
    password: hashedPassword,
    userName,
  });
  try {
    await newUser.save();
    return new NextResponse("user is registered", {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error, {
      status: 500,
    });
  }
};

export default POST;
