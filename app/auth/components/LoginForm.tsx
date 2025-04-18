import { useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { login } from "./actions";
import Link from "next/link";

const LoginForm = () => {
  const [showPW, setshowPW] = useState(false);
  return (
    <div>
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

        {/* Password Label & Input */}
        <div className="relative space-y-1.5 flex flex-col">
          <div className="flex justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-greyText"
            >
              Password
            </label>
            {/* Forgot Password */}
            <Link
              href="/auth/forgot-pw"
              className="text-primaryBlue text-sm hover:underline"
            >
              Forgot password?
            </Link>
          </div>

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
            className="absolute right-3 top-9.5 text-greyText/60 hover:text-blue-500"
          >
            {showPW ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Login/SignUp button */}
        <button
          formAction={login}
          className="mt-6 w-full flex justify-center gap-2 p-3 rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5 text-white bg-primaryBlue "
        >
          Log In
          <ArrowRight></ArrowRight>
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
