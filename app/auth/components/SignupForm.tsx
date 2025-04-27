"use client";
import React, { useState } from "react";
import { ArrowRight, ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { signup } from "./actions";
import { AuthView } from "../../constants/types";
import { toast } from 'react-toastify';

type Props = { newView: (v: AuthView) => void };

const SignupForm = ({ newView }: Props) => {
  const [showPW, setshowPW] = useState(false);
  const [loading, setLoading] = useState(false);


  async function handleSignupSubmit(e:React.FormEvent) {
      e.preventDefault();
      setLoading(true);
  
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
  
      try{
        await signup(formData);
        // If login is successful, the server action will redirect, so no need to do anything here
      }
      catch(err:any){
        // Suppress the "NEXT_REDIRECT" error
      if (err.message === "NEXT_REDIRECT") {
        //ignore
      }
      else{
        toast.error(err.message || "An error occurred while signing up");
      }
        
      }
      finally{
        setLoading(false); // Always stop loading no matter what
      }
      
    }


  return (
    <div>
      <div className="text-center mb-6 space-y-1">
        <h2 className="text-xl font-bold tracking-tight">Create Account</h2>
        <p className="text-greyText">Start your journey to better habits</p>
      </div>

      {/* Signup/Login Form */}
      <form onSubmit={handleSignupSubmit} className="space-y-4">
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
            type={showPW ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            required
            className="border border-lightGreyBorder py-2 pl-4 pr-12 rounded-xl focus:outline-none focus:ring focus:ring-blue-500 bg-lightGreyBorder/50"
          ></input>

          <button
            type="button"
            aria-label="Toggle password visibility"
            onClick={() => setshowPW((prev) => !prev)}
            className="absolute right-3 top-9.5 text-greyText/60 hover:text-blue-500 cursor-pointer"
          >
            {showPW ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Login/SignUp button */}
        <button
          // formAction={signup}
          type="submit"
          disabled={loading}
        
          className={`mt-6 w-full flex justify-center gap-2 p-3 rounded-xl transition-all text-white bg-primaryBlue ${
            loading ? 'opacity-60' : 'hover:shadow-lg hover:-translate-y-0.5 cursor-pointer'
          }`}>
         
          {loading ? <Loader2 className="w-5 h-5 animate-spin"/>: "Sign Up"}
          {!loading && <ArrowRight/>}
        </button>
      </form>

      {/* Login/signup state change */}

      <div className="mt-4 flex justify-center items-center">
        <div className="flex items-center gap-2 text-sm text-greyText">
          <span>Already have an account?</span>
          <button
            className="text-primaryBlue hover:underline transition-all inline-flex items-center gap-1 group cursor-pointer"
            onClick={() => newView("login")}
          >
            <ArrowLeft
              size={14}
              className="transition-transform group-hover:-translate-x-1 "
            />
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
