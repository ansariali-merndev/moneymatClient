import { MdPerson } from "react-icons/md";

export const NameInput = ({ value, handleOnchnage }) => {
  return (
    <div className="flex items-center border rounded-md px-3 py-2 bg-gray-100">
      <MdPerson className="text-gray-600 mr-2" size={20} />
      <input
        type="text"
        name={"name"}
        placeholder={"Full Name"}
        required
        autoComplete="off"
        value={value}
        onChange={handleOnchnage}
        className="bg-transparent outline-none w-full text-sm text-gray-700"
      />
    </div>
  );
};
