import { useState } from "react";
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { login } from "./actions";
import { AuthView } from "../../constants/types";
import { toast } from 'react-toastify';


type Props = { changeView: (v: AuthView) => void };

const LoginForm = ({ changeView }: Props) => {
  const [showPW, setshowPW] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLoginSubmit(e:React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try{
      await login(formData);
      // If login is successful, the server action will redirect, so no need to do anything here
    }
    catch(err:any){
      if (err.message === "NEXT_REDIRECT") {
        //ignore
      }else{
        toast.error(err.message || "An error occurred while loggin in");
      }
      
    }
    finally{
      setLoading(false); // Always stop loading no matter what
    }
    
  }

  

  return (
    <div>
      <div className="text-center mb-6 space-y-1">
        <h2 className="text-xl font-bold tracking-tight">Welcome Back</h2>
        <p className="text-greyText">Continue your journey to better habits</p>
      </div>

      {/* action={login} */}
      <form  onSubmit={handleLoginSubmit} className="space-y-4">
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

            <button
            type="button"
              className="text-primaryBlue text-sm hover:underline cursor-pointer"
              onClick={() => changeView("forgot")}
            >
              Forgot password?
            </button>
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
            className="absolute right-3 top-9.5 text-greyText/60 hover:text-blue-500 cursor-pointer"
          >
            {showPW ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Login/SignUp button */}
        <button
        type="submit"
        disabled={loading}
          // formAction={login}
          className={`mt-6 w-full flex justify-center gap-2 p-3 rounded-xl transition-all text-white bg-primaryBlue ${
            loading ? 'opacity-60' : 'hover:shadow-lg hover:-translate-y-0.5 cursor-pointer'
          }`}
        >
          {loading ? <Loader2 className= "w-5 h-5 animate-spin" />: "Log in"}
          {!loading && <ArrowRight />}
        </button>
      </form>

      <div className="mt-4 flex justify-center items-center">
        <div className="flex items-center gap-2 text-sm text-greyText">
          <span>New to GetSteady?</span>
          <button
            className="text-primaryBlue hover:underline transition-all inline-flex items-center gap-1 group cursor-pointer"
            onClick={() => changeView("signup")}
          >
            Create an account
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
