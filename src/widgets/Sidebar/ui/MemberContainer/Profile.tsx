"use client";

import APP_ROUTES from "@/src/shared/constants/routes";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProfileProps {
  name: string;
  role: "LEARNER" | "INSTRUCTOR";
}

const Profile = ({ name, role = "LEARNER" }: ProfileProps) => {
  const router = useRouter();

  return (
    <div
      className="w-full cursor-pointer bg-slate-100 border border-slate-200 dark:border-neutral-700 dark:bg-neutral-800 rounded-lg flex justify-between items-center py-2 px-4"
      onClick={() => {
        router.push(APP_ROUTES.ME);
      }}
    >
      <div className="flex flex-col gap-1">
        <span className="font-bold text-neutral-800 dark:text-slate-100">
          {name}
        </span>
        <span className="text-xs text-slate-400">
          {role === "LEARNER" ? "러너" : "크루 리더"}
        </span>
      </div>

      <button
        className="cursor-pointer text-neutral-700 dark:text-slate-300"
        onClick={() => {}}
      >
        <LogOutIcon size={16} />
      </button>
    </div>
  );
};

export default Profile;
