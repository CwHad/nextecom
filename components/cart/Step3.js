import { useState } from "react";
import { useCart } from "@/context/cart";
import OrderSummary from "@/components/cart/OrderSummary";
import toast from "react-hot-toast";

export default function Step3({ onPrevStep }) {
  const { cartItems, validCoupon,couponCode } = useCart();

  // state
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {

      const payload = {};

      const cartData = cartItems?.map((item) => ({
        _id: item._id,
        quantity: item.quantity,
      }));

      payload.cartItems = cartData;
      if(validCoupon) {
        payload.couponCode = couponCode;
      }


      const response = await fetch(`${process.env.API}/user/stripe/session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = data.url;
      } else {
        toast.error(data.err);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occured, please try again");
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <p className="alert alert-primary">Payment Method</p>
          <h2 className="text-center">🔒💳</h2>

          <p>
            Flat rate 5$ shipping fee will apply for all orders New Zealand wide!
          </p>

          <p className="lead card p-5 bg-secondary text-light">
            Clicking 'Place Order' will securly redirect you to our trusted
            payment partner, Stripe to complete your order.
          </p>

          <div className="d-flex justify-content-end my-4">
            <button
              className="btn btn-outline-danger btn-raised col-6"
              onClick={onPrevStep}
            >
              Previous
            </button>

            <button
              className="btn btn-success btn-raised col-6"
              onClick={handleClick}
              disabled={loading}
            >
              {loading ? "Processing..." : "Place Order"}
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
