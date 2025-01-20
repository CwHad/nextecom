import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";

export const PUT = async (req, context) => {
  await dbConnect();

  const body = await req.json();

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      context.params.id,
      {
        ...body,
      },
      { new: true }
    );
    return NextResponse.json(updatedProduct);
  } catch (err) {
    return NextResponse.json(
      {
        err: err.message,
      },
      { status: 500 }
    );
  }
};

export const DELETE = async (req, context) => {
  await dbConnect();

  try {
    const deletedProduct = await Product.findByIdAndDelete(context.params.id);
    return NextResponse.json(deletedProduct);
  } catch (err) {
    return NextResponse.json(
      {
        err: err.message,
      },
      {
        status: 500,
      }
    );
  }
};
