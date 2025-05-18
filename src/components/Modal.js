import React from "react";
import { modalStore } from "@/stores/providerStore";

const Modal = () => {
  const isOpen = modalStore((state) => state.isOpen);
  const title = modalStore((state) => state.title);
  const content = modalStore((state) => state.content);
  const hide = modalStore((state) => state.hide);

  if (!isOpen) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center`}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        onClick={hide}
      >
        <div
          className="bg-white rounded-lg shadow-lg max-w-lg w-full max-h-[80vh] overflow-auto p-6 transform transition-transform duration-300 scale-100"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
              className="text-gray-500 hover:text-gray-700 cursor-pointer text-2xl font-bold"
              onClick={hide}
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
          <div>{content}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
