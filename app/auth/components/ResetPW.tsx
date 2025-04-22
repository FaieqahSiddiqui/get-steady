import { useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { updatepassword } from "./actions";


const ResetPW = () => {
  const [showPW, setshowPW] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  // function handleSubmit(e: any) {
  //   const form = e.target;
  //   const newPassword = form.new_password.value;
  //   const confirmPassword = form.confirm_password.value;
  
  //   if (newPassword !== confirmPassword) {
  //     e.preventDefault(); // stop the form from submitting
  //     alert("Passwords do not match");
  //   }
   
  // }


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Prevent default form submission

    const form = e.target as HTMLFormElement;
    const newPassword = (form.elements.namedItem("new_password") as HTMLInputElement).value;
    const confirmPassword = (form.elements.namedItem("confirm_password") as HTMLInputElement).value;

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Call the update password function
      await updatepassword(new FormData(form));
      setSuccess("Password reset successful");
      setError(''); // Clear any previous errors
    } catch (err: any) {
      setError("An error occurred while resetting your password");
      setSuccess('');
    }
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit} action= {updatepassword} className="space-y-4">
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
            type={showPW ? "text" : "password"}
            name="confirm_password"
            placeholder="Confirm new password"
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
                  className="mt-6 w-full flex justify-center gap-2 p-3 rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5 text-white bg-primaryBlue cursor-pointer "
                >
                  Reset Password
                  <ArrowRight></ArrowRight>
                </button>
      </form>
    </div>
  );
};

export default ResetPW;
