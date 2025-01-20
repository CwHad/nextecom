import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import cloudinary from "cloudinary";

// config
cloudinary.config({
  cloud_name: process.env.ClOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const body = await req.json();
  const { image } = body;

  try {
    const result = await cloudinary.uploader.upload(image);
    return NextResponse.json({
      public_id: result.public_id,
      secure_url: result.secure_url,
    });
  } catch (err) {
    console.log(err);
  }
}



export async function PUT(req) {
    const body = await req.json();
    const { public_id } = body;
  
    try {
      const result = await cloudinary.uploader.destroy(public_id);
      return NextResponse.json({ success: true });
    } catch (err) {
      console.log(err);
    }
  }