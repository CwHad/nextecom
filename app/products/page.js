import Pagination from "@/components/product/Pagination";
import ProductCard from "@/components/product/ProductCard";

export const metadata = {
  title: "Proferlo",
  description: "Find the latest in fashion, electronics, and more!" 
}

async function getProducts(searchParams) {
  const searchQuery = new URLSearchParams({
    page: searchParams?.page || 1,
  }).toString();

  const response = await fetch(`${process.env.API}/product?${searchQuery}`, {
    method: "GET",
    next: {
      revalidate: 1,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();
  return data;
}

export default async function Products({ searchParams }) {
  const resolvedSearchParams = await searchParams; // 确保解析完成
  console.log(resolvedSearchParams);

  const { products, currentPage, totalPages } = await getProducts(resolvedSearchParams);

  return (
    <div className="container">
      <h1 className="text-center mt-4">
        <strong>Latest Products</strong>
      </h1>
      {/* <pre>{JSON.stringify(products, null, 4)}</pre> */}

      <div className="row">
        {products?.map((product) => (
          <div key={product?._id} className="col-lg-4">
            <ProductCard key={product?._id} product={product} />
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pathname="/products"
      />
    </div>
  );
}
