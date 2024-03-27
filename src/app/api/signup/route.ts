import dbConnect from "@/utils/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";

import { NextRequest, NextResponse } from "next/server";

const POST = async (request: NextRequest) => {
  // const { email, password, userName } = await request.json();
  const values = await request.json();
  console.log("values :>> ", values);
  await dbConnect();
  const existingUser = await UserModel.findOne({ email: values.email });
  if (existingUser) {
    console.log("existingUser :>> ", existingUser);
    return new NextResponse("Email already registered", {
      status: 400,
    });
  }

  const hashedPassword = await bcrypt.hash(values.password, 5);
  console.log("hashedPassword :>> ", hashedPassword);
  const newUser = new UserModel({
    ...values,
    password: hashedPassword,
    authType: "credentials",
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

const uploadPicture = async (req: any, res: any) => {
  console.log("req", req.file);
  if (!req.file) {
    console.log("file format not supported.");
    res.status(500).json({ message: "file not supported" });
  }
  if (req.file) {
    //Upload a picture
    try {
      const pictureUpload = await cloudinary.uploader.upload(req.file.path, {
        folder: "userProfiles",
        transformation: [{ width: 400, height: 400, crop: "fill" }],
      });
      console.log("picture upload", pictureUpload);

      res.status(201).json({
        message: "file uploaded successfully",
        error: false,
        data: {
          imageUrl: pictureUpload.secure_url,
          public_id: pictureUpload.public_id,
        },
      });
      // console.log("publicccc iddd", public_id);
    } catch (error) {
      console.log("error on pictureUpload", error);
      res.status(500).json({
        message: "file not uploaded",
        error: true,
        data: null,
      });
    }
  }
};

export { POST };
