import CATEGORIES from "@/src/shared/constants/categories";
import { ActionButton } from "./ui";

const CategoryControl = () => {
  return (
    <div className="w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
      <div className="flex space-x-2">
        {Object.entries(CATEGORIES).map((category, index) => (
          <ActionButton key={index} label={category[1]} variant="border" />
        ))}
      </div>
    </div>
  );
};

export default CategoryControl;
