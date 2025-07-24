"use client";

import {
  getUserCategories,
  handleAuthorized,
  handleGetFinance,
} from "@/public/axios";
import { handleSuccessSwal } from "@/public/Swal";
import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [categories, setCategories] = useState([]);
  const [incomedata, setIncomedata] = useState([]);
  const [expensedata, setExpensedata] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  const handleAuth = async () => {
    const res = await handleAuthorized();
    if (res.success) {
      setuser(res?.user);
    }
    setIsLoaded(true);
  };

  const handleUserCategories = async () => {
    const res = await getUserCategories();
    if (!res?.success) {
      return handleSuccessSwal(res?.message || "Internal Server Error");
    }
    setCategories(res?.categories || []);
  };

  const handleIncome = async () => {
    const res = await handleGetFinance({ income: true });
    if (!res?.success) {
      return handleSuccessSwal(res?.message || "Internal Server Error");
    }
    setIncomedata(res.data);
  };

  const handleExpense = async () => {
    const res = await handleGetFinance({ income: false });
    if (!res?.success) {
      return handleSuccessSwal(res?.message || "Internal Server Error");
    }
    setExpensedata(res.data);
  };
  useEffect(() => {
    handleAuth();
  }, []);

  useEffect(() => {
    if (user) {
      handleUserCategories();
      handleIncome();
      handleExpense();
    }
  }, [user]);

  useEffect(() => {
    const inc = incomedata.reduce((acc, item) => acc + Number(item.amount), 0);
    setTotalIncome(inc);

    const exp = expensedata.reduce((acc, item) => acc + Number(item.amount), 0);
    setTotalExpense(exp);
  }, [incomedata, expensedata]);

  const value = {
    user,
    setuser,
    categories,
    setCategories,
    incomedata,
    setIncomedata,
    expensedata,
    setExpensedata,
    isLoaded,
    handleAuth,
    totalIncome,
    totalExpense,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    return null;
  }
  return context;
};
