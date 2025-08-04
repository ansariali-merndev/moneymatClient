"use client";

import { DashboardCard } from "@/components/DashboardCard";
import DashboardChart from "@/components/DashboardChart";
import { Title } from "@/components/Title";
import { useUser } from "@/context/UserContext";
import {
  FaMoneyBillWave,
  FaMoneyCheckAlt,
  FaPiggyBank,
  FaWallet,
} from "react-icons/fa";

export default function Dashboard() {
  const { totalIncome, totalExpense, expensedata } = useUser();

  const util = [
    { label: "Total Income", value: totalIncome, icon: <FaMoneyBillWave /> },
    { label: "Total Expense", value: totalExpense, icon: <FaMoneyCheckAlt /> },
    {
      label: "Total Saving",
      value: totalIncome - totalExpense,
      icon: <FaPiggyBank />,
    },
    // { label: "Total Salary", value: "₹60,000", icon: <FaWallet /> },
  ];

  return (
    <>
      <Title title={"dashboard overview"} />
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {util.map((item, index) => (
          <DashboardCard item={item} key={index} />
        ))}
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 my-10 gap-8">
        <div
          className="p-4 rounded-lg bg-white dark:bg-zinc-900"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <h2 className="text-xl font-semibold mb-4 text-zinc-800 dark:text-zinc-100">
            Expense Summary
          </h2>
          <div className="space-y-4">
            {expensedata.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                No expenses added yet.
              </p>
            ) : (
              expensedata.slice(0, 4).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-zinc-100 dark:bg-zinc-800 rounded-md shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{item.emoji}</span>
                    <div>
                      <p className="text-base font-medium text-zinc-700 dark:text-zinc-200 capitalize">
                        {item.type}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        ₹{item.amount}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <DashboardChart />
      </section>
    </>
  );
}
