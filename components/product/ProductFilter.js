"use client";

import { useEffect } from "react";
import { priceRanges } from "@/utils/filterData";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Stars from "@/components/product/Stars";
import { useCategory } from "@/context/category";
import { useTag } from "@/context/tag";
import { useProduct } from "@/context/product";

export default function ProductFilter({ searchParams }) {
  const pathname = "/shop";
  const { minPrice, maxPrice, ratings, category, tag, brand } = searchParams;

  // context
  const { fetchCategoriesPublic, categories } = useCategory();
  const { fetchTagsPublic, tags } = useTag();
  const { fetchBrands, brands } = useProduct();

  useEffect(() => {
    fetchCategoriesPublic();
    fetchTagsPublic();
    fetchBrands();
  }, []);

  const router = useRouter();

  const activeButton = "btn btn-primary btn-raised mx-1 rounded-pill";
  const button = "btn btn-raised mx-1 rounded-pill";

  const handleRemoveFilter = (filterName) => {
    const updatedSearchParams = { ...searchParams };
    // delete updatedSearchParams[filterName];

    // if filterName is string
    if (typeof filterName === "string") {
      delete updatedSearchParams[filterName];
    }
    // if filterName is array
    if (Array.isArray(filterName)) {
      filterName?.forEach((name) => {
        delete updatedSearchParams[name];
      });
    }

    // reset page to 1 when applying new filter options
    updatedSearchParams.page = 1;

    const queryString = new URLSearchParams(updatedSearchParams).toString();
    const newUrl = `${pathname}?${queryString}`;
    router.push(newUrl);
  };

  return (
    <div className="mb-5">
      <p className="lead">Filter Products</p>

      <Link className="text-danger" href="/shop">
        Clear Filters
      </Link>

      {/* Price Area */}
      <p className=" mt-4 alert alert-primary">Price</p>
      <div className="row d-flex align-items-center mx-1">
        {priceRanges?.map((range) => {
          const url = {
            pathname,
            query: {
              ...searchParams,
              minPrice: range?.min,
              maxPrice: range?.max,
              page: 1,
            },
          };
          const isActive =
            minPrice === String(range?.min) && maxPrice === String(range?.max);
          return (
            <div key={range?.label}>
              <Link className={isActive ? activeButton : button} href={url}>
                {range?.label}
              </Link>
              {isActive && (
                <span
                  onClick={() => handleRemoveFilter(["minPrice", "maxPrice"])}
                  className="pointer"
                >
                  X
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Rating */}
      <p className=" mt-4 alert alert-primary">Ratings</p>
      <div className="row d-flex align-items-center mx-1">
        {[5, 4, 3, 2, 1]?.map((ratingValue) => {
          const isActive = String(ratings) === String(ratingValue);

          const url = {
            pathname,
            query: {
              ...searchParams,
              ratings: ratingValue,
              page: 1,
            },
          };

          return (
            <div key={ratingValue}>
              <Link
                className={
                  isActive
                    ? "btn btn-raised btn-primary mx-1 rounded-pill"
                    : "btn btn-raised mx-1 rounded-pill"
                }
                href={url}
              >
                <Stars rating={ratingValue} />
              </Link>
              {isActive && (
                <span
                  onClick={() => handleRemoveFilter("ratings")}
                  className="pointer"
                >
                  X
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Categories */}
      <p className=" mt-4 alert alert-primary">Categories</p>
      <div className="row d-flex align-items-center mx-1 filter-scroll">
        {categories?.map((c) => {
          const isActive = category === c._id;

          const url = {
            pathname,
            query: {
              ...searchParams,
              category: c?._id,
              page: 1,
            },
          };

          return (
            <div key={c?._id}>
              <Link className={isActive ? activeButton : button} href={url}>
                {c?.name}
              </Link>
              {isActive && (
                <span
                  onClick={() => handleRemoveFilter("category")}
                  className="pointer"
                >
                  X
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Tags */}
      <p className=" mt-4 alert alert-primary">Tags</p>
      {category && (
        <>
          <div className="row d-flex align-items-center mx-1 filter-scroll">
            {tags
              ?.filter((t) => t?.parentCategory === category)
              ?.map((t) => {
                const isActive = tag === t._id;

                const url = {
                  pathname,
                  query: {
                    ...searchParams,
                    tag: t?._id,
                    page: 1,
                  },
                };

                return (
                  <div key={t?._id}>
                    <Link
                      className={isActive ? activeButton : button}
                      href={url}
                    >
                      {t?.name}
                    </Link>
                    {isActive && (
                      <span
                        onClick={() => handleRemoveFilter("tag")}
                        className="pointer"
                      >
                        X
                      </span>
                    )}
                  </div>
                );
              })}
          </div>
        </>
      )}

      {/* Brands */}
      <p className=" mt-4 alert alert-primary">Brands</p>
      <div className="row d-flex align-items-center mx-1 filter-scroll">
        {brands?.map((b) => {
          const isActive = brand === b;

          const url = {
            pathname,
            query: {
              ...searchParams,
              brand: b,
              page: 1,
            },
          };

          return (
            <div key={b}>
              <Link className={isActive ? activeButton : button} href={url}>
                {b}
              </Link>
              {isActive && (
                <span
                  onClick={() => handleRemoveFilter("brand")}
                  className="pointer"
                >
                  X
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* <pre>{JSON.stringify(tags, null, 4)}</pre> */}
    </div>
  );
}
