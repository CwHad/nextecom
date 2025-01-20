import Stars from "@/components/product/Stars";
import RatingDistribution from "@/components/product/RatingDistribution";

export default function UserReviews({ reviews }) {
  return (
    <>
      {reviews?.length > 0 ? (
        <>
          <RatingDistribution reviews={reviews} />

          <ul className="list-group mt-4 bg-white">
            {reviews?.map((review) => (
              <li key={review._id} className="list-group-item mb-1">
                <div>
                  <p>
                    <strong>{review?.postedBy?.name}</strong>
                  </p>
                  <Stars rating={review?.rating} />
                  {review?.comment && <p className="mt-3">{review.comment}</p>}
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No Reviews Yet</p>
      )}
    </>
  );
}
