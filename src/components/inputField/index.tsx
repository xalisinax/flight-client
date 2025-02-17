import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  label: string;
  type?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

function InputField({
  label,
  type = "text",
  register,
  error,
}: InputFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <input
        type={type}
        {...register}
        className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}

export { InputField };
