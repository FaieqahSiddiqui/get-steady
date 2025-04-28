import { useState } from "react";
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { updatepassword } from "./actions";
import { toast } from "react-toastify";

const ResetPW = () => {
  const [showPW, setshowPW] = useState(false);
  const [showconfirmPW, setshowconfirmPW] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const newPassword = (
      form.elements.namedItem("new_password") as HTMLInputElement
    ).value;
    const confirmPassword = (
      form.elements.namedItem("confirm_password") as HTMLInputElement
    ).value;

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // Call the update password function
      await updatepassword(new FormData(form));
      toast.success("Password reset successful 🔐"); // Show success toast
    } catch (err: any) {
    
      // Suppress the "NEXT_REDIRECT" error
      if (err.message === "NEXT_REDIRECT") {
        //ignore
      }
      else {
        toast.error(
          err.message ?? "An error occurred while resetting your password"
        );
      }
    } finally {
      setLoading(false); // Always runs after try or catch
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        // action={updatepassword}
        className="space-y-4"
      >
        {/* Password Label & Input */}
        <div className="relative space-y-1.5 flex flex-col">
          <div className="flex justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-greyText"
            >
              New Password
            </label>
          </div>

          <input
            type={showPW ? "text" : "password"}
            name="new_password"
            placeholder="Enter new password"
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

        {/* Confirm Password Label & Input */}
        <div className="relative space-y-1.5 flex flex-col">
          <div className="flex justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-greyText"
            >
              Confirm New Password
            </label>
          </div>

          <input
            type={showconfirmPW ? "text" : "password"}
            name="confirm_password"
            placeholder="Confirm new password"
            required
            className="border border-lightGreyBorder py-2 pl-4 pr-12 rounded-xl focus:outline-none focus:ring focus:ring-blue-500 bg-lightGreyBorder/50"
          ></input>

          <button
            type="button"
            aria-label="Toggle password visibility"
            onClick={() => setshowconfirmPW((prev) => !prev)}
            className="absolute right-3 top-9.5 text-greyText/60 hover:text-blue-500 cursor-pointer"
          >
            {showconfirmPW ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {/* Login/SignUp button */}
        <button
          type="submit"
          disabled={loading}
          className={`mt-6 w-full flex justify-center gap-2 p-3 rounded-xl transition-all text-white bg-primaryBlue ${
            loading
              ? "opacity-60"
              : "hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
          }`}
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin"/>: "Reset Password"}  
          {!loading && <ArrowRight />}
        </button>
      </form>
    </div>
  );
};

export default ResetPW;
