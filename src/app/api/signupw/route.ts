import { uploadImage } from "@/config/cloudinary";
import UserModel from "@/models/User";
import connect from "@/utils/dbConnect";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";

import { NextRequest, NextResponse } from "next/server";

const POST = async (request: NextRequest) => {
  try {
    const { email, password, userName, userPicture } = await request.json();
    console.log("userpic");
    await connect();
    const existingUser = await UserModel.findOne({ email });
    console.log("existing user", existingUser);
    if (existingUser) {
      return NextResponse.json(
        { message: "email already registered" },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    console.log("hashed", hashedPassword);

    const cloudPicture = userPicture ? await uploadImage(userPicture) : "";
    let userImage;
    if (cloudPicture) {
      userImage = cloudPicture.secure_url;
    } else {
      userImage =
        "https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg";
    }

    const newUser = new UserModel({
      email,
      password: hashedPassword,
      userName,
      userPicture: userImage,
    });

    await newUser.save();
    return NextResponse.json(
      { message: "user is registered" },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
      }
    );
  }
};

export { POST };
