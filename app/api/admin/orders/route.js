import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Order from "@/models/order";
import queryString from "query-string";

export async function GET(req) {
  await dbConnect();
  const searchParams = queryString.parseUrl(req.url).query;
  const { page } = searchParams || {};
  const pageSize = 6;

  try {
    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * pageSize;
    const totalOrders = await Order.countDocuments();

    const orders = await Order.find({})
      .populate("userId", "name")
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    return NextResponse.json({
      orders,
      currentPage,
      totalPages: Math.ceil(totalOrders / pageSize),
    });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
