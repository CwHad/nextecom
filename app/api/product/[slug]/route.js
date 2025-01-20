import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";

export const GET = async (req, context) => {
  await dbConnect();

  try {
    const resolvedParams = await context.params;
    const slug = resolvedParams.slug;

    const product = await Product.findOne({ slug })
      .populate("category", "name slug")
      .populate("tags", "name slug")
      .populate({
        path: "ratings.postedBy",
        model: "User",
        select: "name",
      });

    const relatedProducts = await Product.find({
      $or: [{ category: product.category }, { tags: { $in: product.tags } }],
      _id: { $ne: product._id },
    })
      .populate("category", "name slug")
      .populate("tags", "name slug")
      .limit(3);

      // console.log("relatedProducts ======> ", relatedProducts);

    return NextResponse.json({ product, relatedProducts });
  } catch (err) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
};
