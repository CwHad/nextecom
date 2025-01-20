import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ProductImage from "@/components/product/ProductImage";
import ProductLike from "@/components/product/ProductLike";
import ProductRating from "@/components/product/ProductRating";
import UserReviews from "@/components/product/UserReviews";
import CouponCode from "@/components/product/CouponCode";
import AddToCart from "@/components/product/AddToCart";
import ProductCard from "@/components/product/ProductCard";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { product } = await getProduct(resolvedParams?.slug);

  console.log("generateMetadata ========>", product);

  return {
    title: product?.title,
    description: product?.description?.substring(0, 160),
    openGraph: {
      images: product?.images[0]?.secure_url,
    },
  };
}

dayjs.extend(relativeTime);

async function getProduct(slug) {
  const response = await fetch(`${process.env.API}/product/${slug}`, {
    method: "GET",
    next: {
      revalidate: 1,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const data = await response.json();
  return data;
}

export default async function ProductViewPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const { product, relatedProducts } = await getProduct(slug);
  console.log("relatedProducts ========> ", relatedProducts);
  

  return (
    <div className="container my-4">
      <div className="col-lg-8 offset-lg-2 card pt-5">
        <h1 className="text-center">{product?.title}</h1>
        <CouponCode product={product} />

        {/* Show Product Image in modal */}

        <ProductImage product={product} />

        <div className="card-body">
          <div
            dangerouslySetInnerHTML={{
              __html: product?.description.replace(/\./g, "<br/><br/>"),
            }}
          />

          <div className="alert alert-primary mt-4">
            Brand: {product?.brand}
          </div>
        </div>

        <div className="card-footer d-flex justify-content-between">
          <small>Category: {product?.category?.name}</small>
          <small>Tags: {product?.tags?.map((t) => t?.name).join(" ")}</small>
        </div>

        <div className="card-footer d-flex justify-content-between">
          {/* <small>❤️Likes</small> */}
          <ProductLike product={product} />
          <small>Posted {dayjs(product?.createAt).fromNow()}</small>
        </div>

        <div className="card-footer">
          <ProductRating product={product} />
          <div className="my-3">
            <AddToCart product={product} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-10 offset-lg-1">
          <p className="lead text-center my-5">Other products you may like</p>
          <div className="row">
            {relatedProducts?.map((product) => (
              <div className="col-lg-4" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
      ;
      <div className="row">
        <div className="col-lg-8 offset-lg-2 my-5">
          <UserReviews reviews={product?.ratings} />
        </div>
      </div>
    </div>
  );
}
