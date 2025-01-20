import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import queryString from "query-string";

export async function GET(req) {
  await dbConnect();

  const searchParams = queryString.parseUrl(req.url).query;
  const { page } = searchParams || {};
  const pageSize = 6;

  try {
    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * pageSize;

    // 统计所有评论的数量
    const totalReviews = await Product.aggregate([
      { $unwind: "$ratings" },
      { $count: "total" },
    ]);

    const totalCount = totalReviews.length > 0 ? totalReviews[0].total : 0;

    // 获取所有产品评论
    const reviews = await Product.aggregate([
      { $unwind: "$ratings" }, // 解构 ratings 数组，得到单个评论
      {
        $project: {
          _id: 0,
          product: {
            title: "$title",
            slug: "$slug",
            price: "$price",
            image: { $arrayElemAt: ["$images.secure_url", 0] },
          },
          ratings: {
            comment: "$ratings.comment",
            rating: "$ratings.rating",
            postedBy: "$ratings.postedBy",
            createdAt: "$ratings.createdAt",
          },
        },
      },
      { $sort: { "ratings.createdAt": -1 } }, // 按评论时间降序排序
      { $skip: skip },
      { $limit: pageSize },
    ]);

    return NextResponse.json(
      {
        reviews,
        currentPage,
        totalReviews,
        totalPages: Math.ceil(totalCount / pageSize),
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { err: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
