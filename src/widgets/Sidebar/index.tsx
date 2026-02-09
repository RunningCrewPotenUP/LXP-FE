import Button from "@/src/entities/Button";
import {
  CompassIcon,
  HouseIcon,
  LogInIcon,
  LogOutIcon,
  UserPlusIcon,
  ZapIcon,
} from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="hidden lg:flex w-64 bg-slate-50 dark:bg-neutral-900 border-r border-slate-200 dark:border-neutral-700 flex-col fixed inset-y-0 left-0 z-20">
      <div className="p-8">
        <Link href={"./"}>
          <div className="flex items-center space-x-3 mb-10 cursor-pointer">
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-indigo-200 dark:shadow-indigo-800 shadow-md">
              <ZapIcon size={24} fill="white" />
            </div>
            <span className="text-xl font-black text-slate-900 dark:text-slate-50 tracking-tight">
              러닝크루
            </span>
          </div>
        </Link>

        <nav className="space-y-2 flex flex-col">
          <Button icon={HouseIcon} variant="navigation">
            홈
          </Button>
          <Button icon={CompassIcon} variant="navigation" active>
            탐색하기
          </Button>

          {/* Private Routes */}
          {/* {isLoggedIn && (
            <>
              <SidebarItem
                icon={LayoutDashboard}
                label="나의 성장"
                active={currentView === ViewState.DASHBOARD}
                onClick={() => onNavigate(ViewState.DASHBOARD)}
              />
              <SidebarItem icon={MessageSquare} label="메시지" />
            </>
          )} */}
        </nav>
      </div>

      <div className="mt-auto p-8 border-t border-slate-100 dark:border-neutral-700">
        {/* {isLoggedIn ? ( */}
        {true ? (
          /* Logged In State */
          <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2">
            {/* <SidebarItem icon={Settings} label="설정" /> */}
            <div className="group relative">
              <div className="flex items-center p-3 space-x-3 bg-slate-50 rounded-2xl mt-4 border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                  L
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs font-bold text-slate-800 truncate">
                    김러닝
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium">
                    Starter 멤버
                  </p>
                </div>
                <button
                  // onClick={onLogout}
                  className="text-slate-400 hover:text-red-500 transition-colors"
                  title="로그아웃"
                >
                  <LogOutIcon size={16} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Logged Out State */
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
            <button
              // onClick={onLogin}
              className="w-full py-3.5 rounded-xl border border-slate-200 dark:border-neutral-700 text-slate-600 font-bold text-sm hover:bg-slate-50 hover:text-slate-900 transition-all flex items-center justify-center space-x-2"
            >
              <LogInIcon size={16} />
              <span>로그인</span>
            </button>
            <button
              // onClick={onSignUp}
              className="w-full py-3.5 rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all flex items-center justify-center space-x-2"
            >
              <UserPlusIcon size={16} />
              <span>회원가입</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
