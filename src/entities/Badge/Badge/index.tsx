import { BadgeProps } from "./model/props.type";

const Badge = ({ label }: BadgeProps) => {
  return (
    <div className="bg-slate-50/85 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-black text-indigo-600 uppercase tracking-wider shadow-sm">
      {label}
    </div>
  );
};

export default Badge;
