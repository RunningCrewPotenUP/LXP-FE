import clsx from "clsx";
import { InputFieldProps } from "./props.type";

const InputField = ({
  icon: Icon,
  inputOptions,
  label,
  error,
}: InputFieldProps) => {
  return (
    <div>
      <label
        className={clsx(
          "block text-sm font-bold text-neutral-800 dark:text-slate-100 mb-2",
        )}
      >
        {label}
      </label>
      <div className="flex relative w-full">
        {Icon && (
          <Icon
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}

        <input
          className={clsx(
            "w-full border rounded-xl py-3 pl-12 pr-4 text-sm outline-none transition-all shadow-sm",
            "text-slate-700 dark:text-slate-50",
            "focus:ring-2 border-slate-100 dark:border-neutral-700 focus:ring-indigo-400 dark:focus:ring-indigo-500",
            Icon ? "pl-12" : "pl-5",
            "bg-slate-50 dark:bg-neutral-800",
          )}
          {...inputOptions}
        />
      </div>
    </div>
  );
};

export default InputField;
