import React from 'react'
import { Loader2, ArrowRight } from "lucide-react"; // You can replace icons if needed

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: "primary"|"secondary" | "danger";
};

const MyButton = ({
  children,
  onClick,
  loading = false,
  type = "button",
  disabled = false,
  variant = "primary"
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`mt-6 w-full flex justify-center items-center gap-2 p-3 rounded-xl transition-all text-white bg-primaryBlue ${
        loading
          ? "opacity-60"
          : "hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
      }`}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          {children}
          <ArrowRight className="w-5 h-5" />
        </>
      )}
    </button>
  )
}

export default MyButton