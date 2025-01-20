
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Tag from "@/models/tag";



export const GET = async () => {
    await dbConnect();
    try {
      const tags = await Tag.find({}).sort({ createdAt: -1 });
      return NextResponse.json(tags);
    } catch (err) {
      return NextResponse.json(err.message, { status: 500 });
    }
  };
  