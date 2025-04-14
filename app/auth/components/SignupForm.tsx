import React from "react";
import { Logo } from "@/app/components/Logo";
import { ArrowRight, ArrowLeft } from "lucide-react";

const SignupForm = () => {
  return (
    <div className="bg-gradient-to-b from-heroBgStart to-BG p-4 w-full min-h-screen flex flex-col items-center justify-center pt-26 relative overflow-hidden">
        
      <div className="mb-8 transform hover:scale-105 transition-transform">
        <Logo className="h-8 w-8"></Logo>
      </div>     
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent)]" />


      <div className="rounded-2xl bg-BG/80 h-fit max-w-md w-full p-8 shadow-2xl">
        <div className="text-center mb-8 space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Create Account</h2>
          <p className="text-greyText">Start your journey to better habits</p>
        </div>

        <form className="space-y-5">
          <div className="space-y-2 flex flex-col">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-greyText"
            >
              {" "}
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              required
              className="border border-lightGreyBorder py-3 px-4 rounded-xl focus:outline-none focus:ring focus:ring-blue-500 bg-lightGreyBorder/50"
            ></input>
          </div>

          <div className="space-y-2 flex flex-col">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-greyText"
            >
              {" "}
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="border border-lightGreyBorder py-3 px-4 rounded-xl focus:outline-none focus:ring focus:ring-blue-500 bg-lightGreyBorder/50"
            ></input>
          </div>

          <div className="space-y-2 not-only-of-type:flex flex-col">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-greyText"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              className="border border-lightGreyBorder py-3 px-4 rounded-xl focus:outline-none focus:ring focus:ring-blue-500 bg-lightGreyBorder/50"
            ></input>
          </div>

          <button className="w-full flex justify-center gap-2 p-3 rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5 text-white bg-primaryBlue ">
            Sign Up
            <ArrowRight></ArrowRight>
          </button>
        </form>

        <div className="mt-7 flex justify-center items-center gap-2">
          <p className="text-sm text-greyText ">
            Already have an account?
          </p>

          <button className="text-primaryBlue text-sm hover:underline transition-all inline-flex items-center gap-1 group">
            <ArrowLeft
              size={14}
              className="transition-transform group-hover:-translate-x-1"
            />
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
