"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";

export default function ProductLike({ product }) {
  const { data, status } = useSession();
  const [likes, setLikes] = useState(product?.likes);

  const router = useRouter();
  const pathname = usePathname();

  const isLiked = likes?.includes(data?.user?._id);

  const handleLike = async () => {
    if (status !== "authenticated") {
      toast.error("Please sign in to like");
      router.push(`/login/?callbackUrl=${pathname}`);
      return;
    }

    try {
      if (isLiked) {
        const answer = window.confirm("Are you sure to unlike?");

        if (answer) {
          handleUnLike();
        }
      } else {
        const response = await fetch(`${process.env.API}/user/product/like`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: product?._id }),
        });

        if (!response.ok) {
          throw new Error("Failed to unlike");
        } else {
          const data = await response.json();
          setLikes(data?.likes);
          toast.success("Product liked");
          router.refresh();
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to like");
    }
  };

  const handleUnLike = async () => {
    try {
      const response = await fetch(`${process.env.API}/user/product/unlike`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product?._id }),
      });

      if (!response.ok) {
        throw new Error("Failed to unlike");
      }

      const data = await response.json();
      setLikes(data?.likes);
      toast.success("Product unliked");
      router.refresh();
    } catch (err) {
      console.log(err);
      toast.error("Failed to unlike");
    }
  };

  return (
    <small className="pointer">
      {!likes?.length ? (
        <>
          <span onClick={handleLike}>❤️ Be the first person to like</span>
        </>
      ) : (
        <>
          <span onClick={handleLike}>❤️ {likes?.length} people liked</span>
        </>
      )}
    </small>
  );
}
