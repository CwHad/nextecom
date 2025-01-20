import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import slugify from "slugify";

export const POST = async (req) => {
  await dbConnect();
  const body = await req.json();
  console.log(body);

  try {
    const product = await Product.create({
      ...body,
      slug: slugify(body.title),
    });
    return NextResponse.json(product);
  } catch (err) {
    return NextResponse.json(
      {
        err: err.message,
      },
      { status: 500 }
    );
  }
};
