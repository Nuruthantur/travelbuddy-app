import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";

const POST = async (req: NextRequest) => {
  console.log("function for image");
  const data = await req.formData();
  const file = data.get("userPicture") as File;
  console.log("req", file);
  if (!file) {
    console.log("file format not supported.");
    return new NextResponse("no file found", {
      status: 404,
    });
  }
  if (file) {
    //Upload a picture
    try {
      const arrayBuffer = await file.arrayBuffer();
      console.log("array buffer", typeof arrayBuffer);

      // const imageBuffer = new Uint8Array(arrayBuffer);
      // const data = await fs.readFile(arrayBuffer);
      console.log("data :>> ", data);
      //   const pictureUpload = await cloudinary.uploader.upload(data, {
      //     folder: "travelbuddy",
      //     transformation: [{ width: 400, height: 400, crop: "fill" }],
      //   });
      //   console.log("picture upload", pictureUpload);
      //   if (!pictureUpload) {
      //     return new NextResponse("picture couldn't be uploaded", {
      //       status: 404,
      //     });
      //   }
      return NextResponse.json(
        {
          message: "file uploaded successfully",
          error: false,
          //   data: {
          // imageUrl: pictureUpload.secure_url,
          // public_id: pictureUpload.public_id,
          //   },
        },
        {
          status: 200,
        }
      );

      // console.log("publicccc iddd", public_id);
    } catch (error) {
      console.log("error on pictureUpload", error);
      return new NextResponse("server error", {
        status: 500,
      });
    }
  }
};

export { POST };
