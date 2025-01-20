import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Category from "@/models/category";
import slugify from "slugify";


export const GET = async () => {
    await dbConnect();
    try {
      const categorys = await Category.find({}).sort({ createdAt: -1 });
      return NextResponse.json(categorys);
    } catch (err) {
      return NextResponse.json(err.message, { status: 500 });
    }
  };
  