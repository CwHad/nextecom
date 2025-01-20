
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import Order from "@/models/order";
import Blog from "@/models/blog"

import { currentUser } from "@/utils/currentUser";


export async function GET(req) {
    await dbConnect();

    const user = await currentUser();
    const userId = user._id;

    try {
        const totalLikedBlogs = await Blog.countDocuments({likes: userId});
        const totalOrders = await Order.countDocuments({userId});
        const totalReviews = await Product.countDocuments({"ratings.postedBy": userId});
        const totalLikes = await Product.countDocuments({likes: userId});

        const data = [
            {
                label: "Total Orders",
                url: "/dashboard/user/orders",
                count: totalOrders
            },
            {
                label: "Liked Blogs",
                url: "/dashboard/user/liked/blogs",
                count: totalLikedBlogs
            },
            {
                label: "Product Reviews",
                url: "/dashboard/user/product/reviews",
                count: totalReviews
            },
            {
                label: "Product Likes",
                url: "/dashboard/user/liked/product",
                count: totalLikes
            },
        ];

        return NextResponse.json({data});

    } catch (err) {
        console.log(err);
        return NextResponse.json({
            err: err.message
        }, {
            status: 500
        })
    }
}