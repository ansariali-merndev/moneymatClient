"use client";

import { useState } from "react";
import { TopHeadBtn } from "./TopHeadBtn";
import { Modal } from "./Modal";
import { useUser } from "@/context/UserContext";

export const AddExpense = () => {
  const [openModel, setOpenModel] = useState(false);
  const { categories, setExpensedata } = useUser();

  const expense = categories.filter((item) => item.type === "expense");

  return (
    <>
      <TopHeadBtn setOpenModel={setOpenModel} title={"Add Expense"} />
      {openModel && (
        <Modal
          setOpenModel={setOpenModel}
          title={"Add Expense"}
          category={expense}
          text={"Expense"}
          setdata={setExpensedata}
          income={false}
        />
      )}
    </>
  );
};
