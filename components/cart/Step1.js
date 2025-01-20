import { useCart } from "@/context/cart";
import Image from "next/image";
import Link from "next/link";
import AddToCart from "@/components/product/AddToCart";
import OrderSummary from "@/components/cart/OrderSummary";

export default function Step1({ onNextStep }) {
  const { cartItems } = useCart();
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <p className="alert alert-primary">Review Cart / Adjust Quantity</p>
          {cartItems?.map((product) => (
            <div className="card mb-3" key={product?._id}>
              <div className="row g-0">
                <div className="col-lg-4">
                  <div style={{ height: "200px", overflow: "hidden" }}>
                    <Image
                      src={
                        product?.images?.[0]?.secure_url ||
                        "/images/default.jpg"
                      }
                      alt={product?.title}
                      width={500}
                      height={300}
                      className="card-img-top"
                      style={{
                        objectFit: "cover",
                        height: "100%",
                        width: "100%",
                      }}
                    />
                  </div>
                </div>

                <div className="col-lg-8">
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link href={`/product/${product?.slug}`}>
                        {product?.title}
                      </Link>
                    </h5>

                    <h4>${product?.price?.toFixed(2)}</h4>

                    <div className="card-text">
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            product?.description?.length > 160
                              ? `${product?.description?.substring(0, 160)}...`
                              : product?.description,
                        }}
                      />
                    </div>

                    <div className="mt-3">
                      <AddToCart product={product} reviewAndCheckout={false} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="d-flex justify-content-end my-4">
            <button
              className="btn btn-danger btn-raised col-6"
              onClick={onNextStep}
            >
              Next
            </button>
          </div>
        </div>

        <div className="col-lg-4">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
