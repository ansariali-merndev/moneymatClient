import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

const handleError = (error) => {
  console.error("API call failed:", error);
  return {
    success: false,
    message: error.response?.data?.message || "An error occurred",
  };
};

export const handleAuthRegister = async (data) => {
  try {
    const response = await instance.post("/auth/register", data);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const handleAuthVerifyEmail = async (data) => {
  try {
    const response = await instance.post("/auth/verify-email", data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const handleAuthResendOtp = async (data) => {
  try {
    const response = await instance.post("/auth/resend-otp", data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const handleAuthLogin = async (data) => {
  try {
    const response = await instance.post("/auth/login", data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const handleAuthorized = async () => {
  try {
    const response = await instance.get("/auth/authorized");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const handleAuthLogout = async () => {
  try {
    const response = await instance.get("/auth/logout");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getUserCategories = async () => {
  try {
    const response = await instance.get("/api/categories");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const adduserCategories = async (data) => {
  try {
    const response = await instance.post("/api/add-category", data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const handleGetFinance = async (data) => {
  try {
    const response = await instance.post("/api/getfinance", data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const handleAddFinance = async (data) => {
  try {
    const response = await instance.post("/api/addfinance", data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const handleDeleteFinance = async (data) => {
  try {
    const response = await instance.post("/api/deletefinance", data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
