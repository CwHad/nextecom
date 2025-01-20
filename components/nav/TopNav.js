"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useProduct } from "@/context/product";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useCart } from "@/context/cart";

export const TopNav = () => {
  const { data, status } = useSession();
  const { cartItems } = useCart();
  // console.table({ data, status });
  console.log(data, status);

  const {
    productSearchQuery,
    setProductSearchQuery,
    fetchProductSearchResults,
  } = useProduct();

  return (
    <nav className="nav shadow p-2 mb-3 d-flex align-items-center justify-content-between">
      <div className="d-flex">
        <Link href="/" className="nav-link">
          🛒 Proferlo
        </Link>

        <Link href="/products" className="nav-link">
          Products
        </Link>

        <Link href="/shop" className="nav-link">
          Shop
        </Link>
      </div>

      <form
        className="d-flex mx-2 mb-0"
        role="search"
        onSubmit={fetchProductSearchResults}
      >
        <input
          className="form-control"
          type="search"
          placeholder="Search products"
          aria-label="Search"
          onChange={(e) => setProductSearchQuery(e.target.value)}
          value={productSearchQuery}
        />
        <button
          className="btn rounded-pill"
          type="submit"
          style={{ borderRadius: "20px" }}
        >
          &#128270;
        </button>
      </form>

      <div className="d-flex justify-content-end">
        <Link href="/cart" className="nav-link text-danger">
          <BsFillCartCheckFill size={25} /> {cartItems?.length}
        </Link>
        {status === "authenticated" ? (
          <>
            <Link
              href={`/dashboard/${
                data?.user?.role === "admin" ? "admin" : "user"
              }`}
              className="nav-link"
            >
              {data?.user?.name} ({data?.user?.role})
            </Link>
            <a
              className="nav-link pointer"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              Logout
            </a>
          </>
        ) : status === "loading" ? (
          <>
            <a className="nav-link text-danger">Loading</a>
          </>
        ) : (
          <>
            <Link href="/login" className="nav-link">
              Login
            </Link>
            <Link href="/register" className="nav-link">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
