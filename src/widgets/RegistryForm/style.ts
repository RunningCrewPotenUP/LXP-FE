import clsx from "clsx";
import { tv } from "tailwind-variants";

const signUpStyle = tv({
  variants: {
    container: clsx(
      "min-h-screen bg-transparent flex flex-col items-center py-10 px-4",
      "animate-fade-in",
    ),
    header: "w-full max-w-2xl mb-12 flex items-center justify-between",
    headerButton:
      "p-2 -ml-2 text-slate-400 hover:text-slate-800 transition-colors",
    headerTitle: "text-xl font-black text-slate-900 tracking-tight",
    headerSpacer: "w-8",
    content: "w-full max-w-xl",
    titleSection: "text-center mb-10",
    title: "text-2xl md:text-3xl font-black text-slate-900 mb-3",
    subtitle: "text-slate-500 font-medium",
    progress: "flex items-center justify-center space-x-4 mb-12",
    progressTrack: "w-16 h-1 bg-slate-100 rounded-full overflow-hidden",
    stepBody: "space-y-6 animate-in slide-in-from-right-4 duration-300",
    stepBodyWide: "space-y-8 animate-in slide-in-from-right-4 duration-300",
    label: "block text-sm font-bold text-slate-800 mb-2",
    selectWrapper: "relative",
    selectInput:
      "w-full bg-white border border-slate-200 rounded-xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all appearance-none text-slate-800 invalid:text-slate-300 font-medium cursor-pointer hover:bg-slate-50",
    infoCard: "bg-indigo-50 rounded-2xl p-5 border border-indigo-100",
    infoHeader: "flex items-center space-x-2 text-indigo-600 mb-2",
    infoIcon: "p-1 bg-white rounded-md shadow-sm",
    infoTitle: "text-sm font-bold",
    infoText: "text-sm text-slate-600 leading-relaxed font-medium",
    infoHint: "text-slate-400 text-xs",
    selectedTagList: "flex flex-wrap gap-2 mt-4",
    emptyTag: "text-xs text-slate-400 px-1 py-1.5",
    categoryTabs: "border-b border-slate-100",
    categoryTabsRow: "flex space-x-1 overflow-x-auto no-scrollbar",
    searchWrap: "relative mb-6",
    searchInput:
      "w-full bg-slate-50 border-none rounded-xl py-3 pl-11 pr-4 text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all placeholder:text-slate-400",
    tagSectionList: "space-y-8",
    tagGroup: "animate-in fade-in slide-in-from-bottom-2 duration-500",
    tagGroupTitle:
      "text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 ml-1 flex items-center",
    tagGroupIndicator: "w-1 h-3 bg-indigo-200 rounded-full mr-2",
    tagGroupList: "flex flex-wrap gap-2.5",
    emptySearch: "text-center py-10 text-slate-400 text-sm",
    footer:
      "mt-auto pt-10 w-full max-w-4xl border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400",
    footerBrand: "font-bold text-slate-800 text-xs",
    footerLinks: "space-x-4",
  },
});

const progressStepStyle = tv({
  base: "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all",
  variants: {
    active: {
      true: "bg-indigo-600 text-white shadow-lg shadow-indigo-200",
      false: "bg-slate-100 text-slate-400",
    },
  },
  defaultVariants: {
    active: false,
  },
});

const progressFillStyle = tv({
  base: "h-full bg-indigo-600 transition-all duration-500",
  variants: {
    active: {
      true: "w-full",
      false: "w-0",
    },
  },
  defaultVariants: {
    active: false,
  },
});

const inputStyle = tv({
  base: "w-full bg-white border rounded-xl px-5 py-3.5 text-sm outline-none transition-all placeholder:text-slate-300",
  variants: {
    invalid: {
      true: "border-red-300 focus:border-red-500 focus:ring-red-100",
      false:
        "border-slate-200 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500",
    },
  },
  defaultVariants: {
    invalid: false,
  },
});

const toggleButtonStyle = tv({
  base: "w-5 h-5 rounded-full border flex items-center justify-center mr-2 transition-all",
  variants: {
    selected: {
      true: "border-indigo-600 bg-indigo-600",
      false: "border-slate-300 bg-white group-hover:border-indigo-300",
    },
  },
  defaultVariants: {
    selected: false,
  },
});

const toggleLabelStyle = tv({
  base: "text-sm font-medium",
  variants: {
    selected: {
      true: "text-indigo-600 font-bold",
      false: "text-slate-600",
    },
  },
  defaultVariants: {
    selected: false,
  },
});

const primaryButtonStyle = tv({
  base: "w-full py-4 rounded-xl font-bold text-base shadow-lg transition-all transform active:scale-[0.99]",
  variants: {
    enabled: {
      true: "bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700",
      false: "bg-slate-100 text-slate-300 cursor-not-allowed shadow-none",
    },
  },
  defaultVariants: {
    enabled: true,
  },
});

const nextButtonStyle = tv({
  base: "w-full py-4 rounded-xl font-bold text-base shadow-lg transition-all mt-8 transform active:scale-[0.99]",
  variants: {
    enabled: {
      true: "bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700",
      false:
        "bg-white text-indigo-300 border border-indigo-100 cursor-not-allowed shadow-none",
    },
  },
  defaultVariants: {
    enabled: true,
  },
});

const selectedTagStyle = tv({
  base: "flex items-center bg-white px-3 py-1.5 rounded-lg border text-xs font-bold shadow-sm animate-in zoom-in-50",
  variants: {
    selected: {
      true: "border-indigo-200 text-indigo-600",
      false: "border-slate-200 text-slate-600",
    },
  },
  defaultVariants: {
    selected: true,
  },
});

const removeTagButtonStyle = "ml-1.5 hover:text-indigo-800";

export {
  inputStyle,
  nextButtonStyle,
  primaryButtonStyle,
  progressFillStyle,
  progressStepStyle,
  removeTagButtonStyle,
  selectedTagStyle,
  signUpStyle,
  toggleButtonStyle,
  toggleLabelStyle,
};
