"use client";

import OTPInput from "react-otp-input";

export const OtpModal = ({ value, setValue }) => {
  return (
    <OTPInput
      value={value}
      onChange={setValue}
      numInputs={4}
      renderSeparator={<span className="mx-1">-</span>}
      renderInput={(props) => (
        <input
          {...props}
          className="!w-8 h-8 text-center border rounded-sm focus:outline-none"
          name="otp"
          required
          autoComplete="off"
        />
      )}
    />
  );
};
