"use client";

import { handleAddFinance } from "@/public/axios";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

export const Modal = ({
  setOpenModel,
  title,
  category,
  text,
  setdata,
  income,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [formdata, setFormdata] = useState({
    amount: "",
    emoji: "😀",
    type: "",
  });

  const handleEmojiClick = (e) => {
    setFormdata((prev) => {
      return {
        ...prev,
        emoji: e.emoji,
      };
    });
    setShowEmojiPicker(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount" && !/^\d*$/.test(value)) return;

    setFormdata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setdata((prev) => [...prev, formdata]);
    const res = await handleAddFinance({
      amount: formdata.amount,
      emoji: formdata.emoji,
      type: formdata.type,
      income,
    });

    setFormdata({ amount: "", emoji: "😀", type: "" });
    setOpenModel(false);
  };

  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
      <div
        className="border px-8 py-4 rounded-md border-rose-300 z-50 relative bg-zinc-100"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
      >
        <p
          onClick={() => setOpenModel(false)}
          className="text-2xl absolute right-4 top-1 cursor-pointer"
        >
          &times;
        </p>
        <h2 className="text-2xl font-bold text-center text-zinc-600">
          {title}
        </h2>
        <form onSubmit={handleSubmit} className="w-64 space-y-4 mt-4">
          {/* Emoji Picker */}
          <div>
            <p className="text-sm font-medium mb-1">Pick Emoji</p>
            <div
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              className="border w-fit p-2 text-2xl cursor-pointer border-rose-300"
            >
              {formdata.emoji}
            </div>
          </div>
          {showEmojiPicker && (
            <div className="absolute z-50 mt-2">
              <EmojiPicker onEmojiClick={handleEmojiClick} height={350} />
            </div>
          )}

          {/* Amount Input */}
          <div className="flex flex-col">
            <label htmlFor="amount" className="text-sm font-medium mb-1">
              Amount
            </label>
            <input
              type="text"
              name="amount"
              id="amount"
              required
              value={formdata.amount}
              onChange={handleFormChange}
              placeholder="e.g. 5000 — numbers only"
              className="border border-gray-300 rounded-md px-3 py-2  outline-none"
            />
          </div>

          {/* Income Category Dropdown */}
          <div className="flex flex-col">
            <label htmlFor="type" className="text-sm font-medium mb-1">
              {text} Category
            </label>
            <select
              name="type"
              id="type"
              className="border border-gray-300 rounded-md px-3 py-2 outline-none"
              required
              value={formdata.income}
              onChange={handleFormChange}
            >
              <option value="">Select {text} Category</option>
              {category.map((item, index) => (
                <option value={item.name} key={index}>
                  {item.emoji} {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-rose-500 text-white py-2 rounded-md hover:bg-rose-600 transition duration-200"
          >
            Save Income
          </button>
        </form>
      </div>
    </div>
  );
};
