import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import queryString from "query-string";

export async function GET(req) {
  await dbConnect();

  // parse query params from the req url
  const searchParams = queryString.parseUrl(req.url).query;

  // destructure query from searchParams
  const { page, category, brand, tag, ratings, minPrice, maxPrice } =
    searchParams || {};
  const pageSize = 6;

  // initialize an empty filter object.
  const filter = {};

  // apply filters based on query params
  if (category) {
    filter.category = category;
  }
  if (brand) {
    filter.brand = brand;
  }
  if (tag) {
    filter.tags = tag;
  }
  if (minPrice && maxPrice) {
    filter.price = {
      $gte: minPrice, // > or equal
      $lte: maxPrice, // < or equal
    };
  }

  try {
    // determine the current page and calculate skip value for pagination
    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * pageSize;

    // retrieve all products based on the applied filters
    const allProducts = await Product.find(filter)
      .populate("category", "name")
      .populate("tags", "name")
      .sort({ createdAt: -1 });

    // function to calculate the average rating for each product
    const calculateAverageRating = (ratings) => {
      if (ratings.lentgh === 0) return 0;
      //   let totalRating = 0;
      //   ratings.forEach((rating) => {
      //     totalRating += rating.rating;
      //   });
      //   return totalRating / ratings.lentgh;
      const totalRating = ratings.reduce(
        (sum, rating) => sum + rating.rating,
        0
      );
      return totalRating / ratings.length;
    };

    // calculate the average rating for each product
    const productsWithAverageRating = allProducts.map((product) => ({
      ...product.toObject(), // mongo 的方法, 将文档对象换成纯js对象
      averageRating: calculateAverageRating(product.ratings),
    }));

    // filter products based on the ratings query param
    const filteredProducts = productsWithAverageRating.filter((product) => {
      if (!ratings) {
        return true; // no rating filter applied
      }

      const targetRating = Number(ratings);
      const difference = product.averageRating - targetRating;
      return difference >= -0.5 && difference <= 0.5; // (4) [3.5 to 4.5]
    });

    const totalFilteredProducts = filteredProducts.length;
    // apply pagination to filtered products
    const paginatedProducts = filteredProducts.slice(skip, skip + pageSize);

    // return the paginated product data as json
    return NextResponse.json(
      {
        products: paginatedProducts,
        currentPage,
        totalPages: Math.ceil(totalFilteredProducts / pageSize),
      },
      { status: 200 }
    );
  } catch (err) {
    console.log("filter products err => ", err);

    return NextResponse.json(
      {
        err: err.message,
      },
      { status: 500 }
    );
  }
}
