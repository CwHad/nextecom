"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import ProductReviews from "@/components/product/ProductReviews";
import Pagination from "@/components/product/Pagination";
import toast from "react-hot-toast";

export default function AdminProductReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [totalRatings, setTotalRatings] = useState(0);
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  console.log("current page => ", page);
  const router = useRouter();
  useEffect(() => {
    fetchReviews(page);
  }, [page]);
  const fetchReviews = async (page) => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/product/reviews?page=${page}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log("DATA in admin reviews with pagination => ", data);
      setReviews(data.reviews);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
      setTotalRatings(data.totalReviews.length  );
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error);
      setLoading(false);
    }
  };
  const handleDelete = async (ratingId) => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/product/reviews/remove`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ratingId }),
        }
      );
      const data = await response.json();

      toast.success(data.message);
      fetchReviews(page);
    } catch (error) {
      console.error("Error deleting rating:", error);
    }
  };
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center text-danger vh-100 h1"
      >
        LOADING...
      </div>
    );
  }
  if (!reviews?.length) {
    return (
      <div
        className="d-flex justify-content-center align-items-center text-danger vh-100 h1"
      >
        No Orders
      </div>
    );
  }
  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col">
          <p className="lead mb-4 text-center">
            Product Reviews ({totalRatings})
          </p>
          <ProductReviews reviews={reviews} handleDelete={handleDelete} />
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
