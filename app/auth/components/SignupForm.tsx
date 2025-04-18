"use client";
import React, { useState } from "react";
import { ArrowRight,  Eye, EyeOff } from "lucide-react";
import {signup } from './actions'


type AuthView = "login" | "signup" | "forgot-pw";

const SignupForm = () => {
  const [activeView, setActiveView] = useState<AuthView>("login");
  const [showPW, setshowPW] = useState(false)

  return (
    <div >
      

        {/* Signup/Login Form */}
        <form className="space-y-4">
          
            {/* Full Name Label & Input */}
            <div className="space-y-1.5 flex flex-col">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-greyText"
              >
                {" "}
                Full Name
              </label>
              <input
                type="text"
                name="fullname"
                placeholder="Enter your full name"
                required
                className="border border-lightGreyBorder py-2 px-4 rounded-xl focus:outline-none focus:ring focus:ring-blue-500 bg-lightGreyBorder/50"
              ></input>
            </div>
          

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

          {/* Password Label & Input */}
          <div className="relative space-y-1.5 flex flex-col">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-greyText"
            >
              Password
            </label>

            <input
              type= {showPW ? 'text':'password'}
              name="password"
              placeholder="Enter your password"
              required
              className="border border-lightGreyBorder py-2 pl-4 pr-12 rounded-xl focus:outline-none focus:ring focus:ring-blue-500 bg-lightGreyBorder/50"
            ></input>

            <button type="button"
            aria-label="Toggle password visibility"
            
            onClick={()=> setshowPW((prev)=> !prev)}
            className="absolute right-3 top-9.5 text-greyText/60 hover:text-blue-500"
            >
            {showPW ? <EyeOff size={18}/>:<Eye size={18} />}
            </button>
          </div>

          {/* Login/SignUp button */}
          <button formAction={signup}
          className="mt-6 w-full flex justify-center gap-2 p-3 rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5 text-white bg-primaryBlue ">
          Sign Up
            <ArrowRight></ArrowRight>
          </button>
        </form>

        {/* Login/signup state change */}

        {/* <div className="mt-4 flex justify-center items-center">
          {activeView === "login" ? (
            <div className="flex items-center gap-2 text-sm text-greyText">
              <span>New to GetSteady?</span>
              <button
                className="text-primaryBlue hover:underline transition-all inline-flex items-center gap-1 group"
                onClick={() => setActiveView("signup")}
              >
                Create an account
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-greyText">
              <span>Already have an account?</span>
              <button
                className="text-primaryBlue hover:underline transition-all inline-flex items-center gap-1 group"
                onClick={() => setActiveView("login")}
              >
                <ArrowLeft
                  size={14}
                  className="transition-transform group-hover:-translate-x-1"
                />
                Log in
              </button>
            </div>
          )}
        </div> */}



      
    </div>
  );
};

export default SignupForm;
