import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

const POST = async (req: NextRequest) => {
  const data = await req.formData();
  const image = data.get("userPicture") as unknown as File;

  if (!image) {
    console.log("file format not supported.");
    return new NextResponse("no file found", {
      status: 404,
    });
  }

  try {
    // Get the stream directly from the File object
    const pictureUpload = await cloudinary.uploader.upload_stream({
      image,
      folder: "travelbuddy",
      transformation: [{ width: 400, height: 400, crop: "fill" }],
    });
    console.log("picture upload", pictureUpload);
    return NextResponse.json(
      {
        message: "file uploaded successfully",
        error: false,
        data: {
          imageUrl: pictureUpload?.secure_url,
          public_id: pictureUpload?.public_id,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("error on pictureUpload", error);
    return new NextResponse("server error", {
      status: 500,
    });
  }
};

export { POST };
