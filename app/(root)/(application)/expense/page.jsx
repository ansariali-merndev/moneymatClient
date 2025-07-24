"use client";

import { AddExpense } from "@/components/AddExpense";
import { Card } from "@/components/IncomeCard";
import Chart from "@/components/Rechart";
import { Title } from "@/components/Title";
import { useUser } from "@/context/UserContext";

export default function Expense() {
  const { expensedata } = useUser();
  return (
    <>
      <div className="flex items-center justify-between">
        <Title title={"Expense Overview"} />
        <AddExpense />
      </div>
      <Chart data={expensedata} />
      <Card data={expensedata} income={false} />
    </>
  );
}
