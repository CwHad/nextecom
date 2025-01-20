import Image from "next/image";
import Link from "next/link";
import Stars from "@/components/product/Stars";

export default function ProductReviews({ reviews, handleDelete }) {
  return (
    <div className="row">
      {reviews?.map((review, index) => (
        <div className="col-lg-8 offset-lg-2 card mb-3" key={index}>
          <div className="row g-0">
            <div style={{ width: "100px", overflow: "hidden" }}>
              <Image
                src={review?.product?.image || "/images/default.jpg"}
                alt={review?.product?.title || "Default image"}
                className="card-img-top"
                width={200}
                height={200}
                style={{
                  objectFit: "cover",
                  height: "100%",
                  width: "100%",
                }}
              />
            </div>

            <div className="col-lg-8">
              <div className="card-body">
                <h5 className="card-title">
                  <Link
                    href={`/product/${review?.product?.slug}`}
                    as={`/product/${review?.product?.slug}`}
                  >
                    {review?.product?.title}
                  </Link>
                </h5>

                <div className="d-flex justify-content-between">
                  <div>
                    <Stars rating={review?.ratings?.rating} />
                  </div>

                  {handleDelete && (
                    <button
                      className="btn btn-danger btn-raised border-20"
                      onClick={() => handleDelete(review?.ratings?._id)}
                    >
                      X
                    </button>
                  )}
                </div>

                {review?.ratings?.comment && (
                  <p className="card-text mb-0">{review?.ratings?.comment}</p>
                )}
                {review?.ratings?.postedBy?.name && (
                  <p className="text-secondary">
                    {review?.ratings.postedBy?.name}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
