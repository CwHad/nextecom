import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Order from "@/models/order";
import { currentUser } from "@/utils/currentUser";

export async function GET(req) {
  await dbConnect();

  try {
    const user = await currentUser();
    const orders = await Order.find({ userId: user._id }).sort({
      createdAt: -1,
    });
    return NextResponse.json(orders)
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 500 });
  }
}
