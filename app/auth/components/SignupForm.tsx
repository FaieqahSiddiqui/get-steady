import React from "react";
import { Logo } from "@/app/components/Logo";
import { ArrowRight } from "lucide-react";

const SignupForm = () => {
  return (
    <div className="border bg-gradient-to-b from-heroBgStart to-BG px-8 w-full h-screen flex flex-col items-center justify-center">
      <div className="mb-8 transform hover:scale-105 transition-transform">
        <Logo className="h-8 w-8"></Logo>
      </div>

      <div className="rounded-2xl bg-BG/80 h-fit min-w-md p-8 shadow-2xl">
        <div className="text-center mb-8 space-y-2">
          <h2 className="text-2xl font-bold tracking-tight" >Create Account</h2>
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
              className="border border-lightGreyBorder py-3 px-4 rounded-xl focus:outline-none focus:ring focus:ring-blue-500"
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
              className="border border-lightGreyBorder py-3 px-4 rounded-xl focus:outline-none focus:ring focus:ring-blue-500"
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
              className="border border-lightGreyBorder py-3 px-4 rounded-xl focus:outline-none focus:ring focus:ring-blue-500"
            ></input>
          </div>

          <button className="w-full flex justify-center gap-2 p-3 rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5 text-white bg-primaryBlue ">
            Sign Up
            <ArrowRight></ArrowRight>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
