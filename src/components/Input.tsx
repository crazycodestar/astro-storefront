import type { InputHTMLAttributes } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  error: FieldError | undefined;
  register: UseFormRegisterReturn;
}

const Input = ({ title, error, register, ...others }: InputProps) => {
  return (
    <div className="w-full">
      <div
        className={`rounded-md border py-2 ${error ? "border-red-400" : null}`}
      >
        <div className="relative flex h-9 flex-col">
          <input
            className="peer mt-auto h-6 w-full border-gray-300 px-4 text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none"
            placeholder={title}
            {...register}
            {...others}
          />
          <label
            htmlFor="email"
            className="pointer-events-none absolute -top-1 left-4 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-1 peer-focus:text-sm peer-focus:text-gray-600"
          >
            {title}
          </label>
        </div>
      </div>
      {error && (
        <p className="mt-2 text-xs italic text-red-500">{error?.message}</p>
      )}
    </div>
  );
};

export { Input };
