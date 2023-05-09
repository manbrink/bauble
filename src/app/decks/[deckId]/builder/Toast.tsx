import React from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const bgColor = type === "success" ? "bg-green" : "bg-red";

  return (
    <div
      className={`text-white fixed bottom-4 right-4 rounded px-4 py-2 ${bgColor} z-50 transition duration-500`}
    >
      {message}
    </div>
  );
};

export default Toast;
