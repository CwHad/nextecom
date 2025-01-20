import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import { currentUser } from "@/utils/currentUser";
import Product from "@/models/product";
import queryString from "query-string";

export async function GET(req) {
  await dbConnect();

  const user = await currentUser();
  const searchParams = queryString.parseUrl(req.url).query;
  const { page } = searchParams || {};
  const pageSize = 6;

  try {
    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * pageSize;

    const reviews = await Product.aggregate([
      { $match: { "ratings.postedBy": user._id } },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $project: {
          _id: 0,
          product: {
            title: 1,
            slug: 1,
            price: 1,
            image: { $arrayElemAt: ["$product.images.secure_url", 0] },
          },
          ratings: {
            $arrayElemAt: [
              {
                $filter: {
                  input: "$ratings",
                  as: "rating",
                  cond: { $eq: ["$$rating.postedBy", user._id] },
                },
              },
              0,
            ],
          },
        },
      },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: pageSize },
    ]);

    const totalRatings = await Product.aggregate([
      { $match: { "ratings.postedBy": user._id } },
      {
        $group: {
          _id: null,
          totalRatings: { $sum: { $size: "$ratings" } },
        },
      },
    ]);

    const totalUserRatings =
      totalRatings.length > 0 ? totalRatings[0].totalRatings : 0;

    return NextResponse.json(
      {
        reviews,
        totalRatings: totalUserRatings,
        currentPage,
        totalPages: Math.ceil(totalUserRatings / pageSize),
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { err: "Server error, Please try again" },
      { status: 500 }
    );
  }
}
