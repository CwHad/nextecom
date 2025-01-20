import ProductFilter from "@/components/product/ProductFilter";
import Pagination from "@/components/product/Pagination";
import ProductCard from "@/components/product/ProductCard";

// special config: Force Rendering
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Proferlo Ecommerce",
  description: "Find the latest in fashion, electronics and more",
};

async function getProducts(searchParams) {
  const searchQuery = new URLSearchParams({
    page: searchParams.page || 1,
    minPrice: searchParams.minPrice || "",
    maxPrice: searchParams.maxPrice || "",
    ratings: searchParams.ratings || "",
    category: searchParams.category || "",
    tag: searchParams.tag || "",
    brand: searchParams.brand || "",
  }).toString();

  console.log("Generated search query:", searchQuery);

  try {
    const response = await fetch(
      `${process.env.API}/product/filters?${searchQuery}`,
      {
        method: "GET",
        headers: {
          headers: {
            "Content-Type": "application/json",
          },
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    if (!data || !Array.isArray(data.products)) {
      throw new Error("No products returned");
    }

    return data;
  } catch (err) {
    console.log(err);
    return { product: [], currentPage: 1, totalPages: 1 };
  }
}

export default async function Shop({ searchParams }) {
  const resolvedSearchParams = await searchParams;

  console.log("SearchParams in shop page =>", resolvedSearchParams);
  const { products, currentPage, totalPages } = await getProducts(
    resolvedSearchParams
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-lg-3 overflow-auto filter-scroll"
          style={{ maxHeight: "90vh" }}
        >
          <ProductFilter searchParams={resolvedSearchParams} />
        </div>

        <div
          className="col-lg-9 overflow-auto filter-scroll"
          style={{ maxHeight: "90vh" }}
        >
          {/* <pre>{JSON.stringify({products, currentPage, totalPages}, null, 4)}</pre> */}

          <h4 className="text-center fw-bold mt-3">Shop Latest products</h4>
          <div className="row">
            {products?.map((product) => (
              <div key={product?._id} className="col-lg-4">
                <ProductCard key={product?._id} product={product} />
              </div>
            ))}
          </div>

          <br />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchParams={searchParams}
            pathname="/shop"
          />
        </div>
      </div>
    </div>
  );
}
