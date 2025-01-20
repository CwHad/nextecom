"use client";

import { useEffect } from "react";
import { useCart } from "@/context/cart";
import { useSearchParams } from "next/navigation";

export default function CouponCode({ product }) {
  const { handleCoupon, setCouponCode, percentOff, validCoupon } = useCart();
  const searchParams = useSearchParams();
  const code = searchParams.get("couponCode");

  useEffect(() => {
    if (code) {
      setCouponCode(code);
      handleCoupon(code);
    }
  }, [code]);

  return (
    <div className="d-flex justify-content-center align-items-center">
      {validCoupon ? (
        <del>
          <h4 className="text-danger mx-2">${product?.price?.toFixed(2)}</h4>
        </del>
      ) : (
        <h4 className="mx-2">${product?.price?.toFixed(2)}</h4>
      )}

      {percentOff > 0 && (
        <h4 className="alert alert-danger">
          ${((product?.price * (100 - percentOff)) / 100).toFixed(2)} (
          {percentOff}% discount coupon applied )
        </h4>
      )}
    </div>
  );
}
