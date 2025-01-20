import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  await dbConnect();

  const _req = await req.json();

  try {
    const coupon = await stripe.coupons.retrieve(_req.couponCode);
    console.log(" coupon =>", coupon);

    return NextResponse.json(coupon);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
