"use client";

import { AddIncome } from "@/components/AddIncome";
import { Card } from "@/components/IncomeCard";
import Chart from "@/components/Rechart";
import { Title } from "@/components/Title";
import { useUser } from "@/context/UserContext";

export default function Income() {
  const { incomedata } = useUser();
  return (
    <>
      <div className="flex items-center justify-between">
        <Title title={"Income overview"} />
        <AddIncome />
      </div>

      <Chart data={incomedata} />
      <Card data={incomedata} income={true} />
    </>
  );
}
