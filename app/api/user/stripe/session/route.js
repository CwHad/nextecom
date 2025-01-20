import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
// import { currentUser } from "@/utils/currentUser";
import Product from "@/models/product";
import { getToken } from "next-auth/jwt";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  await dbConnect();
  const { cartItems, couponCode } = await req.json();
  // const user = await currentUser();

  const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET});
  const user = token?.user;
  console.log("user =>", user);

  try {
    const lineItems = await Promise.all(
      cartItems?.map(async (item) => {
        const product = await Product.findById(item._id);
        const unitAmount = product.price * 100; // convert to fen
        return {
          price_data: {
            currency: "nzd",
            product_data: {
              name: product.title,
              images: [product.images[0].secure_url],
            },
            unit_amount: unitAmount,
          },
          tax_rates: [process.env.STRIPE_TAX_RATE],
          quantity: item.quantity,
        };
      })
    );

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      success_url: `${process.env.DOMAIN}/dashboard/user/stripe/success`,
      client_reference_id: user._id,
      mode: "payment",
      payment_method_types: ["card"],
      payment_intent_data: {
        metadata: {
          cartItems: JSON.stringify(cartItems),
          userId: user._id,
        },
      },
      shipping_options: [{ shipping_rate: process.env.STRIPE_SHIPPING_RATE }],
      shipping_address_collection: {
        allowed_countries: ["NZ"],
      },
      discounts: [{ coupon: couponCode }],
      customer_email: user.email,
    });

    console.log("stripe checkout session => ", session);

    return NextResponse.json(session);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { err: "Server error. Please try again" },
      { status: 500 }
    );
  }
}
