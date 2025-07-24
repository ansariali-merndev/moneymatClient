"use client";
import { handleDeleteFinance } from "@/public/axios";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

export const Card = ({ data, income }) => {
  const [card, setCard] = useState(data);

  const handleCTA = async (id) => {
    const res = await handleDeleteFinance({ id, income });
    console.log(res);
    setCard((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 gap-8 my-12">
      {card.map((item, index) => (
        <li
          key={index}
          className="border border-rose-300 rounded-xl p-4 flex items-center gap-4 relative"
          style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
        >
          <span className="text-3xl">{item.emoji}</span>
          <div className="flex flex-col">
            <p className="text-lg font-semibold text-green-600">
              ₹ {item.amount}
            </p>
            <p className="text-sm text-gray-600 capitalize">{item.type}</p>
          </div>
          <p
            onClick={() => handleCTA(item._id)}
            className="absolute top-1 right-2 text-zinc-700 cursor-pointer text-xl"
          >
            <MdDelete />
          </p>
        </li>
      ))}
    </ul>
  );
};
