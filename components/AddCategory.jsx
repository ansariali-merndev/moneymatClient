"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import EmojiPicker from "emoji-picker-react";
import { useUser } from "@/context/UserContext";
import { adduserCategories } from "@/public/axios";

export const AddCategory = () => {
  const [openModel, setOpenModel] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpenModel(true)}
        className="flex items-center gap-2 border px-4 py-2 rounded-md border-rose-200 bg-gray-100 cursor-pointer text-zinc-600 font-semibold"
      >
        <FiPlus size={18} /> Add Category
      </button>
      {openModel && <Model setOpenModel={setOpenModel} />}
    </>
  );
};

const Model = ({ setOpenModel }) => {
  const [formdata, setFormdata] = useState({ name: "", emoji: "😀", type: "" });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { categories, setCategories } = useUser();

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setFormdata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleEmojiClick = (emojiData) => {
    setFormdata((prev) => ({
      ...prev,
      emoji: emojiData.emoji,
    }));
    setShowEmojiPicker(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setCategories([...categories, formdata]);
    const res = await adduserCategories(formdata);
    console.log(res);
    setFormdata({ name: "", emoji: "😀", type: "" });
    setOpenModel(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white rounded-md border z-50 px-9 py-3 border-rose-300 relative">
        <p
          className="text-2xl absolute right-2 top-0 cursor-pointer"
          onClick={() => setOpenModel(false)}
        >
          &times;
        </p>
        <h2 className="text-2xl text-center font-semibold text-gray-600 mt-6">
          Add a Category
        </h2>
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col gap-4 mt-4 w-64"
        >
          {/* Emoji Picker */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Pick Emoji
            </label>
            <div
              className="w-fit border rounded-md px-4 py-2 text-xl bg-gray-100 cursor-pointer border-rose-200"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              {formdata.emoji || "😀"}
            </div>
            {showEmojiPicker && (
              <div className="absolute z-50 mt-2">
                <EmojiPicker onEmojiClick={handleEmojiClick} height={350} />
              </div>
            )}
          </div>

          {/* Category Name */}
          <div>
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Category Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g. Salary"
              required
              value={formdata.name}
              onChange={handleOnchange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none"
            />
          </div>

          {/* Type Selector */}
          <div>
            <label
              htmlFor="type"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Category Type
            </label>
            <select
              name="type"
              id="type"
              required
              value={formdata.type}
              onChange={handleOnchange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none"
            >
              <option value="">Select Type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="mt-2 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-rose-600 transition font-semibold"
          >
            Save Category
          </button>
        </form>
      </div>
    </div>
  );
};
