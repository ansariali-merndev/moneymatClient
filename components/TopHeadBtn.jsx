import { FiPlus } from "react-icons/fi";

export const TopHeadBtn = ({ setOpenModel, title }) => {
  return (
    <button
      onClick={() => setOpenModel(true)}
      className="flex items-center gap-2 border px-4 py-2 rounded-md border-rose-200 bg-gray-100 cursor-pointer text-zinc-600 font-semibold"
    >
      <FiPlus size={18} /> {title}
    </button>
  );
};
