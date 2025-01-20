"use Client";

import { useEffect } from "react";
import { useProduct } from "@/context/product";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import Pagination from "@/components/product/Pagination";

const ProductList = () => {
  const {
    products,
    currentPage,
    totalPages,
    fetchProducts,
    setUpdatingProduct,
  } = useProduct();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const handleClick = (product) => {
    setUpdatingProduct(product);
    router.push(`/dashboard/admin/product`);
  };

  return (
    <div className="container my-5">
      <div className="row gx-3">
        {/* <pre>{JSON.stringify(products, null, 4)}</pre> */}
        {products?.map((product) => (
          <div key={product?._id} className="col-lg-6 my-3">
            <div style={{ height: "200px", overflow: "hidden" }}>
              <Image
                src={product?.images[0]?.secure_url || "/images/default.jpg"}
                alt={product?.title}
                width={500}
                height={300}
                style={{
                  objectFit: "cover",
                  height: "100%",
                  width: "100%",
                }}
              />
            </div>

            <div className="card-body">
              <h5
                className="card-title pointer"
                onClick={() => handleClick(product)}
              >
                ${product?.price?.toFixed(2)} {product?.title}
              </h5>

              <div className="card-text">
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      product?.description?.length > 160
                        ? `${product?.description?.substring(0, 160)}...`
                        : product?.description,
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} pathname={pathname} />
    </div>
  );
};

export default ProductList;
