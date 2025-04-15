"use client";
import React, { useState } from "react";
import { Logo } from "@/app/components/Logo";
import { ArrowRight, ArrowLeft } from "lucide-react";

type AuthView = "login" | "signup" | "forgot-pw";

const SignupForm = () => {
  const [activeView, setActiveView] = useState<AuthView>("login");

  return (
    <div className="bg-gradient-to-b from-heroBgStart to-BG p-4 w-full min-h-screen flex flex-col items-center justify-center pt-24 py-12 relative overflow-hidden">
      <div className="mb-5 transform hover:scale-105 transition-transform">
        <Logo className="h-8 w-8"></Logo>
      </div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent)]" />

      <div className="relative z-10 rounded-2xl bg-BG/80 h-fit max-w-md w-full p-6 md:p-8 shadow-2xl">
        <div className="text-center mb-6 space-y-1">
          <h2 className="text-xl font-bold tracking-tight">
            {activeView === 'login'? 'Welcome Back' : 'Create Account'}
            
            </h2>
          <p className="text-greyText">
            {activeView === 'login'? 'Continue your journey to better habits' : 'Start your journey to better habits'}
            </p>
        </div>

        {/* Signup/Login Form */}
        <form className="space-y-4">
          {activeView === "signup" && (
            <div className="space-y-1 flex flex-col">
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
                className="border border-lightGreyBorder py-2 px-4 rounded-xl focus:outline-none focus:ring focus:ring-blue-500 bg-lightGreyBorder/50"
              ></input>
            </div>
          )}

          <div className="space-y-1 flex flex-col">
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
              className="border border-lightGreyBorder py-2 px-4 rounded-xl focus:outline-none focus:ring focus:ring-blue-500 bg-lightGreyBorder/50"
            ></input>
          </div>

          <div className="space-y-1 flex flex-col">
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
              className="border border-lightGreyBorder py-2 px-4 rounded-xl focus:outline-none focus:ring focus:ring-blue-500 bg-lightGreyBorder/50"
            ></input>
          </div>

          {/* Login/SignUp button */}
          <button className="mt-6 w-full flex justify-center gap-2 p-3 rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5 text-white bg-primaryBlue ">
            {activeView === "login" ? "Log In" : "Sign Up"}
            <ArrowRight></ArrowRight>
          </button>
        </form>

        <div className="mt-4 flex justify-center items-center gap-1">
          <p className="text-sm text-greyText ">
            {activeView === "login"
              ?<>
              New to GetSteady?

              <button className="text-primaryBlue text-sm hover:underline transition-all inline-flex items-center gap-1 group"
              onClick={()=> setActiveView('signup')}>
              Create an account
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
              </> 
              : <>
              Already have an account?

              <button className="text-primaryBlue text-sm hover:underline transition-all inline-flex items-center gap-1 group"
              onClick={()=> setActiveView('login')}>
              <ArrowLeft
                  size={14}
                  className="transition-transform group-hover:-translate-x-1"
                />{" "}
                Log in
              </button>
              </>}
          </p>

          {/* <button className="text-primaryBlue text-sm hover:underline transition-all inline-flex items-center gap-1 group">
            {activeView === "login" ? (
              <>
                Create an account
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </>
            ) : (
              <>
                <ArrowLeft
                  size={14}
                  className="transition-transform group-hover:-translate-x-1"
                />{" "}
                Log in
              </>
            )}
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
