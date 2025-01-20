import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import Category from "@/models/category";
import Tag from "@/models/tag";
import Order from "@/models/order";
import Blog from "@/models/blog";

export async function GET(req) {
  await dbConnect();

  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalCategories = await Category.countDocuments();
    const totalTags = await Tag.countDocuments();
    const totalBlogs = await Blog.countDocuments();

    const data = [
      {
        label: "Product",
        url: "/dashboard/admin/products",
        count: totalProducts,
      },
      { label: "Orders", url: "/dashboard/admin/orders", count: totalOrders },
      {
        label: "Categories",
        url: "/dashboard/admin/category",
        count: totalCategories,
      },
      { label: "Tags", url: "/dashboard/admin/tag", count: totalTags },
      { label: "Blogs", url: "/dashboard/admin/blog", count: totalBlogs },
    ];

    return NextResponse.json({ data });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
