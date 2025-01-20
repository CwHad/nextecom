"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import ProductReviews from "@/components/product/ProductReviews";
import Pagination from "@/components/product/Pagination";
import toast from "react-hot-toast";

export default function UserProductReviewsPage() {
  const [reviews, setReviews] = useState([]);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  console.log("current page ===> ", page);

  useEffect(() => {
    fetchReviews(page);
  }, []);

  const fetchReviews = async (page) => {
    try {
      const response = await fetch(
        `${process.env.API}/user/product/reviews?page=${page}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      console.log("data in user orders with pagination => ", data);
      
      setReviews(data.reviews);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center text-danger vh-100 h1">
        LOADING...
      </div>
    );
  }

  if (!reviews?.length) {
    return (
      <div className="d-flex justify-content-center align-items-center text-danger vh-100 h1">
        No Orders
      </div>
    );
  }

  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col">
          <p className="lead mb-4 text-center">Product Reviews</p>
          <ProductReviews reviews={reviews} />
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pathname={pathname}
      />
    </div>
  );
}
