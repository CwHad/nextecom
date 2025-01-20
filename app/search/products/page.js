"use client";

import { useEffect } from "react";
import ProductCard from "@/components/product/ProductCard";
import { useSearchParams } from "next/navigation";
import { useProduct } from "@/context/product";

export default function SearchProductsPage() {
  const {
    setProductSearchQuery,
    setProductSearchResults,
    productSearchResults,
  } = useProduct();

  const productSearchParams = useSearchParams();
  const query = productSearchParams.get("productSearchQuery");

  useEffect(() => {
    if (query) {
      setProductSearchQuery(query);
      // fetchProductSearchResults();
      fetchProductResultsOnLoad(query);
    }
  }, [query]);

  const fetchProductResultsOnLoad = async (query) => {
    try {
      const response = await fetch(
        `${process.env.API}/search/products?productSearchQuery=${query}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok for search results");
      }
      const data = await response.json();
      console.log("search results data =>", data);
      setProductSearchResults(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h4>Search Results {productSearchResults?.length} </h4>
          {/* <pre>{JSON.stringify(productSearchResults, null, 4)}</pre> */}
          <br />

          <div className="row">
            {productSearchResults?.map((product) => (
              <div key={product?._id} className="col-lg-4">
                <ProductCard key={product?._id} product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
