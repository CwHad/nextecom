"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/cart";
import Link from "next/link";

export default function AddToCart({ product, reviewAndCheckout = true }) {
  const { addToCart, updateQuantity, removeFromCart, cartItems } = useCart();

  // find the product in cartItems if it exist
  const existingProduct = cartItems?.find((item) => item?._id === product?._id);
  const initialQuantity = existingProduct ? existingProduct?.quantity : 1;

  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    setQuantity(existingProduct ? existingProduct?.quantity : 1);
  }, [existingProduct]);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(product, newQuantity);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(product, newQuantity);
    } else {
      removeFromCart(product?._id);
      setQuantity(1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div>
      {cartItems?.some((item) => item?._id === product?._id) ? (
        <div>
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={handleDecrement}
            >
              -
            </button>

            <input
              type="number"
              className="form-control no-spin-arrows mx-5 text-center"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            />

            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>

          {reviewAndCheckout && (
            <Link
              className="btn btn-outline-danger btn-raised btn-block mt-2"
              href="/cart"
            >
              Review & Checkout
            </Link>
          )}
        </div>
      ) : (
        <button
          className="btn btn-danger btn-raised btn-block"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}
