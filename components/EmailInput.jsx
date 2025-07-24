import { MdEmail } from "react-icons/md";

export const EmailInput = ({ value, handleOnchange }) => {
  return (
    <div className="flex items-center border rounded-md px-3 py-2 bg-gray-100">
      <MdEmail className="text-gray-600 mr-2" size={20} />
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        required
        value={value}
        onChange={handleOnchange}
        autoComplete="off"
        className="bg-transparent outline-none w-full text-sm text-gray-700"
      />
    </div>
  );
};
