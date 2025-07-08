import { Category } from "@/payload-types";

import { CategoryDropdown } from "./category-dropdown";

interface Props {
  data: any;
}

export const Categories = ({ data }: Props) => {
  return (
    <div className="relative w-full">
      <div className="grid grid-cols-auto-fit gap-4 w-full" style={{ gridTemplateColumns: `repeat(${data.length}, 1fr)` }}>
        {data.reverse().map((category: Category) => (
          <div key={category.id} className="flex justify-center">
            <CategoryDropdown
              category={category}
              isActive={false}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
