import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { resetpwpage } from "./actions";
import { AuthView } from "../../constants/types";

type Props = { changeView: (v: AuthView) => void };

const ForgotPassword = ({ changeView }: Props) => {
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
      <form className="space-y-4">
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
          formAction={resetpwpage}
          className="mt-6 w-full flex justify-center gap-2 p-3 rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5 text-white bg-primaryBlue cursor-pointer"
        >
          Send Reset Instructions
          <ArrowRight></ArrowRight>
        </button>
      </form>

      <div className="mt-4 flex justify-center items-center">
        <div className="flex items-center gap-2 text-sm text-greyText">
          <button
            onClick={() => changeView("login")}
            className="text-primaryBlue hover:underline transition-all inline-flex items-center gap-1 group"
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
