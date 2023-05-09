import React from "react";

interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: Props) => {
  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-70"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-5/6 max-h-5/6 overflow-auto rounded-md p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
