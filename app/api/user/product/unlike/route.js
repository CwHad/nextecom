import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import { currentUser } from "@/utils/currentUser";

export async function PUT(req) {
  await dbConnect();

  const user = await currentUser();
  const { productId } = await req.json();

  try {
    const updated = await Product.findByIdAndUpdate(
      productId,
      {
        $pull: { likes: user._id },
      },
      { new: true }
    );
    return NextResponse.json(updated)
  } catch (err) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
