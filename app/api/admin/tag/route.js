import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Tag from "@/models/tag";
import slugify from "slugify";

export const POST = async (req) => {
  await dbConnect();
  const body = await req.json();
  const { name, parentCategory } = body;

  try {
    const tag = await Tag.create({
      name,
      parentCategory,
      slug: slugify(name),
    });
    return NextResponse.json(tag);
  } catch (err) {
    console.log(err);
    return NextResponse.json(err.message, { status: 500 });
  }
};

export const GET = async () => {
  await dbConnect();
  try {
    const tags = await Tag.aggregate([
      {
        $project: {
          name: 1,
          slug: 1,
          createdAt: 1,
          updatedAt: 1,
          parentCategory: { $toString: "$parentCategory" },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);
    // const tags = await Tag.find({}).sort({ createdAt: -1 });

    return NextResponse.json(tags);
  } catch (err) {
    return NextResponse.json(err.message, { status: 500 });
  }
};
