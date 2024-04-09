import dbConnect from "@/utils/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/config/cloudinary";

const POST = async (request: NextRequest) => {
  // const { email, password, userName } = await request.json();
  const values = await request.json();
  console.log("values :>> ", values);
  await dbConnect();
  const existingUser = await UserModel.findOne({ email: values.email });
  if (existingUser) {
    console.log("existingUser :>> ", existingUser);
    return NextResponse.json("Email already registered", {
      status: 400,
    });
  }

  console.log("values.email :>> ", values.email);
  console.log("values.userPicture :>> ", values.userPicture);

  const cloudPicture = values.userPicture
    ? await uploadImage(values.userPicture)
    : "";
  let userImage;
  console.log("cloudPicture :>> ", cloudPicture);
  if (cloudPicture) {
    userImage = cloudPicture.secure_url;
  } else {
    userImage =
      "https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg";
  }

  const hashedPassword = await bcrypt.hash(values.password, 5);
  console.log("hashedPassword :>> ", hashedPassword);
  const newUser = new UserModel({
    ...values,
    password: hashedPassword,
    authType: "credentials",
    userPicture: userImage,
  });
  console.log("newUser :>> ", newUser);
  try {
    await newUser.save();
    return NextResponse.json("user is registered", {
      status: 200,
    });
  } catch (error: any) {
    console.log("error :>> ", error);
    return NextResponse.json(error.message, {
      status: 500,
    });
  }
};

export { POST };
