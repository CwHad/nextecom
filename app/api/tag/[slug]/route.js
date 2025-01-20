import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Tag from "@/models/tag";
import Product from "@/models/product";

export async function GET(req, context) {
  await dbConnect();

  const { slug } = await context.params;

  console.log("tag api slug ====> ", slug);

  try {
    const tag = await Tag.findOne({ slug }).populate(
      "parentCategory",
      "name slug"
    );
    console.log("tag api tag =========> ", tag);

    const products = await Product.find({ tags: tag?._id })
      .populate("tags", "name")
      .populate("category", "name")
      .limit(12)
      .sort({
        createdAt: "-1",
      });

    console.log("tag api Products ===========>", products);

    return NextResponse.json({ tag, products });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        err: "Server error. Please try again",
      },
      { status: 500 }
    );
  }
}
