"use client";

import Swal from "sweetalert2";

export const handleErrorSwal = (message) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
  });
};

export const handleSuccessSwal = (message) => {
  Swal.fire({
    icon: "success",
    title: "Success!",
    text: message,
  });
};
