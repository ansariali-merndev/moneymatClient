"use client";

import { EmailInput } from "@/components/EmailInput";
import PasswordInput from "@/components/PasswordInput";
import { useUser } from "@/context/UserContext";
import { handleAuthLogin } from "@/public/axios";
import { handleErrorSwal, handleSuccessSwal } from "@/public/Swal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [formdata, setFormdata] = useState({ email: "", password: "" });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { handleAuth } = useUser();

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // console.log(formdata);

    setIsLoading(true);
    const res = await handleAuthLogin(formdata);
    setIsLoading(false);

    if (!res?.success) {
      return handleErrorSwal(res?.message || "Login failed");
    }

    handleSuccessSwal(res?.message || "Login successfully");
    router.push("/dashboard");
    await handleAuth();
    setFormdata({ email: "", password: "" });
  };

  return (
    <>
      <div className="w-full max-w-sm rounded-xl p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Welcome Back to Money Mate
          </h2>

          <p className="text-center text-gray-500">
            Please sign in to your account to continue.
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          {/* Email */}
          <EmailInput value={formdata.email} handleOnchange={handleOnchange} />

          {/* Password */}
          <PasswordInput
            value={formdata.password}
            handleOnchange={handleOnchange}
          />

          {/* Submit Button */}
          <div>
            <button
              disabled={isLoading}
              type="submit"
              className={`w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition ${
                isLoading ? "opacity-50 cursor-not-allowed italic" : ""
              }`}
            >
              Sign In
            </button>
            <p className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href={"/register"}
                className="text-blue-600 cursor-pointer capitalize"
              >
                create account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
