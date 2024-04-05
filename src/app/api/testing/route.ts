import dbConnect from "@/utils/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/config/cloudinary";
import { getServerSession } from "next-auth";

const GET = async (request: NextRequest) => {
  const session = await getServerSession();
  console.log("session test :>> ", session);
};

export { GET };
