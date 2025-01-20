import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ProductRating from "@/components/product/ProductRating";
import AddToCart from "@/components/product/AddToCart";

dayjs.extend(relativeTime);

const ProductCard = ({ product }) => {
  return (
    <div className="card my-3">
      <div style={{ height: "200px", overflow: "hidden" }}>
        <Image
          src={product?.images?.[0]?.secure_url || "/images/default.jpg"}
          width={500}
          height={300}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          alt={product?.title}
        />
      </div>
      <div className="card-body">
        <Link href={`/product/${product?.slug}`}>
          <h5 className="card-title">
            <strong>${product?.price.toFixed(2)}</strong> {product?.title}
          </h5>
        </Link>

        {product?.previousPrice > product?.price && (
          <h5 className="card-title text-danger">
            🛍️<del>${product?.previousPrice.toFixed(2)}</del>
          </h5>
        )}

        <div
          dangerouslySetInnerHTML={{
            __html:
              product?.description?.length > 160
                ? `${product?.description?.substring(0, 160)}...`
                : product?.description,
          }}
        ></div>
      </div>

      <div className="card-footer d-flex justify-content-between">
        <small>Category: {product?.category?.name}</small>
        <small>Tags: {product?.tags?.map((t) => t?.name).join(" ")}</small>
      </div>

      <div className="card-footer d-flex justify-content-between">
        <small>❤️Likes</small>
        <small>Posted {dayjs(product?.createAt).fromNow()}</small>
      </div>

      <div className="card-footer d-flex justify-content-between align-items-center">
        <small>Brand: {product?.brand}</small>
        <ProductRating product={product} leaveARating={false} />
      </div>

      <div className="card-footer">
        <AddToCart product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
