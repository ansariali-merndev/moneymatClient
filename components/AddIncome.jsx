"use client";

import { useState } from "react";
import { Modal } from "./Modal";
import { useUser } from "@/context/UserContext";
import { TopHeadBtn } from "./TopHeadBtn";

export const AddIncome = () => {
  const [openModel, setOpenModel] = useState(false);
  const { categories, setIncomedata } = useUser();

  const income = categories.filter((item, index) => item.type === "income");

  return (
    <>
      <TopHeadBtn setOpenModel={setOpenModel} title={"Add Income"} />
      {openModel && (
        <Modal
          setOpenModel={setOpenModel}
          title={"Income Detail"}
          category={income}
          text={"Income"}
          setdata={setIncomedata}
          income={true}
        />
      )}
    </>
  );
};
