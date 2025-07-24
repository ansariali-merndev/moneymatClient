"use client";

import {
  handleAuthRegister,
  handleAuthResendOtp,
  handleAuthVerifyEmail,
} from "@/public/axios";
import { EmailInput } from "@/components/EmailInput";
import { NameInput } from "@/components/NameInput";
import { OtpModal } from "@/components/OtpModal";
import PasswordInput from "@/components/PasswordInput";
import Link from "next/link";
import { useState } from "react";
import { handleErrorSwal, handleSuccessSwal } from "@/public/Swal";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function Register() {
  const router = useRouter();
  const [otp, setotp] = useState("");
  const [openOtpmodal, setOpenOtpmodal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isResend, setIsResend] = useState(false);
  const { handleAuth } = useUser();
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
  });

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
    setIsLoading(true);

    //api call to register user

    const res = await handleAuthRegister(formdata);

    if (!res?.success) {
      return handleErrorSwal(
        res?.message || "Registration failed, Please try after some time."
      );
    }

    setIsLoading(false);
    setEmail(formdata.email);
    setOpenOtpmodal(true);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    //api call to verify email with otp

    const res = await handleAuthVerifyEmail({ email: formdata.email, otp });

    if (!res?.success) {
      return handleErrorSwal(res?.message || "Email verification failed!");
    }

    handleSuccessSwal(res?.message || "Email verified successfully!");
    router.push("/dashboard");

    setOpenOtpmodal(false);
    await handleAuth();
    setFormdata({ name: "", email: "", password: "" });
    setotp("");
  };

  const handleResendOtp = async () => {
    setIsResend(true);
    const res = await handleAuthResendOtp({ email });

    if (!res?.success) {
      return handleErrorSwal(res?.message || "Failed to resend OTP!");
    }

    setIsResend(false);
  };

  return (
    <>
      <div className="w-full max-w-sm rounded-xl p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Welcome to the Family
          </h2>
          <p className="text-center text-gray-500">
            Just a few steps away from smarter finances.
          </p>
        </div>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {/* Name */}
          <NameInput value={formdata.name} handleOnchnage={handleOnchange} />

          {/* Email */}
          <EmailInput value={formdata.email} handleOnchange={handleOnchange} />

          {/* Password */}
          <PasswordInput
            value={formdata.password}
            handleOnchange={handleOnchange}
          />

          <div>
            <button
              disabled={isLoading}
              type="submit"
              className={`w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition ${
                isLoading ? "opacity-50 cursor-not-allowed italic" : ""
              }`}
            >
              {isLoading ? "Please wait ..." : "Create Account"}
            </button>
            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link
                href={"/login"}
                className="text-blue-600 cursor-pointer capitalize"
              >
                sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
      {openOtpmodal && (
        <form
          onSubmit={handleOtpSubmit}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-200 px-18 py-10 rounded-md shadow-lg text-center flex flex-col items-center justify-center"
        >
          <h2 className="text-xl font-semibold text-zinc-800 mb-2 relative">
            Enter OTP
            <p
              onClick={() => setOpenOtpmodal(false)}
              className="text-2xl absolute -top-8 -right-26 cursor-pointer"
            >
              &times;
            </p>
          </h2>
          <p className="text-sm text-zinc-600 mb-4">
            We&apos;ve sent a 4-digit code to your email
          </p>
          <OtpModal value={otp} setValue={setotp} />
          <button type="Submit" className="btn mt-8 cursor-pointer w-full">
            Submit
          </button>
          <p
            onClick={handleResendOtp}
            className="text-blue-800 text-sm cursor-pointer mt-0.5"
          >
            {isResend ? " sending..." : "Resend OTP"}
          </p>
        </form>
      )}
    </>
  );
}
