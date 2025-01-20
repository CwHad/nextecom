import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Category from "@/models/category";
import slugify from "slugify";

export const POST = async (req) => {
  await dbConnect();
  const body = await req.json();
  const { name } = body;

  try {
    const category = await Category.create({
      name,
      slug: slugify(name),
    });
    return NextResponse.json(category);
  } catch (err) {
    console.log(err);
    return NextResponse.json(err.message, { status: 500 });
  }
};

export const GET = async () => {
  await dbConnect();
  try {
    const categorys = await Category.find({}).sort({ createdAt: -1 });
    return NextResponse.json(categorys);
  } catch (err) {
    return NextResponse.json(err.message, { status: 500 });
  }
};
