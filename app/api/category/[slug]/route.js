import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Category from "@/models/category";
import Product from "@/models/product";

export async function GET(req, context) {
  await dbConnect();
  const slug = await context.params.slug;

  try {
    const category = await Category.findOne({ slug });

    if (!category) {
      return NextResponse.json({ err: "Category not found." }, { status: 404 });
    }

    const products = await Product.find({ category: category._id })
      .limit(12)
      .sort({ createdAt: -1 });

    console.log("category =======> ", category);

    return NextResponse.json({ category, products });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { err: "Server error. Please try again" },
      { status: 500 }
    );
  }
}
