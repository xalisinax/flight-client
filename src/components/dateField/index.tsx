import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface DateFieldProps {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

export function DateField({ label, register, error }: DateFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <input
        type="datetime-local"
        {...register}
        className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
