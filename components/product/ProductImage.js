"use client";

import Image from "next/image";
import { useProduct } from "@/context/product";
import Modal from "@/components/Modal"

export default function ProductImage({ product }) {

  const {
    showImagePreviewModal,
    currentImagePreviewUrl,
    openImagePreviewModal,
  } = useProduct();

  const showImage = (src, title) => (
    <Image
      src={src}
      className="card-img-top"
      width={500}
      height={300}
      style={{ objectFit: "contain", height: "100%", width: "100%" }}
      alt={title}
    />
  );

  return (
    <>
      {showImagePreviewModal && (
        <Modal>{showImage(currentImagePreviewUrl, product?.title)}</Modal>
      )}

      <div className="d-flex justify-content-center align-items-center">
        {product?.images?.length > 0 ? (
          <>
            {product?.images?.map((image, index) => (
              <div
                key={image?.public_id}
                style={{ height: "350px", overflow: "hidden" }}
                className="pointer"
                onClick={() => openImagePreviewModal(image?.secure_url)}
              >
                {showImage(image?.secure_url, product?.title)}
              </div>
            ))}
          </>
        ) : (
          <>
            <div
              style={{ height: "350px", overflow: "hidden" }}
              className="pointer"
              onClick={() => openImagePreviewModal("/images/default.jpg")}
            >
              {showImage("/images/default.jpg", product?.title)}
            </div>
          </>
        )}
      </div>
    </>
  );
}
