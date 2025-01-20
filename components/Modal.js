"use client";
import { useProduct } from "@/context/product";

export default function Modal({ children }) {
  const { closeModal } = useProduct();

  return (
    <>
      <div className="modal fade show" style={{ display: "block" }}>
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          style={{ height: "calc(100% - 60px)" }}
        >
          <div
            className="modal-content"
            style={{ height: "calc(100% - 60px)" }}
          >
            <div className="modal-body overflow-auto">{children}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
