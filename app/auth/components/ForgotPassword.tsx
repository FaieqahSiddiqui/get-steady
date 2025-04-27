"use client";
import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Loader, Loader2 } from "lucide-react";
import { resetpwpage } from "./actions";
import { AuthView } from "../../constants/types";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";

type Props = { changeView: (v: AuthView) => void };

const ForgotPassword = ({ changeView }: Props) => {
  const searchParams = useSearchParams();
  const toastShown = useRef(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const status = searchParams.get("status");
    if (status === "success" && !toastShown.current) {
      toast.success("Reset instructions sent to your email 📩");
      toastShown.current = true;
      // router.replace("/auth"); // Clean the URL
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [searchParams]);

  // const handleResetPassword = async (formData: FormData) => {
  //   setLoading(true);
  //   const res = await resetpwpage(formData);

  //   if (res.success) {
  //     toast.success("Reset instructions sent to your email 📩");
  //     (document.getElementById('reset-pw-form') as HTMLFormElement).reset();
  //   } else {
  //     toast.error(res.error || "Something went wrong");
  //   }
  //   setLoading(false);
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form behavior
    const form = e.currentTarget;
    const formData = new FormData(form);

    setLoading(true);

    const res = await resetpwpage(formData);

    if (res.success) {
      // toast.success("Reset instructions sent to your email 📩");
      toast.success(
        "Reset instructions sent, the reset email should arrive soon 📩"
      );
      form.reset(); // Clear the form fields
    } else {
      toast.error(res.error || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="text-center mb-6 space-y-1">
        <h2 className="text-xl font-bold tracking-tight">
          Reset your password
        </h2>
        <p className="text-greyText">
          Enter your email and we'll send you reset instructions
        </p>
      </div>
      {/* onSubmit={handleSubmit} */}
      {/* action={handleResetPassword} */}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Label & Input */}
        <div className="space-y-1.5 flex flex-col">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-greyText"
          >
            {" "}
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="border border-lightGreyBorder py-2 px-4 rounded-xl focus:outline-none focus:ring focus:ring-blue-500 bg-lightGreyBorder/50"
          ></input>
        </div>

        {/* Reset Instructions button */}
        <button
          // formAction={resetpwpage}
          type="submit"
          disabled={loading}
          // className="mt-6 w-full flex justify-center gap-2 p-3 rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5 text-white bg-primaryBlue cursor-pointer"

          className={`mt-6 w-full flex justify-center gap-2 p-3 rounded-xl transition-all text-white bg-primaryBlue ${
            loading
              ? "opacity-60"
              : "hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
          }`}
        >
          {/* {loading ? "Sending..." : "Send Reset Instructions"} */}

          {loading ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            "Send Reset Instructions"
          )}
          {!loading && <ArrowRight />}
        </button>
      </form>

      <div className="mt-4 flex justify-center items-center">
        <div className="flex items-center gap-2 text-sm text-greyText">
          <button
            onClick={() => changeView("login")}
            className="text-primaryBlue hover:underline transition-all inline-flex items-center gap-1 group cursor-pointer"
          >
            <ArrowLeft
              size={14}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
